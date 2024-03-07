import { prisma } from '../src/services/prisma'

async function main() {
    await prisma.book.create({
        data: {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            isbn: '1234567890',
        },
    });

    await prisma.book.create({
        data: {
            title: '1984',
            author: 'George Orwell',
            isbn: '0987654321',
        },
    });

    await prisma.book.create({
        data: {
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            isbn: '1122334455',
        },
    });

    await prisma.book.create({
        data: {
            title: 'The Catcher in the Rye',
            author: 'J.D. Salinger',
            isbn: '6677889900',
        },
    });
}

main()
    .catch(async (e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });