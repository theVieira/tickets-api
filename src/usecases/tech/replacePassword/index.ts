import { TechRepository } from "../../../repositories/tech/TechRepository";
import { ReplacePasswordController } from "./ReplacePasswordController";
import { ReplacePasswordUseCase } from "./ReplacePasswordUseCase";

const repository = new TechRepository();
const usecase = new ReplacePasswordUseCase(repository);
const replacePasswordController = new ReplacePasswordController(usecase);

export { replacePasswordController };
