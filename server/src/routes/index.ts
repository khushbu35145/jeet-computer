import { Router } from 'express';
import publicRoutes from './publicRoutes';
import adminRoutes from './adminRoutes';

const router = Router();

// Mount public routes under /api/v1
router.use('/', publicRoutes);

// Mount admin routes under /api/v1/admin
router.use('/admin', adminRoutes);

export default router;
