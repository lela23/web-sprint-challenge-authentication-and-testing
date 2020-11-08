const db = require('../../database/dbConfig');

module.exports = {
	add,
	find,
	findBy,
	findById,
}

async function add(user) {
	const [id] = await db('auth').insert(user);
	return findById(id);
}

function find() {
	return db('auth').select('id', 'username', 'level');
}

function findBy(filter) {
	return db('auth').where(filter);
}

function findById(id) {
	return db('auth').select('id', 'username', 'level').where({ id }).first();
}

