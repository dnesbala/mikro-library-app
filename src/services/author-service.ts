import { MikroORM } from "@mikro-orm/core";
import { Author } from "../entities/Author";
import { EntityManager } from "@mikro-orm/postgresql";

export class AuthorService {
  private em: EntityManager;

  constructor(em: EntityManager) {
    this.em = em;
  }

  async getAllAuthors() {
    return await this.em.find(Author, {});
  }
}
