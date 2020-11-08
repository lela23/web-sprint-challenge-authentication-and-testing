exports.up = async function(knex) {
  await knex.schema.createTable('auth', tbl => {
    tbl.increments();
    tbl.text('username').notNullable().unique();
    tbl.text('password').notNullable();
    tbl.text('level').notNullable();
  })
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('auth');
}