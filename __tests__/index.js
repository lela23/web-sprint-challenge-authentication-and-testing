const request = require('supertest')
const server = require('../index')
const db = require('../database/dbConfig')

// a global jest hook to run before each individual test
beforeEach(async () => {
	// re-run the seeds and start with a fresh database for each test
	await db.seed.run()
})

// a global jest hook to run after all the tests are done
afterAll(async () => {
	// closes the database connection so the jest command doesn't stall
	await db.destroy()
})

describe('testing for endpoints', () => {
	it('GET /', async () => {
		const res = await request(server).get('/')
		expect(res.statusCode).toBe(200)
		// `content-type` headers tell the client how to render the data
		expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
		expect(res.body.message).toBe('Welcome to the Auth-Testing Sprint API!')
	})

	it('POST /api/auth/register', async () => {
		const res = await request(server).post('/api/auth/register')
			.send({
				username: 'user-06',
				password: 'password-06',
				level: 'user'
			})
		expect(res.statusCode).toBe(201)
		expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
		expect(res.body.id).toBeDefined()
		expect(res.body.username).toBe('user-06')
	})

	it('POST /api/auth/login', async () => {
		const res = await request(server).post('/api/auth/login')
			.send({
				username: 'user-08',
				password: 'password-08'
			})
		expect(res.statusCode).toBe(401)
		expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
	})

	it('GET /api/auth/users', async () => {
		await request(server).post('/api/auth/login')
			.send({
				username: 'user-11',
				password: 'password-11'
			})
		const res = await request(server).get('/api/auth/users')
		expect(res.statusCode).toBe(401)
		// `content-type` headers tell the client how to render the data
		expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
	})


	it('GET /api/jokes', async () => {
		await request(server).post('/api/auth/login')
			.send({
				username: 'user-10',
				password: 'password-10'
			})
		const res = await request(server).get('/api/jokes')
		expect(res.statusCode).toBe(401)
		expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
	})
})