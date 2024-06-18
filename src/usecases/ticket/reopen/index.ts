import { TicketRepository } from "../../../repositories/ticket/TicketRepository";
import { ReOpenController } from "./ReOpenController";
import { ReOpenUseCase } from "./ReOpenUseCase";

const repository = new TicketRepository();
const usecase = new ReOpenUseCase(repository);
const reOpenTicketController = new ReOpenController(usecase);

export { reOpenTicketController };
