import { Request, Response } from "express";
import { ReOpenUseCase } from "./ReOpenUseCase";

export class ReOpenController {
  constructor(private reOpenUseCase: ReOpenUseCase) {}

  async handle(req: Request, res: Response) {
    const { id, token } = req.body;
    try {
      const ticket = await this.reOpenUseCase.execute(id, token);
      return res.status(200).json(ticket);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "ForbiddenError") {
          return res.status(403).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
      }
    }
  }
}
