import { Request, Response } from "express";
import { CreateTicketUseCase } from "./CreateTicketUseCase";

export class CreateTicketController {
  constructor(private createTicketUseCase: CreateTicketUseCase) {}

  async handle(req: Request, res: Response) {
    const { description, clientName, priority, token } = req.body;

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
        return res.status(401).json({ error: error.message });
      }
    }
  }
}
