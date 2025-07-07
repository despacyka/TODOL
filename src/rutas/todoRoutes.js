import express from 'express';
import {
  createTodo,
  getAllTodosByUser,
  getTodoById,
  updateTodo,
  deleteTodo
} from '../controladores/todoControllers.js';

const router = express.Router({ mergeParams: true });

// Middleware para validar userId en todas las rutas
router.use('/:todoId', async (req, res, next) => {
  const userId = parseInt(req.params.userId);
  const todoId = parseInt(req.params.todoId);
  
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'ID de usuario inválido' });
  }
  
  if (req.params.todoId && isNaN(todoId)) {
    return res.status(400).json({ error: 'ID de tarea inválido' });
  }
  
  next();
});

// POST /users/:userId/todos - Crear nueva tarea
router.post('/', createTodo);

// GET /users/:userId/todos - Obtener todas las tareas de un usuario
router.get('/', getAllTodosByUser);

// GET /users/:userId/todos/:todoId - Obtener tarea específica
router.get('/:todoId', getTodoById);

// PUT /users/:userId/todos/:todoId - Actualizar tarea
router.put('/:todoId', updateTodo);

// DELETE /users/:userId/todos/:todoId - Eliminar tarea
router.delete('/:todoId', deleteTodo);

export default router;