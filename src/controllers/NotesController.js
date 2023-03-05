const { response } = require("express")
const knex = require("../database/knex")

class NotesController {
    async create(req, res) {
        const { title, description, tags, links } = req.body
        const { user_id } = req.params

        const note_id = await knex("notes").insert({
            title,
            description,
            user_id
        })

        const linksInsert = links.map(link => {   //**? Tabela link recebendo o note_id e o url = link
            return {                              //**! created_at e id ele cria por contra própria
                note_id,
                url: link
            }
        })

        await knex("links").insert(linksInsert)

        const tagsInsert = tags.map(name => { //**? Tabela tags recebendo o note_id o name e user_id
            return {                          //**! id ele cria por contra própria
                note_id,
                name,
                user_id
            }
        })

        await knex("tags").insert(tagsInsert)

        res.json()

    }

    async show(req, res) {
        const { id } = req.params

        const note = await knex("notes").where({ id }).first() //! pega as informações da nota
        const tags = await knex("tags").where({ note_id: id }).orderBy("name")  //! pega as tags em ordem alfabetica
        const links = await knex("links").where({ note_id: id }).orderBy("created_at")  //! pega as tags em ordem de criação

        return res.json({
            ...note,
            tags,
            links
        })

    }

    async delete(req, res) {
        const { id } = req.params

        await knex("notes").where({ id }).delete()

        return res.json()
    }

    async index(req, res) {
        const { user_id, title, tags } = req.query

        let notes

        if (tags) {
            const filterTags = tags.split(',').map(tag => tag.trim())  // para unir as tags em um vetor separado por ','

            notes = await knex("tags")      //! quando eu pesquiso uma tag existente ele linka mostrando as informações da note
                .select([                                           //*? seleciona esses campos da table notes
                    "notes.id",
                    "notes.title",
                    "notes.user_id"
                ])
                .where("notes.user_id", user_id)                    //*? busca as notas do id de user passado no query
                .whereLike("notes.title", `%${title}%`)             //*? e dentro desse id, busca a note com o titulo digitado
                .whereIn("name", filterTags)                        //*? compara se o nome digitado pertence ao array
                .innerJoin("notes", "notes.id", "tags.note_id")     //*? estou juntando a tags com a notes por meio do notes_id
                .orderBy("notes.title")

        } else {
            notes = await knex("notes")
            .where({ user_id })
            .whereLike("title", `%${title}%`)  //* achar ao pesquisar qualquer palavra do title (pesquisa na query do insomnia)
            .orderBy("title") //* ordem alfabética
        }

        return res.json(notes)
    }
}

module.exports = NotesController