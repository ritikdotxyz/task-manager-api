import type { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod/v3';


const validateData = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.format() });
    }
    next();
  };
};

export { validateData };
