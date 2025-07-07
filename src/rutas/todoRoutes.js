import express from 'express';
import {
  createTodo,
  getAllTodosByUser,
  getTodoById,
  updateTodo,
  deleteTodo
} from '../controladores/todoControllers.js';

const router = express.Router();

router.post('/', createTodo);
router.get('/', getAllTodosByUser);
router.get('/:todoId', getTodoById);
router.put('/:todoId', updateTodo);
router.delete('/:todoId', deleteTodo);

export default router;