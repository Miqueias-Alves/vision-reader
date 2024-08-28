import { Router } from 'express';

// Importa o módulo de roteamento de imagens
const readerImageRouter: Router = Router();

// Define as rotas de imagens
readerImageRouter.post('/upload', (req, res) => {
  res.send('Reader image route');
});

readerImageRouter.patch('/confirm', (req, res) => {
  res.send('Reader image route');
});

readerImageRouter.get('/:code/list', (req, res) => {
  res.send('Reader image route');
});

export default readerImageRouter;
