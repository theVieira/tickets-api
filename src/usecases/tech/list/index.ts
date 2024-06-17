import { TechRepository } from "../../../repositories/tech/TechRepository";
import { ListTechsController } from "./ListTechsController";
import { ListTechsUseCase } from "./ListTechsUseCase";

const repository = new TechRepository();
const usecase = new ListTechsUseCase(repository);
const listTechsController = new ListTechsController(usecase);

export { listTechsController };
