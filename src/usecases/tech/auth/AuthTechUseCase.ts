import { sign } from "jsonwebtoken";
import { ITechRepository } from "../../../entities/tech/ITechRepository";
import { config } from "dotenv";
import { compare } from "bcrypt";

config();
const SECRET = process.env.SECRET_KEY ?? "";

export class AuthTechUseCase {
  constructor(private techRepository: ITechRepository) {}

  async execute(name: string, password: string): Promise<string> {
    const tech = await this.techRepository.auth(name.toLowerCase());

    const verify = await compare(password, tech.password.toString());

    if (verify === false) {
      throw new Error("incorrect credentials");
    }

    const token = sign(
      {
        name: tech.name,
        status: tech.status,
        permissions: {
          admin: tech.admin,
          create_ticket: tech.create_ticket,
          delete_ticket: tech.delete_ticket,
        },
      },
      SECRET
    );

    tech.token = token;
    tech.password = "";

    return tech;
  }
}
