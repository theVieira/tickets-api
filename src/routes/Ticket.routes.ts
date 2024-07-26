import { Request, Response, Router } from "express";
import { createTicketController } from "../usecases/ticket/create";
import { setFinishedController } from "../usecases/ticket/setFinished";
import { listTicketsController } from "../usecases/ticket/list";
import { setProgressController } from "../usecases/ticket/setProgress";
import { reOpenTicketController } from "../usecases/ticket/reopen";
import { deleteTicketController } from "../usecases/ticket/delete";
import { editDescriptionController } from "../usecases/ticket/edit";
import { addNoteController } from "../usecases/ticket/addNote";
import { openTicketController } from "../usecases/ticket/open";

const ticketRoutes = Router();

ticketRoutes.post("/create", (req: Request, res: Response) => {
  createTicketController.handle(req, res);
});

ticketRoutes.put("/finished", (req: Request, res: Response) => {
  setFinishedController.handle(req, res);
});

ticketRoutes.get("/list/:order", (req: Request, res: Response) => {
  listTicketsController.handle(req, res);
});

ticketRoutes.put("/progress", (req: Request, res: Response) => {
  setProgressController.handle(req, res);
});

ticketRoutes.put("/reopen", (req: Request, res: Response) => {
  reOpenTicketController.handle(req, res);
});

ticketRoutes.delete("/delete", (req: Request, res: Response) => {
  deleteTicketController.handle(req, res);
});

ticketRoutes.put("/edit", (req: Request, res: Response) => {
  editDescriptionController.handle(req, res);
});

ticketRoutes.put("/addNote", (req: Request, res: Response) => {
  addNoteController.handle(req, res);
});

ticketRoutes.put("/open", (req: Request, res: Response) => {
  openTicketController.handle(req, res);
});

export { ticketRoutes };
