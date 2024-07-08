import { Request, Response } from "express";
import { ReplacePasswordUseCase } from "./ReplacePasswordUseCase";
import { getToken } from "../../../services/jwt/GetToken";

export class ReplacePasswordController {
  constructor(private replacePasswordUseCase: ReplacePasswordUseCase) {}

  async handle(req: Request, res: Response) {
    const { name, password, newPassword } = req.body;

    try {
      const tech = await this.replacePasswordUseCase.execute(
        name,
        password,
        newPassword
      );
      return res.status(200).json(tech);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ error: error.message });
      }
    }
  }
}
