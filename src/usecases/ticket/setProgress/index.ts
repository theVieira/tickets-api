import { TicketRepository } from "../../../repositories/ticket/TicketRepository";
import { SetProgressController } from "./SetProgressController";
import { SetProgressUseCase } from "./SetProgressUseCase";

const repository = new TicketRepository();
const usecase = new SetProgressUseCase(repository);
const setProgressController = new SetProgressController(usecase);

export { setProgressController };
