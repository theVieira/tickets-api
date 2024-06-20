import { Request, Response } from "express";
import { SetFinishedUseCase } from "./SetFinishedUseCase";

export class SetFinishedController {
  constructor(private updateTicketStatusUseCase: SetFinishedUseCase) {}

  async handle(req: Request, res: Response) {
    const { id, techName, token } = req.body;

    try {
      const ticket = await this.updateTicketStatusUseCase.execute(
        id,
        token,
        techName
      );
      return res.status(200).json(ticket);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
}
