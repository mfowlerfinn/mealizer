module.exports = {
  sequelize_config: {
    "development": {
      "username": process.env.DEV_SEQUELIZE_USERNAME,
      "password": process.env.DEV_SEQUELIZE_PASSWORD,
      "database": process.env.DEV_SEQUELIZE_DATABASE,
      "host": process.env.DEV_SEQUELIZE_HOST,
      "dialect": process.env.DEV_SEQUELIZE_DIALECT,
      "operatorsAliases": process.env.DEV_SEQUELIZE_OPALIASES,
      "define": {
        "timestamps": false
      }
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql",
      "operatorsAliases": false
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql",
      "operatorsAliases": false
    }
  }
}
