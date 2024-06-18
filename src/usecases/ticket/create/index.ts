import { TicketRepository } from "../../../repositories/ticket/TicketRepository";
import { CreateTicketController } from "./CreateTicketController";
import { CreateTicketUseCase } from "./CreateTicketUseCase";

const repository = new TicketRepository();
const usecase = new CreateTicketUseCase(repository);
const createTicketController = new CreateTicketController(usecase);

export { createTicketController };
