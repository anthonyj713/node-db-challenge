
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', projects => {
        projects.increments();
        projects.string('name', 255).notNullable();
        projects.string('description');
        projects.boolean('completed').notNullable().defaultTo();
    })
    .createTable('tasks', tasks => {
        tasks.increments();
        tasks
            .integer('projects_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tasks.string('description').notNullable();
        tasks.string('notes');
        tasks.boolean('completed').notNullable().defaultTo(0);
        })
    .createTable('resources', resources => {
        resources.increments();
        resources.string('name', 255).notNullable();
        resources.string('description');
    })
    .createTable('project_resources', projectResources => {
        projectResources.increments();
        projectResources
            .integer('projects_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        projectResources
            .integer('resources_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('resources')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        projectResources.string('amount', 255);
    })
  };

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects')
  };
