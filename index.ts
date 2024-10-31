import { MikroORM } from "@mikro-orm/postgresql";
import config from "./src/config/mikro-orm.config";

import { Author } from "./src/entities/Author";

async function initialize() {
  const orm = await MikroORM.init(config);
  const em = orm.em.fork();

  const author = em.create(Author, {
    name: "Robert T Kiyosaki",
  });
  await em.persistAndFlush(author);
  console.log("Author created: ", author);
}

initialize()
  .then(() => console.log("Initialized ORM"))
  .catch((err) => console.log(err));
