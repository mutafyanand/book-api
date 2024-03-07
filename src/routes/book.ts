import express from 'express';
import * as BookController from '../controllers/BookController';
import { validation } from '../middleware/validation';
import { createBookSchema, updateBookSchema } from '../validation/bookSchema';
import { getPaginationParams } from '../middleware/getPaginationParams';

const router = express.Router();

router.post('/', [validation(createBookSchema)], BookController.Create)

router.get('/', [getPaginationParams], BookController.Get)
router.get('/:id', BookController.GetById)

router.put('/:id', [validation(updateBookSchema)], BookController.Update)

router.delete('/:id', BookController.Delete)

export default router