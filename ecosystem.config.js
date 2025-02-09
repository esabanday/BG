module.exports = {
    apps: [{
        name: "web-app",
        script: "./index.js",
        env: {
            NODE_ENV: "production",
            PORT: 3000
        }
    }]
}