import { ClientRepository } from "../../../repositories/client/ClientRepository";
import { CreateClientController } from "./CreateClientController";
import { CreateClientUseCase } from "./CreateClientUseCase";

const repository = new ClientRepository();
const usecase = new CreateClientUseCase(repository);
const createClientController = new CreateClientController(usecase);

export { createClientController };
