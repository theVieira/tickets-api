import { verify } from "jsonwebtoken";
import { ITechRepository } from "../../../entities/tech/ITechRepository";
import { IPayload } from "../../../services/jwt/IPayload";
import { config } from "dotenv";
import { checkPermission } from "../../../services/checkPermission/CheckPermission";
import { Tech } from "../../../entities/tech/Tech";
import { compareSync, hashSync } from "bcrypt";

config();
const SECRET = process.env.SECRET_KEY ?? "";

export class ReplacePasswordUseCase {
  constructor(private techRepository: ITechRepository) {}

  async execute(name: string, password: string, newPassword: string) {
    const findTech = await this.techRepository.findByName(name);
    if (findTech instanceof Tech) {
      const compare = compareSync(password, findTech.password);
      if (compare == false) {
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
