import { Request, Response } from "express";
import { SetProgressUseCase } from "./SetProgressUseCase";

export class SetProgressController {
  constructor(private updateTicketStatusUseCase: SetProgressUseCase) {}

  async handle(req: Request, res: Response) {
    const { id, token } = req.body;

    try {
      const ticket = await this.updateTicketStatusUseCase.execute(id, token);
      return res.status(200).json(ticket);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
}
