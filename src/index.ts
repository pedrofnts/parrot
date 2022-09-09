import "express-async-errors";
import { AppDataSource } from "./data-source";
import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error";
import app from "./app";

AppDataSource.initialize().then(() => {
  app.listen(process.env.PORT);
});
