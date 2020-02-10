const db = require('../../models')
const recipes = require('../../recipes.json')
const Recipe = db.recipes_model
module.exports = {
  get,
  getAll,
  getRecipeDB
}

async function get(id) {
    try {
        let recipe = await getRecipe(id)
        return recipe
    } catch(err) {
        console.error('Err getting one recipe!', err)
    }
}

function getRecipeDB(userUID, recipeUID) {
    return Recipe.findByPk(userUID, {
            where: {
                uid: recipeUID
            }
        })
        .then(recipe => {
            return recipe
        })
        .catch(err => {
            return 'Error ' + err
        })    
}

async function getAll() {
    try {
        let recipes = await getRecipes()
        return recipes
    } catch(err) {
        console.error('Err getting all recipes!', err)
    }
}


function getRecipe(id) {
    let found = false
    for (let i = 0; i < recipes["recipes"].length; i++) {
        if (id === i) {
            found = true
            return recipes["recipes"][i]
        }
    }
    if (found === false) return false
}

function getRecipes() {
    if (!recipes["recipes"]) return false
    return recipes["recipes"]
}