import { NextFunction, Request, Response } from 'express';
import { ObjectSchema, ValidationErrorItem } from 'joi';
import logger from '../utils/logger';

export default (schema: ObjectSchema, property: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate((req as any)[property], {
      abortEarly: false,
    });

    if (error == null) return next();
    const { details } = error;
    const message = details.map((error: ValidationErrorItem) =>
      error.message.replace(/"/g, ''),
    );
    logger.error(message);
    res.status(400).json({ error: message });
  };
