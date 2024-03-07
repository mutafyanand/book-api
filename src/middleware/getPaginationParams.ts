import { Request, Response, NextFunction } from 'express';

export const getPaginationParams = (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 0;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const sortBy = req.query.sortBy as string || 'createdAt';
    const sortOrder = req.query.sortOrder as 'asc' | 'desc' || 'asc';

    const titleFilter = req.query.title as string | undefined;
    const authorFilter = req.query.author as string | undefined;
    const isbnFilter = req.query.isbn as string | undefined;

    req.parsedQuery = {
        page,
        pageSize,
        sortBy,
        sortOrder,
        filters: {
            title: titleFilter,
            author: authorFilter,
            isbn: isbnFilter
        }
    };

    next();
};

declare global {
    namespace Express {
        interface Request {
            parsedQuery: {
                page?: number;
                pageSize?: number;
                sortBy?: string;
                sortOrder?: 'asc' | 'desc';
                filters: {
                    title?: string;
                    author?: string;
                    isbn?: string;
                };
            };
        }
    }
}