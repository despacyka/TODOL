import express from 'express';
import userRoutes from './rutas/userRoutes.js';
import todoRoutes from './rutas/todoRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas principales
app.use('/users', userRoutes);
app.use('/users/:userId/todos', todoRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});