module.exports = {
    apps : [{
      name: "app",
      script: "./server.js",
      instances: "max",
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }