import { Router } from "express";
import { clientRouter } from "./routes/Client.routes";
import { techRoutes } from "./routes/Tech.routes";
import { ticketRoutes } from "./routes/Ticket.routes";

const router = Router();

router.use("/client", clientRouter);
router.use("/tech", techRoutes);
router.use("/ticket", ticketRoutes);

export { router };
