import { TechRepository } from "../../../repositories/tech/TechRepository";
import { AuthTechController } from "./AuthTechController";
import { AuthTechUseCase } from "./AuthTechUseCase";

const repository = new TechRepository();
const usecase = new AuthTechUseCase(repository);
const authTechController = new AuthTechController(usecase);

export { authTechController };
