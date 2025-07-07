import express from 'express';
import { config } from 'dotenv';
import userRoutes from './rutas/userRoutes.js';
import todoRoutes from './rutas/todoRoutes.js';

// Configuración inicial
config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.json({
    message: 'API de Usuarios y Tareas funcionando!',
    endpoints: {
      users: '/users',
      todos: '/users/:userId/todos'
    }
  });
});

app.use('/users', userRoutes);
app.use('/users/:userId/todos', todoRoutes);

// Manejo de errores
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`);
});