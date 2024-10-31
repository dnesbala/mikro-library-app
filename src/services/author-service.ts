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

  async getAuthorById(id: number) {
    return await this.em.findOne(Author, { id });
  }

  async createAuthor(name: string, biography?: string): Promise<Author> {
    const author = this.em.create(Author, { name, biography });
    console.log(author);
    await this.em.persistAndFlush(author);
    return author;
  }

  async updateAuthor(
    id: number,
    name?: string,
    biography?: string
  ): Promise<Author> {
    const author = await this.getAuthorById(id);
    if (!author) throw new Error(`Author with ID ${id} not found`);

    if (name) author.name = name;
    if (biography) author.biography = biography;

    await this.em.persistAndFlush(author);
    return author;
  }

  async deleteAuthor(id: number): Promise<Author> {
    const author = await this.getAuthorById(id);
    if (!author) throw new Error(`Author with ID ${id} not found`);

    await this.em.removeAndFlush(author);
    return author;
  }
}
