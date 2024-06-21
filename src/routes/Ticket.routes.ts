import { Request, Response, Router } from "express";
import { createTicketController } from "../usecases/ticket/create";
import { setFinishedController } from "../usecases/ticket/setFinished";
import { listTicketsController } from "../usecases/ticket/list";
import { setProgressController } from "../usecases/ticket/setProgress";
import { reOpenTicketController } from "../usecases/ticket/reopen";

const ticketRoutes = Router();

ticketRoutes.post("/create", (req: Request, res: Response) => {
  createTicketController.handle(req, res);
});

ticketRoutes.put("/finished", (req: Request, res: Response) => {
  setFinishedController.handle(req, res);
});

ticketRoutes.get("/list", (req: Request, res: Response) => {
  listTicketsController.handle(req, res);
});

ticketRoutes.put("/progress", (req: Request, res: Response) => {
  setProgressController.handle(req, res);
});

ticketRoutes.put("/reopen", (req: Request, res: Response) => {
  reOpenTicketController.handle(req, res);
});

export { ticketRoutes };
