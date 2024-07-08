import { verify } from "jsonwebtoken";
import { ITicketRpository } from "../../../entities/ticket/ITicketRepository";
import { Ticket } from "../../../entities/ticket/Ticket";
import { config } from "dotenv";
import { IPayload } from "../../../services/jwt/IPayload";
import { checkPermission } from "../../../services/checkPermission/CheckPermission";
import { MapTicketPriority } from "../../../services/utils/MapTicketPriority";
import { Telegraf } from "telegraf";
import { TicketPriority } from "../../../entities/ticket/TicketProps";

config();
const SECRET = process.env.SECRET_KEY ?? "";
const BOT_TOKEN = process.env.BOT_TOKEN ?? "";
const CHAT_ID = process.env.CHAT_ID ?? "";

export class CreateTicketUseCase {
  constructor(private ticketRepository: ITicketRpository) {}

  async execute(
    description: string,
    priority: "urgent" | "high" | "medium" | "low",
    clientName: string,
    token: string
  ): Promise<Ticket> {
    const bot = new Telegraf(BOT_TOKEN);
    const { permissions } = verify(token, SECRET) as IPayload;

    if (
      checkPermission(
        Object.assign(this, permissions),
        "admin" || "create_ticket"
      ) === false
    ) {
      throw new Error("ForbiddenError");
    }

    const ticket = new Ticket({
      clientName,
      priority: MapTicketPriority(priority),
      description,
    });

    const created = await this.ticketRepository.create(ticket);

    await bot.telegram.sendMessage(
      CHAT_ID,
      `Novo chamado criado\nCliente: ${ticket.clientName}\nDescrição: ${
        ticket.description
      }\nPrioridade: ${formatPriority(ticket.priority)}`
    );

    return created;
  }
}

function formatPriority(priority: TicketPriority) {
  switch (priority) {
    case "urgent":
      return "Urgente";
    case "high":
      return "Alta";
    case "medium":
      return "Média";
    case "low":
      return "Baixa";
  }
}
