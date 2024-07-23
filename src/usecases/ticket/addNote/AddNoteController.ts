import { Request, Response } from "express";
import { AddNoteUseCase } from "./AddNoteUseCase";
import { getToken } from "../../../services/jwt/GetToken";

export class AddNoteController {
  constructor(private addNoteUseCase: AddNoteUseCase) {}

  async handle(req: Request, res: Response) {
    const { id, note } = req.body;
    try {
      const token = getToken(req);
      const ticket = await this.addNoteUseCase.execute(id, note, token);
      return res.status(200).json(ticket);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
}
