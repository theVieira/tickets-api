export type TechProps = {
  name: string;
  password: string;
  admin: boolean;
  create_ticket: boolean;
  delete_ticket: boolean;
  color: string;
};

export enum TechStatus {
  active = "active",
  inactive = "inactive",
}
