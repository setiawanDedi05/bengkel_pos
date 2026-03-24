// ...existing code...
import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import { seedAdminAndCashier } from './services/seedUsers.js';
import itemRoutes from './routes/itemRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import auth from './middlewares/auth.js';
import errorHandler from './middlewares/errorHandler.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bengkel POS API',
      version: '1.0.0',
      description: 'API documentation for Bengkel POS',
    },
  },
  apis: ['./src/controllers/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', auth, itemRoutes);
app.use('/api/transactions', auth, transactionRoutes);
app.use('/api/users', auth, userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync();
    await seedAdminAndCashier();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();
