import { TechStatus } from "../../entities/tech/TechProps";

export function MapTechStatus(status: string): TechStatus {
  switch (status) {
    case "active":
      return TechStatus.active;
    case "inactive":
      return TechStatus.inactive;

    default:
      throw new Error("status unknow");
  }
}
