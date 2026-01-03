import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import categoryRouter from "./category.route";
import blogRouter from "./blog.route";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/blogs", blogRouter);

export default apiRouter;
