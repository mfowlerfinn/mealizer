const should = require('should')
const request = require('supertest')
const chai = require('chai')
require('dotenv').config()
const expect = chai.expect
const server = require('../../../app')
const chaiAsPromised = require('chai-as-promised')
const recipes = require('../../../recipes.json')

const recipeFunctions = require('../../../api/controllers/recipes')


chai.use(chaiAsPromised)

describe('Get recipes individually', () => {
    it('should return a recipe in json format', () => {
        return recipeFunctions.get(0).then(function(data) {
            expect(data).to.equal(recipes['recipes'][0])
        })
    })
    it('should return the title', () => {
        let title = recipes["recipes"][0]["title"]
        recipeFunctions.get(0).then(function(data) {
            expect(data["title"]).to.equal(title)
        }).catch((err) => {
            console.error('Err reading title', err)
        })        
    })
})



describe('controllers', function() {

  describe('get recipes', function() {

    describe('GET /recipes', function() {

      it('should return a JSON object of recipes', function(done) {

        request(server)
          .get('/api/recipes')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.eql(recipes["recipes"]);
            done();
          });
      });

      it('should accept a user_uid and recipe_uid', function(done) {
        let userUID = 'john123'
        let recipeUID = '1'
        let testRecipe = {
            uid: 1,
            title: 'main dish!',
            category_code: 'M',
            servings: '2-3',
            subtitle: 'a subtitle!',
            story: 'nice story!',
            ingredient_list: 2,
            grocery_list: 3,
            user_uid: 'john123'
        }
        request(server)
        
          .get(`/api/recipesDB/users/${userUID}/recipes/${recipeUID}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {    
            should.not.exist(err);    
            res.body.should.eql(testRecipe);
            done();
          });
      });

    });

  });

});
