import { Request, Response } from "express";
import { CreateTicketUseCase } from "./CreateTicketUseCase";
import { getToken } from "../../../services/jwt/GetToken";

export class CreateTicketController {
  constructor(private createTicketUseCase: CreateTicketUseCase) {}

  async handle(req: Request, res: Response) {
    const token = getToken(req);
    const { description, clientName, priority } = req.body;

    try {
      const ticket = await this.createTicketUseCase.execute(
        description,
        priority,
        clientName,
        token
      );

      return res.status(201).json(ticket);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
}
