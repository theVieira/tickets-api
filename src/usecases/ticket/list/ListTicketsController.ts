import { Request, Response } from "express";
import { ListTicketsUseCase } from "./ListTicketsUseCase";

export class ListTicketsController {
  constructor(private listTicketsUseCase: ListTicketsUseCase) {}

  async handle(req: Request, res: Response) {
    const { token } = req.body;
    try {
      const tickets = await this.listTicketsUseCase.execute(token);
      return res.status(200).json(tickets);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
}
