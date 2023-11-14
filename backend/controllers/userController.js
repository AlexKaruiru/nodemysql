import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * @desc 		Auth user
 * @route		POST /api/users/login
 * @access	public
 */
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

/**
 * @desc 		Get user profile
 * @route		GET /api/users/profile
 * @access	private
 */
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			phone: user.phone,
            role: user.role,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

/**
 * @desc 		Register new user
 * @route		POST /api/users
 * @access	public
 */
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, phone , role,  password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400); 
		throw new Error('User already exists');
	}

	const user = await User.create({ name, email, phone, role, password });

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			phone: user.phone,
            user: user.role,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

/**
 * @desc 		Update user profile
 * @route		PUT /api/users/profile
 * @access	private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.phone = req.body.phone || user.phone;
        user.role =  req.body.role || user.role;

		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			phone: updatedUser.phone,
            role: updatedUser.role,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

/**
 * @desc 		Get all users
 * @route		GET /api/users/
 * @access	private/admin
 */
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({}).select('-password');
	res.json(users);
});

/**
 * @desc 		Delete user
 * @route		DELETE /api/users/:id
 * @access	private/admin
 */
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		await user.remove();
		res.status(204).end();
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

/**
 * @desc 		Get user by ID
 * @route		GET /api/users/:id
 * @access	private/admin
 */
const getUserByID = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

/**
 * @desc 		Update a user
 * @route		PUT /api/users/:id
 * @access	private/admin
 */
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.phone = req.body.phone || user.phone;        
        user.role =  req.body.role || user.role;

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			phone: updatedUser.phone,
			role: updatedUser.role,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

export {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserByID,
	updateUser,
};