import { ITechRepository } from "../../../entities/tech/ITechRepository";
import { Tech } from "../../../entities/tech/Tech";
import { config } from "dotenv";
import { sign } from "jsonwebtoken";
import { verify } from "jsonwebtoken";
import { hashSync } from "bcrypt";
import { IPayload } from "../../../services/jwt/IPayload";
import { checkPermission } from "../../../services/checkPermission/CheckPermission";

config();
const SECRET = process.env.SECRET_KEY ?? "";

export class CreateTechUseCase {
  constructor(private techRepository: ITechRepository) {}

  async execute(props: {
    name: string;
    password: string;
    phone: string;
    admin: boolean;
    create_ticket: boolean;
    delete_ticket: boolean;
    color: string;
    token: string;
  }): Promise<Tech> {
    const { permissions } = verify(props.token, SECRET) as IPayload;

    if (checkPermission(Object.assign(this, permissions), "admin") === false) {
      throw new Error("ForbiddenError");
    }

    props.password = hashSync(props.password, 8);

    const tech = new Tech(Object.assign(this, props));
    const created = await this.techRepository.create(tech);

    const generatedToken = sign(
      {
        name: created.name,
        status: created.status,
        permissions: {
          create_ticket: created.create_ticket,
          delete_ticket: created.delete_ticket,
          admin: created.admin,
        },
      },
      SECRET
    );

    created.token = generatedToken;

    return created;
  }
}
