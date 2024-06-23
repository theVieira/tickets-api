import { TicketRepository } from "../../../repositories/ticket/TicketRepository";
import { DeleteTicketController } from "./DeleteTicketController";
import { DeleteTicketUseCase } from "./DeleteTicketUseCase";

const repository = new TicketRepository();
const usecase = new DeleteTicketUseCase(repository);
const deleteTicketController = new DeleteTicketController(usecase);

export { deleteTicketController };
