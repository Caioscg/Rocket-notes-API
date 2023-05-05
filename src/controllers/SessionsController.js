class SessionsController {
    async create(req, res) {
        const { email, password } = req.body

        return res.json({ email, password })
    }
}

module.exports = SessionsController;