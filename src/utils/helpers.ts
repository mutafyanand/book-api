import { Response } from 'express';

export const sendSuccessResponse = (res: Response, data: any, message: string = 'Operation successful'): Response => {
  return res.status(200).json({ success: true, message, data });
};

export const sendErrorResponse = (res: Response, statusCode: number = 400, errorMessage: string = 'An error occurred'): Response => {
  return res.status(statusCode).json({ success: false, error: errorMessage });
};