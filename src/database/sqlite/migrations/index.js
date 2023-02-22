const sqliteConection = require('../../sqlite')
const createUsers = require('./CreateUsers')

async function migrationRun() {
    const schemas = [
        createUsers
    ].join('')

    sqliteConection()
        .then(db => db.exec(schemas))
        .catch(error => console.error(error))
}

module.exports = migrationRun