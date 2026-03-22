import type { Request, Response, NextFunction } from 'express';


const validateData = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.format() });
    }
    next();
  };
};

export { validateData };
