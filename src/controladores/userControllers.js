import prisma from '../prisma.js';
export const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = await prisma.user.create({
      data: { username, email }
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    user ? res.json(user) : res.status(404).json({ error: 'Usuario no encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json(deletedUser);
  } catch (error) {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
};