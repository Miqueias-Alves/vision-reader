import dotenv from 'dotenv';
import express, { Express } from 'express';
import routes from './routes';

// Carrega as variáveis de ambiente
dotenv.config();

// Cria a aplicação Express
const app: Express = express();

// Define a porta do servidor
const PORT = process.env.PORT || 3000;

// Middleware para permitir requisições com corpo JSON
app.use(express.json());

// Define a rota raiz
app.use('/api', routes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
