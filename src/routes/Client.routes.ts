import { Request, Response, Router } from "express";
import { createClientController } from "../usecases/client/create";
import { listClientsController } from "../usecases/client/list";

const clientRouter = Router();

clientRouter.post("/create", async (req: Request, res: Response) => {
  await createClientController.handle(req, res);
});

clientRouter.get("/list", async (req: Request, res: Response) => {
  await listClientsController.handle(req, res);
});

export { clientRouter };
