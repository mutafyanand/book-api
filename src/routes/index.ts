import express from 'express';
import bookRoutes from './book'

const router = express.Router();

router.use('/book', bookRoutes)

export default router;
