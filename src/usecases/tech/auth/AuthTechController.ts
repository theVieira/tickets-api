import { Request, Response } from "express";
import { AuthTechUseCase } from "./AuthTechUseCase";

export class AuthTechController {
  constructor(private authTechUseCase: AuthTechUseCase) {}

  async handle(req: Request, res: Response) {
    const { name, password } = req.body;
    try {
      const tech = await this.authTechUseCase.execute(name, password);
      return res.status(200).json(tech);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ error: error.message });
      }
    }
  }
}
