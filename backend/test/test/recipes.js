const fs = require('fs')
const fsp = require('fs').promises
const chai = require('chai')
require('dotenv').config()
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
const recipes = require('../../recipes.json')

const recipeFunctions = require('../../api/controllers/recipes')


chai.use(chaiAsPromised)

describe('Get recipes individually', () => {
    it('should return a recipe in json format', () => {
        return recipeFunctions.get(0).then(function(data) {
            expect(data).to.equal(recipes['recipes'][0])
        })
    })
    it('should return the title', () => {
        return recipeFunctions.get(0).then(function(data) {
            expect(data['title']).to.equal(title)
        })
    })
})