import { Request, Response } from "express";
import { ReOpenUseCase } from "./ReOpenUseCase";
import { getToken } from "../../../services/jwt/GetToken";

export class ReOpenController {
  constructor(private reOpenUseCase: ReOpenUseCase) {}

  async handle(req: Request, res: Response) {
    const token = getToken(req);
    const { id } = req.body;

    try {
      const ticket = await this.reOpenUseCase.execute(id, token);
      return res.status(200).json(ticket);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
}
