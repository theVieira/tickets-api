import { ClientRepository } from "../../../repositories/client/ClientRepository";
import { ListClientsUseCase } from "./ListClientUseCase";
import { ListClientsController } from "./ListClientsController";

const repository = new ClientRepository();
const usecase = new ListClientsUseCase(repository);
const listClientsController = new ListClientsController(usecase);

export { listClientsController };
