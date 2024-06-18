import { verify } from "jsonwebtoken";
import { ITechRepository } from "../../../entities/tech/ITechRepository";
import { Tech } from "../../../entities/tech/Tech";
import { config } from "dotenv";
import { IPayload } from "../../../services/jwt/IPayload";
config();
const SECRET = process.env.SECRET_KEY || "";

export class SwapTechStatusUseCase {
  constructor(private techRepository: ITechRepository) {}

  async execute(
    name: string,
    status: "active" | "inactive",
    token: string
  ): Promise<Tech> {
    const jwt = verify(token, SECRET) as IPayload;

    if (jwt.admin === false) throw new Error("ForbiddenError");

    const tech = await this.techRepository.swapStatus(name, status);

    return tech;
  }
}
