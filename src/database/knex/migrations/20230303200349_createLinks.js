//TODO arq criado com 'npx knex migrate:make createLinks' (precisa do migrations criado corretamente no knexfile)
exports.up = knex => knex.schema.createTable("links", table => {
    table.increments("id")
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE") //! se deletar a nota, as tags vinculadas ao id da nota tmb é deletado

    table.text("url").notNullable()
    table.timestamp("created_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("links")
