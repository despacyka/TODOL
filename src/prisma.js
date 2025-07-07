import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Manejar cierre de conexión
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default prisma;