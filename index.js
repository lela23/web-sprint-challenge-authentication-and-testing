const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./api/auth/auth-router');
const jokesRouter = require('./api/jokes/jokes-router');

const server = express();
const port = process.env.PORT || 8000;

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser());

server.use('/api/auth', authRouter);
server.use('/api/jokes', jokesRouter);

server.use((err, req, res, next) => {
  console.log(err)

  res.status(500).json({
    message: 'Something went wrong',
  });
})

server.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Auth-Testing Sprint API!'
  });
});

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})

module.exports = server;