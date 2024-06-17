import { TechRepository } from "../../../repositories/tech/TechRepository";
import { CreateTechController } from "./CreateTechController";
import { CreateTechUseCase } from "./CreateTechUseCase";

const repository = new TechRepository();
const usecase = new CreateTechUseCase(repository);
const createTechController = new CreateTechController(usecase);

export { createTechController };
