
exports.seed = async function(knex) {
   await knex('auth').truncate();
}