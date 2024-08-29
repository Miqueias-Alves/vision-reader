import { Router  } from "express";

import readerImageRouter from "./image.route";
import geminiRouter from "./gemini.route";

const routes: Router = Router();

routes.use("/image", readerImageRouter);
routes.use("/gemini", geminiRouter);

export default routes;
