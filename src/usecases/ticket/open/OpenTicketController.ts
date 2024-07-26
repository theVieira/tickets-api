import { Request, Response } from "express";
import { OpenTicketUseCase } from "./OpenTicketUseCase";
import { getToken } from "../../../services/jwt/GetToken";

export class OpenTicketController {
  constructor(private openTicketUseCase: OpenTicketUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const token = getToken(req);

      const ticket = await this.openTicketUseCase.execute(id, token);
      return res.status(200).json(ticket);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
}
