import express, { json } from "express";
import request from 'supertest';
import { prisma } from '../services/prisma';
import * as BookController from '../controllers/BookController';
import { getPaginationParams } from "../middleware/getPaginationParams";

interface Book {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    author: string;
    isbn: string;
}

const app = express();
app.use(json());

app.post('/books', BookController.Create);
app.get('/books', BookController.Get);
app.get('/books/:id', BookController.GetById);
app.put('/books/:id', BookController.Update);
app.delete('/books/:id', BookController.Delete);

describe('Book Controller Tests', () => {
    beforeAll(async () => {
        await prisma.$connect();
    });

    afterAll(async () => {
        await prisma.$disconnect()
    })

    let book: Book | undefined;

    it('should create a new book', async () => {
        const newBook = {
            title: 'Test Book',
            author: 'Test Author',
            isbn: '123-456'
        };

        const response = await request(app)
            .post('/books')
            .send(newBook)
            .expect(200);

        book = response.body.data
        expect(response.body.data.title).toBe(newBook.title);
        expect(response.body.data.author).toBe(newBook.author);
        expect(response.body.data.isbn).toBe(newBook.isbn);
    });


    it('should create not create book with same isbn', async () => {
        const dublicateIsbnBook = {
            title: 'Test Book',
            author: 'Test Author',
            isbn: '123-456'
        };

        const response = await request(app)
            .post('/books')
            .send(dublicateIsbnBook)
            .expect(400);

        expect(response.body.error).toBe("ISBN Must be unique");

    });

    it('should return a list of books', async () => {

        const response = await request(app)
            .get('/books')
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data.books)).toBeTruthy();
    })

    it('should get book by ID', async () => {

        const response = await request(app)
            .get(`/books/${book.id}`)
            .expect(200);

        expect(response.body.data.id).toBe(book.id);
    });

    it('should update a book', async () => {

        const updatedData = {
            title: 'Updated Title',
        };

        const response = await request(app)
            .put(`/books/${book.id}`)
            .send(updatedData)
            .expect(200);

        expect(response.body.data.title).toBe(updatedData.title);
    });

    it('should delete a book', async () => {

        await request(app)
            .delete(`/books/${book.id}`)
            .expect(200);

        await request(app)
            .get(`/books/${book.id}`)
            .expect(404);
    });
});
