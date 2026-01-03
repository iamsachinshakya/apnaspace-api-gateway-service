import { Router } from "express";
import { proxy } from "../utils/proxy";
import { env } from "../../../../app/config/env";

const categoryRouter = Router();

categoryRouter.use(
    "/",
    proxy(env.CATEGORY_SERVICE_BASE_URL, "/api/v1/categories")
);

export default categoryRouter;

