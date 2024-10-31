import { Router, Request, Response } from "express";
import { AuthorService } from "../services/author-service";
import { EntityManager } from "@mikro-orm/postgresql";
import { handleApiError } from "../utils/error-handler";

const router = Router();

export const authorRoutes = (em: EntityManager) => {
  const service = new AuthorService(em);

  router.get("/", async (req: Request, res: Response): Promise<any> => {
    try {
      const authors = await service.getAllAuthors();
      return res.status(200).json({ data: authors });
    } catch (err) {
      handleApiError(res, err);
    }
  });

  router.get("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
      const author = await service.getAuthorById(Number(req.params.id));
      return res.status(200).json({ data: author });
    } catch (err) {
      handleApiError(res, err);
    }
  });

  router.post("/", async (req: Request, res: Response): Promise<any> => {
    const { name, biography } = req.body;
    try {
      const createdAuthor = await service.createAuthor(name, biography);
      return res.status(201).json({
        message: "Author created successfully",
        data: createdAuthor,
      });
    } catch (err) {
      handleApiError(res, err);
    }
  });

  router.patch("/:id", async (req: Request, res: Response): Promise<any> => {
    const { name, biography } = req.body;
    try {
      const author = await service.updateAuthor(
        Number(req.params.id),
        name,
        biography
      );
      return res.status(200).json({
        message: "Author updated successfully",
        data: author,
      });
    } catch (err) {
      handleApiError(res, err);
    }
  });

  router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
      const author = await service.deleteAuthor(Number(req.params.id));
      return res.status(200).json({
        message: "Author deleted successfully",
        data: author,
      });
    } catch (err) {
      handleApiError(res, err);
    }
  });

  return router;
};
