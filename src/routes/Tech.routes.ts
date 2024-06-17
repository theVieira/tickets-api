import { Request, Response, Router } from "express";
import { createTechController } from "../usecases/tech/create";
import { listTechsController } from "../usecases/tech/list";
import { swapTechStatusController } from "../usecases/tech/swapStatus";
import { authTechController } from "../usecases/tech/auth";

const techRoutes = Router();

techRoutes.post("/create", (req: Request, res: Response) => {
  createTechController.handle(req, res);
});

techRoutes.get("/list", (req: Request, res: Response) => {
  listTechsController.handle(req, res);
});

techRoutes.put("/swapStatus", (req: Request, res: Response) => [
  swapTechStatusController.handle(req, res),
]);

techRoutes.post("/auth", (req: Request, res: Response) => {
  authTechController.handle(req, res);
});

export { techRoutes };
