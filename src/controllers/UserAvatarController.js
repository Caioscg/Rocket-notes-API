class UserAvatarController {
    async update(req, res) {
        const user_id = req.user.id
        const avatarFilename = req.file.filename
        
    }
}

module.exports = UserAvatarController