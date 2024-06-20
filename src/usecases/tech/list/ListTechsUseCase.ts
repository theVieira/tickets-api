import { verify } from "jsonwebtoken";
import { ITechRepository } from "../../../entities/tech/ITechRepository";
import { Tech } from "../../../entities/tech/Tech";
import { IPayload } from "../../../services/jwt/IPayload";
import { config } from "dotenv";
import { checkPermission } from "../../../services/checkPermission/CheckPermission";

config();
const SECRET = process.env.SECRET_KEY ?? "";

export class ListTechsUseCase {
  constructor(private techRepository: ITechRepository) {}

  async execute(token: string): Promise<Tech[]> {
    const { permissions } = verify(token, SECRET) as IPayload;

    const techs = await this.techRepository.list();

    if (checkPermission(Object.assign(this, permissions), "admin")) {
      return techs;
    }

    return techs.map((tech) => {
      return new Tech(
        Object.assign(this, tech),
        tech.id,
        tech.status,
        undefined
      );
    });
  }
}
