import prisma from '../prisma.js';
export const createTodo = async (req, res) => {
  try {
    const newTodo = await prisma.todo.create({
      data: {
        label: req.body.label,
        completed: req.body.completed || false,
        userId: parseInt(req.params.userId)
      }
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllTodosByUser = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      where: { userId: parseInt(req.params.userId) }
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: { id: parseInt(req.params.todoId) }
    });
    
    if (!todo || todo.userId !== parseInt(req.params.userId)) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(req.params.todoId) },
      data: req.body
    });
    
    if (updatedTodo.userId !== parseInt(req.params.userId)) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: { id: parseInt(req.params.todoId) }
    });
    
    if (!todo || todo.userId !== parseInt(req.params.userId)) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    const deletedTodo = await prisma.todo.delete({
      where: { id: parseInt(req.params.todoId) }
    });
    
    res.json(deletedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};