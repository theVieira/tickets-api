import { TicketRepository } from "../../../repositories/ticket/TicketRepository";
import { OpenTicketController } from "./OpenTicketController";
import { OpenTicketUseCase } from "./OpenTicketUseCase";

const repository = new TicketRepository();
const usecase = new OpenTicketUseCase(repository);
const openTicketController = new OpenTicketController(usecase);

export { openTicketController };
