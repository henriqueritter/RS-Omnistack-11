
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table){
      table.increments();

      table.string('title').notNullable();
      table.string('description').notNullable();
      table.decimal('value').notNullable();

      table.string('ong_id').notNullable();  //campo da ong que criou o incident

      table.foreign('ong_id').references('id').inTable('ongs'); //FK da tabela ONG
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};

//apos isso digitar npx knex migrate:latest