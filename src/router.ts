import { Router } from "express";
import { clientRouter } from "./routes/Client.routes";
import { techRoutes } from "./routes/Tech.routes";

const router = Router();

router.use("/client", clientRouter);
router.use("/tech", techRoutes);

export { router };
