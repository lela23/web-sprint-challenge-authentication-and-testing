const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./auth-model');
const restrict = require('../../middleware/authenticate-middleware');

const router = express.Router();

// Returns all auth in the database for auth in the IT and admin departments
router.get('/users', restrict('user'), async (req, res, next) => {
	try {
		res.json(await Users.find());
	} catch(err) {
		next(err);
	}
})

// Creates a new user in the database
router.post('/register', async (req, res, next) => {
	try {
		const { username, password, level } = req.body;
		const user = await Users.findBy({ username }).first();

		if (user) {
			return res.status(409).json({
				message: 'Username is already taken',
			});
		}

		const newUser = await Users.add({
			username,
			level,
			password: await bcrypt.hash(password, 10),
		})

		res.status(201).json(newUser);
	} catch(err) {
		next(err);
	}
})

// Creates a login session for a user
router.post('/login', async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await Users.findBy({ username }).first();

		if (!user) {
			return res.status(401).json({
				message: 'You shall not pass!',
			});
		}

		const passwordValid = await bcrypt.compare(password, user.password);

		if (!passwordValid) {
			return res.status(401).json({
				message: 'You shall not pass!',
			});
		}

		const payload = {
			id: user.id,
			username: user.username,
			level: user.level,
		}

		res.cookie('token', jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'}));
		

		res.json({
			message: `Welcome ${user.username}!`,
		});
	} catch(err) {
		next(err);
	}
})

// Logs user out
router.get('/logout', async (req, res, next) => {
	try {
		res.clearCookie('token');
		res.send('You have successfully logged out!');
	} catch (err) {
		next(err);
	}
})


module.exports = router;