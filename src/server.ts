import dotenv from 'dotenv';
import express, { Express } from 'express';

// Carrega as variáveis de ambiente
dotenv.config();

// Cria a aplicação Express
const app: Express = express();

// Define a porta do servidor
const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});