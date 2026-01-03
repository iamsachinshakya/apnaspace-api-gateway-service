import { Router } from "express";
import { proxy } from "../utils/proxy";
import { env } from "../../../../app/config/env";

const blogRouter = Router();

blogRouter.use(
    "/",
    proxy(env.POST_SERVICE_BASE_URL, "/api/v1/posts")
);

export default blogRouter;

