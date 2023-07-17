module.exports = {
    jwt: {       // npm install jsonwebtoken
        secret: process.env.AUTH_SECRET || "default",  // gerado no site MD5 hash generator -> default se der erro na variavel
        expiresIn: "7d"  // 7 dias até a expiração do token
    }
}