import { Request, Response } from "express";

export const upload = async (req: Request, res: Response): Promise<void> => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      throw new Error('ImageBase64 is required');
    }
  } catch (error) {
    res.status(500).send("Error");
  }
};
