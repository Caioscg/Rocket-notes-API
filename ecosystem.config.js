module.exports = {   //! exemplo da propria documentação do site pm2 
  apps : [{
    name: "app",
    script: "./src/server.js",   // caminha do server
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}