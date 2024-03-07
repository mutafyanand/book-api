import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { sendErrorResponse, sendSuccessResponse } from '../utils/helpers';
import { BookService } from '../services/BookService';

export const Create = async (req: Request, res: Response) => {
    try {
        const newBook = await BookService.create(req.body);
        sendSuccessResponse(res, newBook, 'Book created successfully');

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            sendErrorResponse(res, 400, 'ISBN Must be unique');
        } else {
            console.error('Error creating a book:', error);
            sendErrorResponse(res, 500, `Failed to create book: ${error}`);
        }
    }
};

export const Get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const result = await BookService.getAll(req.parsedQuery);

        if (result.books.length === 0) {
            sendSuccessResponse(res, [], 'No books available');
            return;
        }

        sendSuccessResponse(res, result, 'Books retrieved successfully');
        return;
    } catch (error) {
        console.error('Error fetching books:', error);
        sendErrorResponse(res, 500, `Failed to retrieve books: ${error}`);
    }
};

export const GetById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        if (Number.isNaN(parseInt(id))) {
            sendErrorResponse(res, 404, 'Invalid Id');
            return
        }

        const book = await BookService.getById(Number(id))

        if (!book) {
            sendErrorResponse(res, 404, 'Book not found');
            return
        }

        sendSuccessResponse(res, book, 'Book by id Get successfully');
    } catch (error) {
        console.error('Error fetching book by ID:', error);
        sendErrorResponse(res, 500, `Failed to retrieve the book : ${error}`);
    }
};

export const Update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        const existingBook = await BookService.getById(Number(id))

        if (!existingBook) {
            sendErrorResponse(res, 404, 'Book not found');
            return;
        }
        const updatedBook = await BookService.update(Number(id), req.body)

        sendSuccessResponse(res, updatedBook, 'Book updated successfully');
    } catch (error) {
        console.error('Error updating book:', error);
        sendErrorResponse(res, 500, `Failed to update the book : ${error}`);
    }
};

export const Delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        const existingBook = await BookService.getById(Number(id))

        if (!existingBook) {
            sendErrorResponse(res, 404, 'Book not found');
            return
        }

        await BookService.delete(Number(id))

        sendSuccessResponse(res, {}, 'Book deleted successfully');
    } catch (error) {
        console.error('Error deleting book:', error);
        sendErrorResponse(res, 500, `Failed to delete the book: ${error}`);
    }
};