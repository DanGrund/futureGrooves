exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function(table) {
            table.increments('id').primary();
            table.string('username').notNullable().unique();
            table.string('email').unique();
            table.string('password').notNullable();
            table.boolean('deleted');
            table.timestamps(true,true);
        }),

        knex.schema.createTable('compositions', function(table){
            table.increments('id').primary();
            table.string('attributes', 52000);
            table.integer('user_id')
                 .references('id')
                 .inTable('users');
            table.boolean('deleted');
            table.timestamps(true,true);
        }),

        knex.schema.createTable('sounds', function(table){
            table.increments('id').primary();
            table.string('attributes', 52000);
            table.integer('user_id')
                 .references('id')
                 .inTable('users');
            table.boolean('deleted');
            table.timestamps(true,true);
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('sounds'),
        knex.schema.dropTable('compositions'),
        knex.schema.dropTable('users')
    ])
};
