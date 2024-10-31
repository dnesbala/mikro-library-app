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
      return res.status(200).json({ authors });
    } catch (err) {
      handleApiError(res, err);
    }
  });
  return router;
};
