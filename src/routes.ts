import { AppError } from "./helpers/AppErrors";
import { authMiddleware } from "./middlewares/authMiddleware";
import { authController } from "./controllers/authController";
import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { PostController } from "./controllers/PostController";

const routes = Router();

routes.get("/", (req, res) => {
  throw new AppError("Error message", 400);
});

routes.get("/profiles", new UserController().index);
routes.post("/login", new authController().login);

routes.use(authMiddleware);

routes.get("/profile", new authController().getProfile);
routes.get("/profile/:id", new UserController().show);
routes.post("/profile/create", new UserController().create);
routes.put("/profile/:id/edit", new UserController().update);
routes.delete("/profile/:id/remove", new UserController().delete);

routes.post("/profile/:userId/create", new PostController().create);
routes.delete(
  "/profile/:userId/post/:postId/remove",
  new PostController().delete
);

export default routes;
