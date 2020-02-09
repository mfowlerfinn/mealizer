const Recipes = require('./api/controllers/recipes')
const db = require('./models')

module.exports = {
    getRecipe,
    getRecipes,
    testDB,
    getRecipeDB
}

async function getRecipe(req, res, next) {
    let { id } = req.params
    let recipe = await Recipes.get(id)
    if (!recipe) return next()
    
    res.json(recipe)
}

async function getRecipeDB(req, res, next) {
    let { id } = req.params
    let recipe = await Recipes.getRecipeDB(id)
    if (!recipe) return next()

    res.json(recipe)
}

async function getRecipes(req, res, next) {
    let recipes = await Recipes.getAll()
    if (!recipes) return next()
    console.log('recipes.length1', recipes.length)
    res.json(recipes)
}

async function getGroceriesDB(req, res, next) {
    
}

async function testDB(req, res, next) {
    try {
        let dbReturned = await db.sequelize.authenticate()
        console.log('connection has been established', db)
        res.json(dbReturned)
    } catch (err) {
        console.error('problems connecting to db!', err)
    }
}