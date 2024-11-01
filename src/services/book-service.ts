import { EntityManager } from "@mikro-orm/postgresql";

import { Author } from "../entities/Author";
import { Book } from "../entities/Book";

export class BookService {
  private em: EntityManager;

  constructor(em: EntityManager) {
    this.em = em;
  }

  async getAllBooks() {
    return await this.em.find(Book, {}, { populate: ["author"] });
  }

  async getBookById(id: number) {
    return await this.em.findOne(Book, { id });
  }

  async createBook(
    title: string,
    publishedYear: number,
    authorId: number
  ): Promise<Book> {
    const author = await this.em.findOne(Author, authorId);
    if (!author) throw new Error(`Author with ID ${authorId} not found`);

    const book = this.em.create(Book, { title, publishedYear, author });
    await this.em.persistAndFlush(book);
    return book;
  }

  async updateBook(
    id: number,
    title?: string,
    publishedYear?: number,
    authorId?: number
  ): Promise<Book> {
    const book = await this.getBookById(id);
    if (!book) throw new Error(`Book with ID ${id} not found`);

    if (title) book.title = title;
    if (publishedYear) book.publishedYear = publishedYear;
    if (authorId) {
      const author = await this.em.findOne(Author, authorId!);
      if (!author) throw new Error(`Author with ID ${authorId} not found`);
      book.author = author;
    }

    await this.em.persistAndFlush(book);
    return book;
  }

  async deleteBook(id: number): Promise<Book> {
    const book = await this.getBookById(id);
    if (!book) throw new Error(`Book with ID ${id} not found`);

    await this.em.removeAndFlush(book);
    return book;
  }

  async searchBooks(query: string) {
    return await this.em.find(
      Book,
      {
        $or: [
          { title: { $ilike: `%${query}%` } },
          { author: { name: { $ilike: `%${query}%` } } },
        ],
      },
      { populate: ["author"] }
    );
  }
}
