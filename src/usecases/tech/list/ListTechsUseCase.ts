import { verify } from "jsonwebtoken";
import { ITechRepository } from "../../../entities/tech/ITechRepository";
import { Tech } from "../../../entities/tech/Tech";
import { IPayload } from "../../../services/jwt/IPayload";
import { config } from "dotenv";

config();

const SECRET = process.env.SECRET_KEY || "";

export class ListTechsUseCase {
  constructor(private techRepository: ITechRepository) {}

  async execute(token: string): Promise<Tech[]> {
    const jwt = verify(token, SECRET) as IPayload;

    const techs = await this.techRepository.list();

    if (jwt.permissions.admin === false) {
      const notTickets = techs.map((tech) => {
        return new Tech(
          {
            admin: tech.admin,
            color: tech.color,
            create_ticket: tech.create_ticket,
            delete_ticket: tech.delete_ticket,
            name: tech.name,
            password: tech.password,
          },
          tech.id,
          tech.status
        );
      });

      return notTickets;
    }

    return techs;
  }
}
