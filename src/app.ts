import express from "express";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./config/mikro-orm.config";
import { authorRoutes } from "./routes/author-routes";

const app = express();

export const createApp = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  const forkedOrm = orm.em.fork();

  app.use("/api/authors", authorRoutes(forkedOrm));

  return app;
};
