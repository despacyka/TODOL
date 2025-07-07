import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controladores/userControllers.js';

const router = express.Router();

// POST /users - Crear nuevo usuario
router.post('/', createUser);

// GET /users - Obtener todos los usuarios
router.get('/', getAllUsers);

// GET /users/:id - Obtener usuario por ID
router.get('/:id', getUserById);

// PUT /users/:id - Actualizar usuario
router.put('/:id', updateUser);

// DELETE /users/:id - Eliminar usuario
router.delete('/:id', deleteUser);

export default router;