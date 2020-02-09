require('dotenv').config()

module.exports = {
      dbOptions: {
        "username": process.env.DEV_SEQUELIZE_USERNAME,
        "password": process.env.DEV_SEQUELIZE_PASSWORD,
        "database": process.env.DEV_SEQUELIZE_DATABASE,
        "host": process.env.DEV_SEQUELIZE_HOST,
        "dialect": process.env.DEV_SEQUELIZE_DIALECT,
        "operatorsAliases": process.env.DEV_SEQUELIZE_OPALIASES,
        "port": process.env.DEV_SEQUELIZE_PORT
      },
      options: {
        type: "js",
        dir: "models"
     }
  }