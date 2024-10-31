import express from "express";
import { MikroORM } from "@mikro-orm/core";

import mikroOrmConfig from "./config/mikro-orm.config";
import { authorRoutes } from "./routes/author-routes";
import { bookRoutes } from "./routes/book-routes";

const app = express();

export const createApp = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  const forkedOrm = orm.em.fork();

  app.use(express.json());

  app.use("/api/authors", authorRoutes(forkedOrm));
  app.use("/api/books", bookRoutes(forkedOrm));

  return app;
};
