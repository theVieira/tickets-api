import { verify } from "jsonwebtoken";
import { ITechRepository } from "../../../entities/tech/ITechRepository";
import { Tech } from "../../../entities/tech/Tech";
import { config } from "dotenv";
import { IPayload } from "../../../services/jwt/IPayload";
import { checkPermission } from "../../../services/checkPermission/CheckPermission";

config();
const SECRET = process.env.SECRET_KEY ?? "";

export class SwapTechStatusUseCase {
  constructor(private techRepository: ITechRepository) {}

  async execute(
    name: string,
    status: "active" | "inactive",
    token: string
  ): Promise<Tech> {
    const { permissions } = verify(token, SECRET) as IPayload;

    if (checkPermission(Object.assign(this, permissions), "admin") === false) {
      throw new Error("ForbiddenError");
    }

    const tech = await this.techRepository.swapStatus(name, status);

    return tech;
  }
}
