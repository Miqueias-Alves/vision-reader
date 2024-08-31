import { Router  } from "express";

import measuringRouter from "./measuring.route";
import customerRouter from "./customer.route";

const routes: Router = Router();

routes.use("/measure", measuringRouter);
routes.use("/customer", customerRouter);

export default routes;
