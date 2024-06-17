import { TechRepository } from "../../../repositories/tech/TechRepository";
import { SwapTechStatusController } from "./SwapTechStatusController";
import { SwapTechStatusUseCase } from "./SwapTechStatusUseCase";

const repository = new TechRepository();
const usecase = new SwapTechStatusUseCase(repository);
const swapTechStatusController = new SwapTechStatusController(usecase);

export { swapTechStatusController };
