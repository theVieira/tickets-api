import { ITechRepository } from "../../../entities/tech/ITechRepository";
import { Tech } from "../../../entities/tech/Tech";
import { config } from "dotenv";
import { sign } from "jsonwebtoken";
import { verify } from "jsonwebtoken";
import { hashSync } from "bcrypt";
import { IPayload } from "../../../services/jwt/IPayload";
config();

const SECRET = process.env.SECRET_KEY || "";

export class CreateTechUseCase {
  constructor(private techRepository: ITechRepository) {}

  async execute(
    name: string,
    password: string,
    admin: boolean,
    create_ticket: boolean,
    delete_ticket: boolean,
    color: string,
    token: string
  ): Promise<Tech> {
    const jwt = verify(token, SECRET) as IPayload;

    if (jwt.admin === false) throw new Error("must be admin");

    if (password.length < 8) {
      throw Error("password must be at least 8 characters long");
    }
    const hashedPassword = hashSync(password, 8);
    const tech = new Tech({
      admin,
      color,
      create_ticket,
      delete_ticket,
      name,
      password: hashedPassword,
    });

    const aTech = await this.techRepository.create(tech);

    const aToken = await sign(
      {
        name: aTech.name,
        password: aTech.password,
        permissions: {
          create_ticket: aTech.create_ticket,
          delete_ticket: aTech.delete_ticket,
          admin: aTech.admin,
        },
      },
      SECRET
    );

    aTech.token = aToken;

    return aTech;
  }
}
