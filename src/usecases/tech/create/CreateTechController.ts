import { Request, Response } from "express";
import { CreateTechUseCase } from "./CreateTechUseCase";
import { getToken } from "../../../services/jwt/GetToken";

export class CreateTechController {
  constructor(private createClientUseCase: CreateTechUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { name, password, admin, create_ticket, delete_ticket, color } =
      req.body;

    try {
      const token = getToken(req);
      const tech = await this.createClientUseCase.execute({
        name,
        password,
        admin,
        create_ticket,
        delete_ticket,
        color,
        token,
      });

      res.status(201).json(tech);
      return;
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
      return;
    }
  }
}
