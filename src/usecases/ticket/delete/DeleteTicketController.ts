import { Request, Response } from "express";
import { DeleteTicketUseCase } from "./DeleteTicketUseCase";
import { getToken } from "../../../services/jwt/GetToken";

export class DeleteTicketController {
  constructor(private deleteTicketUseCase: DeleteTicketUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.body;
    try {
      const token = getToken(req);
      await this.deleteTicketUseCase.execute(id, token);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ error: error.message });
      }
    }
  }
}
