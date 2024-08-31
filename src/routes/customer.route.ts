import { Router } from "express";

import { create, findById, findAll, findMeasuresByCustomerId } from "../controllers/customer.controller";

const customerRouter: Router = Router();

customerRouter.post("/", create);
customerRouter.get("/:id", findById);
customerRouter.get("/", findAll);
customerRouter.get("/:id/list", findMeasuresByCustomerId);

export default customerRouter;
