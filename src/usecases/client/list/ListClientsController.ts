import { Request, Response } from "express";
import { ListClientsUseCase } from "./ListClientUseCase";
import { getToken } from "../../../services/jwt/GetToken";

export class ListClientsController {
  constructor(private listClientsUseCase: ListClientsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const token = getToken(req);
      const clients = await this.listClientsUseCase.execute(token);
      res.status(200).json(clients);
      return;
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }
}
