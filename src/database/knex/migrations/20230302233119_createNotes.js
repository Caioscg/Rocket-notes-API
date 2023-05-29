//TODO arq criado com 'npx knex migrate:make createNotes' (precisa do migrations criado corretamente no knexfile)
//! cria tabelas de forma automatizada
exports.up = knex => knex.schema.createTable("notes", table => {
    table.increments("id")  // autoincrements
    table.text("title")     // tipo text
    table.text("description") // tipo text
    table.integer("user_id").references("id").inTable("users")  // user_id que faz referencia ao id do users (chave estrangeira) // tipo int

    table.timestamp("create_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("notes")


//TODO 'npx knex migrate:latest' para criar a table
//TODO após criar o atalho no package.json é só rodar npm run migrate


//*? Atalho criado no package.json: sempre que excluir o banco de dados, 
//*? rodar (npm run dev) para criar o banco e depois (npm run migrate) para inicializar as tabelas criada pelo knex novamente!!!