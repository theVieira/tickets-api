import { verify } from "jsonwebtoken";
import { ITechRepository } from "../../../entities/tech/ITechRepository";
import { IPayload } from "../../../services/jwt/IPayload";
import { config } from "dotenv";
import { checkPermission } from "../../../services/checkPermission/CheckPermission";
import { Tech } from "../../../entities/tech/Tech";
import { hashSync } from "bcrypt";

config();
const SECRET = process.env.SECRET_KEY ?? "";

export class ReplacePasswordUseCase {
  constructor(private techRepository: ITechRepository) {}

  async execute(
    name: string,
    password: string,
    newPassword: string,
    token: string
  ) {
    const { permissions } = verify(token, SECRET) as IPayload;

    if (checkPermission(permissions, "admin") == false) {
      throw new Error("ForbiddenError");
    }

    const findTech = await this.techRepository.findByName(name);
    if (findTech instanceof Tech) {
      if (findTech.password !== password) {
        throw new Error("incorrect credentials");
      }

      const hashedPass = hashSync(newPassword, 8);
      const tech = await this.techRepository.replacePassword(name, hashedPass);
      tech.password = "";

      return tech;
    } else {
      throw new Error("Tech not found!");
    }
  }
}
