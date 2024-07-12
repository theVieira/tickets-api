import { TicketRepository } from "../../../repositories/ticket/TicketRepository";
import { EditDescriptionController } from "./EditDescriptionController";
import { EditDescriptionUseCase } from "./EditDescriptionUseCase";

const repository = new TicketRepository();
const usecase = new EditDescriptionUseCase(repository);
const editDescriptionController = new EditDescriptionController(usecase);

export { editDescriptionController };
