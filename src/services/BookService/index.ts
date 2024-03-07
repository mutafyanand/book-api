import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export class BookService {
    static create = async (data: { title: string; author: string; isbn: string }) => {
        return prisma.book.create({ data });
    }

    static getAll = async (queryParams: {
        page?: number;
        pageSize?: number;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
        filters: {
            title?: string;
            author?: string;
            isbn?: string;
        };
    }) => {
        const { page = 0, pageSize = 10, sortBy = 'createdAt', sortOrder = 'asc', filters = {} } = queryParams || {};

        const whereClause: Prisma.BookWhereInput = {};
        if (filters.title) whereClause.title = { contains: filters.title, };
        if (filters.author) whereClause.author = { contains: filters.author };
        if (filters.isbn) whereClause.isbn = { contains: filters.isbn };

        const totalItemCount = await this.count(whereClause);
        const totalPages = Math.ceil(totalItemCount / pageSize);
        const offset = page * pageSize;

        const books = await prisma.book.findMany({
            skip: offset,
            take: pageSize,
            orderBy: { [sortBy]: sortOrder },
            where: whereClause,
        });

        return { books, pagination: { page, pageSize, totalItemCount, totalPages } };
    };

    static getById = async (id: number) => {
        return prisma.book.findUnique({ where: { id } });
    }

    static update = async (id: number, updateData: { title?: string; author?: string; isbn?: string }) => {
        return prisma.book.update({
            where: { id },
            data: updateData,
        });
    }

    static delete = async (id: number) => {
        return prisma.book.delete({ where: { id } });
    }

    static count = async (options?: Prisma.BookWhereInput) => {
        return prisma.book.count();
    }
}
