import e, { Router } from 'express';

import { upload } from '../controllers/gemini.controller';

// Importa o módulo de roteamento de imagens
const geminiRouter: Router = Router();

// Define as rotas de imagens
geminiRouter.post('/upload', upload);

export default geminiRouter;
