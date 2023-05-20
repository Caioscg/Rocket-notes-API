const fs = require("fs") // do proprio node
const path = require("path")
const uploadConfig = require("../configs/upload")

class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename(  // para mudar o arquivo de lugar do temporario pro permantente
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        )

        return file
    }

    async deleteFile(file) {
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

        try {
            await fs.promises.stat(filePath)
        } catch {
            return
        }

        await fs.promises.unlink(filePath)  // delete
    }
}

module.exports = DiskStorage