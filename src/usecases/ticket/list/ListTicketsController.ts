import { Request, Response } from "express";
import { ListTicketsUseCase } from "./ListTicketsUseCase";
import { getToken } from "../../../services/jwt/GetToken";

export class ListTicketsController {
  constructor(private listTicketsUseCase: ListTicketsUseCase) {}

  async handle(req: Request, res: Response) {
    const { order } = req.body;

    try {
      const token = getToken(req);
      const tickets = await this.listTicketsUseCase.execute(token, order);
      return res.status(200).json(tickets);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
}
