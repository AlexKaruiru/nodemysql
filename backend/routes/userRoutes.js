import express from 'express';

import {
	authUser,
	deleteUser,
	getUserByID,
	getUserProfile,
	getUsers,
	registerUser,
	updateUser,
	updateUserProfile,
} from '../controllers/userController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/').get(protect, admin, getUsers);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser);
router.route('/:id').get(protect, admin, getUserByID);
router.route('/:id').put(protect, admin, updateUser);

export default router;
