
const knexCofig = require('../config');
const knex = require('knex')(knexCofig);



knex.schema.createTable('products', (table) => {
  table.increments('id'),
  table.string('code').notNullable(),
  table.string('productName').notNullable(),  
  table.string('thumbnail').notNullable(),
  table.float('productPrice')

}).then(() => {
  console.info('Table created');

}).catch((err) => {
  console.error(err)

}).finally(() => {
  knex.destroy();

});



knex.schema.createTable('messages', (table) => {
  table.increments('id'),
  table.string('code').notNullable(),
  table.string('username').notNullable(),
  table.string('timestamp').notNullable(),
  table.string('message').notNullable()
}).then(() => {
  console.info('Table created');

}).catch((err) => {
  console.error(err)

}).finally(() => {
  knex.destroy();

});

