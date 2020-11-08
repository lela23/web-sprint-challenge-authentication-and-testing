
const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
   await knex('auth').insert([
      { username: "user-01", password: bcrypt.hashSync("password-01", 10), level: "user" },
      { username: "user-02", password: bcrypt.hashSync("password-02", 10), level: "user" },
      { username: "user-03", password: bcrypt.hashSync("password-03", 10), level: "user" },
      { username: "user-04", password: bcrypt.hashSync("password-04", 10), level: "user" },
      { username: "user-05", password: bcrypt.hashSync("password-05", 10), level: "user" },
   ])
}


