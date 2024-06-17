import { Request, Response } from "express";
import { CreateTechUseCase } from "./CreateTechUseCase";

export class CreateTechController {
  constructor(private createClientUseCase: CreateTechUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const {
      name,
      password,
      admin,
      create_ticket,
      delete_ticket,
      color,
      token,
    } = req.body;

    try {
      const tech = await this.createClientUseCase.execute(
        name,
        password,
        admin,
        create_ticket,
        delete_ticket,
        color,
        token
      );

      res.status(201).json(tech);
      return;
    } catch (error) {
      if (error instanceof Error)
        res.status(401).json({ error: error.message });
      return;
    }
  }
}
