import { Request, Response } from "express";
import { ListTechsUseCase } from "./ListTechsUseCase";

export class ListTechsController {
  constructor(private listTechsUseCase: ListTechsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { token } = req.body;

    try {
      const techs = await this.listTechsUseCase.execute(token);
      res.status(200).json(techs);
      return;
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
      return;
    }
  }
}
