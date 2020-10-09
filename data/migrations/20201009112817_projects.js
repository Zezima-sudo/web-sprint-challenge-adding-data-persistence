
exports.up = function(knex) {
  return knex.schema
  .createTable('projects', tbl => {
      tbl.increments()
      tbl.string('name', 128).notNullable()
      tbl.string('description')
      tbl.boolean('completed').defaultTo(false).notNullable()
  })
  .createTable('resources', tbl => {
      tbl.increments()
      tbl.string('name', 128).notNullable()
      .notNullable()
      tbl.string('resource_description')
  })
  .createTable('tasks', tbl => {
      tbl.increments()
      tbl.string('task_description').notNullable()
      tbl.string('notes')
      tbl.boolean('task_completed').defaultTo(false).notNullable()
      tbl.integer('project_id').unsigned().notNullable()
      .references('projects.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    })
   .createTable('projects_resources', tbl => {
       tbl.integer('project_id')
       .references('projects.id')
       .notNullable()
       .unsigned()
       .onUpdate('CASCADE')
       .onDelete('CASCADE')
       tbl.integer('resource_id')
       .references('resources.id')
       .notNullable()
       .unsigned()
       .onUpdate('CASCADE')
       .onDelete('CASCADE')
 
   }) 
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('projects')
  .dropTableIfExists('tasks')
  .dropTableIfExists('resources')
  .dropTableIfExists('projects_resources')
};
