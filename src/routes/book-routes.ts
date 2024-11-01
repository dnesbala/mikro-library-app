import { Router, Request, Response } from "express";
import { EntityManager } from "@mikro-orm/postgresql";

import { BookService } from "../services/book-service";
import { handleApiError } from "../utils/error-handler";

const router = Router();

export const bookRoutes = (em: EntityManager) => {
  const service = new BookService(em);

  router.get("/", async (req: Request, res: Response): Promise<any> => {
    try {
      const books = await service.getAllBooks();
      return res.status(200).json({ data: books });
    } catch (err) {
      handleApiError(res, err);
    }
  });

  router.get("/search", async (req: Request, res: Response): Promise<any> => {
    const { query } = req.query;
    try {
      const books = await service.searchBooks(String(query));
      res.status(200).json({
        data: books,
      });
    } catch (err) {
      handleApiError(res, err);
    }
  });

  router.get("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
      const book = await service.getBookById(Number(req.params.id));
      return res.status(200).json({ data: book });
    } catch (err) {
      handleApiError(res, err);
    }
  });

  router.post("/", async (req: Request, res: Response): Promise<any> => {
    const { title, publishedYear, authorId } = req.body;
    try {
      const createdBook = await service.createBook(
        title,
        publishedYear,
        authorId
      );
      return res.status(201).json({
        message: "Book created successfully",
        data: createdBook,
      });
    } catch (err) {
      handleApiError(res, err);
    }
  });

  router.patch("/:id", async (req: Request, res: Response): Promise<any> => {
    const { title, publishedYear, authorId } = req.body;
    try {
      const book = await service.updateBook(
        Number(req.params.id),
        title,
        publishedYear,
        authorId
      );
      return res.status(200).json({
        message: "Book updated successfully",
        data: book,
      });
    } catch (err) {
      handleApiError(res, err);
    }
  });

  router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
      const book = await service.deleteBook(Number(req.params.id));
      return res.status(200).json({
        message: "Book deleted successfully",
        data: book,
      });
    } catch (err) {
      handleApiError(res, err);
    }
  });

  return router;
};
