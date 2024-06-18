import { TicketRepository } from "../../../repositories/ticket/TicketRepository";
import { SetFinishedController } from "./SetFinishedController";
import { SetFinishedUseCase } from "./SetFinishedUseCase";

const repository = new TicketRepository();
const usecase = new SetFinishedUseCase(repository);
const setFinishedController = new SetFinishedController(usecase);

export { setFinishedController };
