import { Router } from 'express';

import { upload } from '../controllers/image.controller';

// Importa o módulo de roteamento de imagens
const readerImageRouter: Router = Router();

// Define as rotas de imagens
readerImageRouter.post('/upload', upload);

readerImageRouter.patch('/confirm', (req, res) => {
  res.send('Reader image route');
});

readerImageRouter.get('/:code/list', (req, res) => {
  res.send('Reader image route');
});

export default readerImageRouter;
