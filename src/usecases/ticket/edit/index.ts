import { TicketRepository } from "../../../repositories/ticket/TicketRepository";
import { EditDescriptionController } from "./EditTicketController";
import { EditDescriptionUseCase } from "./EditTicketUseCase";

const repository = new TicketRepository();
const usecase = new EditDescriptionUseCase(repository);
const editDescriptionController = new EditDescriptionController(usecase);

export { editDescriptionController };
