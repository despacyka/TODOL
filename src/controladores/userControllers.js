import { prisma } from '../server.js';

export const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    
    // Validar entrada
    if (!username || !email) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    
    const newUser = await prisma.user.create({
      data: { username, email }
    });
    
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Username o email ya existen' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: req.body
    });
    
    res.json(updatedUser);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else if (error.code === 'P2002') {
      res.status(400).json({ error: 'Username o email ya existen' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const deletedUser = await prisma.user.delete({
      where: { id: userId }
    });
    
    res.json({ message: 'Usuario eliminado', user: deletedUser });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};