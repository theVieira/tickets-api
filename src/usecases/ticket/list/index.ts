import { TicketRepository } from "../../../repositories/ticket/TicketRepository";
import { ListTicketsController } from "./ListTicketsController";
import { ListTicketsUseCase } from "./ListTicketsUseCase";

const repository = new TicketRepository();
const usecase = new ListTicketsUseCase(repository);
const listTicketsController = new ListTicketsController(usecase);

export { listTicketsController };
