import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js'; // Ruta personalizada
import userRoutes from './rutas/userRoutes.js';
import todoRoutes from './rutas/todoRoutes.js';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para pasar instancia de Prisma
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Rutas principales
app.use('/users', userRoutes);
app.use('/users/:userId/todos', todoRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Cerrar Prisma al apagar el servidor
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log('Servidor cerrado');
  });
});

// Exportar prisma para usar en controladores
export { prisma };