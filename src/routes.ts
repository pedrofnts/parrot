import { AppError } from "./helpers/AppErrors";
import { authMiddleware } from "./middlewares/authMiddleware";
import { authController } from "./controllers/authController";
import { Router } from "express";
import { UserController } from "./controllers/UserController";

const routes = Router();

routes.get("/", (req, res) => {
  throw new AppError("Error message", 400);
});

routes.get("/user", new UserController().index);
routes.post("/login", new authController().login);
routes.get("/profile", new authController().getProfile);

routes.use(authMiddleware);

routes.get("/profile", new authController().getProfile);
routes.get("/user/:id", new UserController().show);
routes.post("/user", new UserController().create);
routes.put("/user/:id", new UserController().update);
routes.delete("/user/:id", new UserController().delete);

export default routes;
