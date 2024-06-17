import { JwtPayload } from "jsonwebtoken";

export interface IPayload extends JwtPayload {
  name: string;
  status: "active" | "inactive";
  permissions: {
    admin: boolean;
    create_ticket: boolean;
    delete_ticket: boolean;
  };
}
