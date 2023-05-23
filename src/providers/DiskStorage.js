const fs = require("fs") // do proprio node
const path = require("path")
const uploadConfig = require("../configs/upload")

class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename(  // para mudar o arquivo de lugar do temporario pro permantente
            path.resolve(uploadConfig.TMP_FOLDER, file),  // desse 
            path.resolve(uploadConfig.UPLOADS_FOLDER, file) // pra esse
        )

        return file
    }

    async deleteFile(file) {
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

        try {
            await fs.promises.stat(filePath)  // retorna o status do arq
        } catch {
            return
        }

        await fs.promises.unlink(filePath)  // delete
    }
}

//! todas essas funcoes sao do fs (padrao ja do node)

module.exports = DiskStorage