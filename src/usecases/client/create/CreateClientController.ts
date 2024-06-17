import { Request, Response } from "express";
import { CreateClientUseCase } from "./CreateClientUseCase";

export class CreateClientController {
  constructor(private createClientUseCase: CreateClientUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { name, token } = req.body;

    try {
      const client = await this.createClientUseCase.execute(name, token);
      res.status(201).json(client);
      return;
    } catch (error) {
      if (error instanceof Error)
        res.status(401).json({ error: error.message });
      return;
    }
  }
}
