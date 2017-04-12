exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function(table) {
            //user ID
            table.increments('id').primary();
            //user Name
            table.string('username').notNullable().unique();
            //user Email
            table.string('email').unique();
            //deleted
            table.string('password').notNullable();
            table.boolean('deleted');
            table.timestamps(true,true);
        }),

        knex.schema.createTable('compositions', function(table){
            //composition ID
            table.increments('id').primary();
            //object of attributes
            table.string('attributes');
            //creator of composition
            table.integer('user_id')
                 .references('id')
                 .inTable('users');
            //deleted
            table.boolean('deleted');
            table.timestamps(true,true);
        }),

        knex.schema.createTable('sounds', function(table){
            //composition ID
            table.increments('id').primary();
            //object of attributes
            table.string('attributes', 52000);
            //creator of composition
            table.integer('user_id')
                 .references('id')
                 .inTable('users');
            //deleted
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
