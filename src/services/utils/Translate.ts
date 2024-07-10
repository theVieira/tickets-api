export function Translate(string: string) {
  switch (string) {
    case "urgent":
      return "Urgente";
    case "high":
      return "Alta";
    case "medium":
      return "Média";
    case "low":
      return "Baixa";
    case "daily":
      return "Diário";
    case "delivery":
      return "Entrega";
    case "budget":
      return "Orçamento";

    default:
      throw new Error("unknow string");
  }
}
