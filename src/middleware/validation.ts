import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { sendErrorResponse } from '../utils/helpers';

const validation = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);

    if (error) {
      sendErrorResponse(res, 400, error.message)
    } else {
      next();
    }
  };
};

export { validation }