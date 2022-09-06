import { Router } from "express";
import { UserController } from "./controllers/UserController";

const routes = Router();

routes.get("/user", new UserController().index);
routes.get("/user/:id", new UserController().show);
routes.post("/user", new UserController().create);
routes.put("/user/:id", new UserController().update);
routes.delete("/user/:id", new UserController().delete);

export default routes;
