
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table){
      table.string('id').primary();         //chave primaria
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();  //limita o tamanho do campo em 2 cacracteres
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');  //usado para deletar uma tabela
};
