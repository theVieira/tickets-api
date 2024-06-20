import { Request, Response } from "express";
import { SwapTechStatusUseCase } from "./SwapTechStatusUseCase";

export class SwapTechStatusController {
  constructor(private swapTechStatusUseCase: SwapTechStatusUseCase) {}

  async handle(req: Request, res: Response) {
    const { name, status, token } = req.body;

    try {
      const tech = await this.swapTechStatusUseCase.execute(
        name,
        status,
        token
      );
      return res.status(200).json(tech);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ error: error.message });
      }
    }
  }
}
