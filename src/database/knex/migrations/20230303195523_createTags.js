//TODO arq criado com 'npx knex migrate: make createTags' (precisa do migrations criado corretamente no knexfile)
exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("id")
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE") //! se deletar a nota, as tags vinculadas ao id da nota tmb é deletado
    table.integer("user_id").references("id").inTable("users")
    table.text("name").notNullable
})

exports.down = knex => knex.schema.dropTable("tags")
