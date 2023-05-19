const path = require("path")
const multer = require("multer")  // npm install multer (p/ uploads)
const crypto = require("crypto")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")  // pasta temporaria
const UPLOADS_FOLDER = path.resolve(__dirname, "uploads")     // pasta onde ficarao os uploads

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(req, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("hex")  // para garantir q nao vai te imgs duplicadas
            const fileName = `${fileHash}-${file.originalname}`

            return callback(null, fileName)
        },
    }),
}

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER
}