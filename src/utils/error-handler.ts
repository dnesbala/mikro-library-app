import { Response } from "express";

export const handleApiError = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    console.error("Error details:", error);
    return res.status(400).json({ error: error.message, name: error.name });
  }
  console.error("Unknown error:", error);
  return res.status(400).json({ error: "An unknown error occurred" });
};
