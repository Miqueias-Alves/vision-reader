import { Router  } from "express";

import readerImageRouter from "./readerImageRouter";

const routes: Router = Router();

routes.use("/image", readerImageRouter);

export default routes;
