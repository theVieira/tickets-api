import { Request, Response } from "express";
import { EditDescriptionUseCase } from "./EditTicketUseCase";
import { getToken } from "../../../services/jwt/GetToken";

export class EditDescriptionController {
  constructor(private editDescriptionuseCase: EditDescriptionUseCase) {}

  async handle(req: Request, res: Response) {
    const { id, description, category } = req.body;
    try {
      const token = getToken(req);

      const ticket = await this.editDescriptionuseCase.execute(
        id,
        description,
        category,
        token
      );

      res.status(200).json(ticket);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
}
