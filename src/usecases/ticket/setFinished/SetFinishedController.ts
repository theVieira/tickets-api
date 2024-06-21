import { Request, Response } from "express";
import { SetFinishedUseCase } from "./SetFinishedUseCase";
import { getToken } from "../../../services/jwt/GetToken";

export class SetFinishedController {
  constructor(private updateTicketStatusUseCase: SetFinishedUseCase) {}

  async handle(req: Request, res: Response) {
    const token = getToken(req);
    const { id, techName } = req.body;

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
