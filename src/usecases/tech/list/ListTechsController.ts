import { Request, Response } from "express";
import { ListTechsUseCase } from "./ListTechsUseCase";
import { getToken } from "../../../services/jwt/GetToken";

export class ListTechsController {
  constructor(private listTechsUseCase: ListTechsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const token = getToken(req);
      const techs = await this.listTechsUseCase.execute(token);
      res.status(200).json(techs);
      return;
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
      return;
    }
  }
}
