const express = require('express')
const bodyParser = require('body-parser')
//req.body
require('dotenv').config()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./api/swagger/swagger.json')
const api = require('./api.js')

//const db = require('./models')
//db.sequelize.sync()
const app = express()
module.exports = app // for testing
app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/api/recipes', api.getRecipes)
app.get('/api/recipes/:id', api.getRecipe)
app.get('/api/recipesDB/users/:userUID/recipes/:recipeUID', api.getRecipeDB)

app.listen(3000)