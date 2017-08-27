/**
 * Articles Endpoint Module - POST Article tests
 */
const app = require('../../../server');
const chai = require('chai');
const request = require('supertest');
const UUIDV4 = require('uuid/v4');
const { defineModels } = require('../../../models/index');
const { ENDPOINTS } = require('../../constants');

const ARTICLES_ENDPOINT = ENDPOINTS.ARTICLES;
const expect = chai.expect;
const should = chai.should();

describe(ARTICLES_ENDPOINT, function() {
  let models;

  before(function(done) {
    defineModels(true)
      .then((models) => {
        this.models = models;
        done();
      })
      .catch((err) => {
        console.log('Error defining models: ', err);
        done();
      });
  });

  describe('GET {id} @integration', function() {

    describe('article exists', function() {
      articleObject = {
        Article: {
          author: "Ashton Kutcher",
          type: 0,
          sex: "male",
          birthday: "2017-08-26T04:56:47.881Z",
          articleText: "Hi! I'm article text",
          title: "I'm an article title",
          categories: ["Time Well Spent", "Wisdom", "Wonder"],
        },
      };

      it('should return a 200 response status code with properly formatted response.', function(done) {
        this.models.article.create(articleObject.Article)
          .then(function(article) {
            const articleId = article.dataValues.uuid;
            const getEndpoint = `${ARTICLES_ENDPOINT}/${articleId}`;

            request(app)
              .get(getEndpoint)
              .expect('Content-Type', /json/)
              .expect(200)
              .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data[0].author).to.equal(articleObject.Article.author);
                expect(res.body.data[0].type).to.equal(articleObject.Article.type);
                expect(res.body.data[0].sex).to.equal(articleObject.Article.sex);
                expect(res.body.data[0].birthday).to.equal(articleObject.Article.birthday);
                expect(res.body.data[0].articleText).to.equal(articleObject.Article.articleText);
                expect(res.body.data[0].title).to.equal(articleObject.Article.title);
                expect(res.body.data[0].categories.length).to.equal(articleObject.Article.categories.length);
                done(); // conditionally call done if necessary
            });
          })
          .catch(function(error) {
            console.log('Error: ', error);
            done();
          });
      });
    });

    describe('article does not exist', function() {

      it('should return a 404 response status code.', function(done) {
        const articleId = UUIDV4();
        const getEndpoint = `${ARTICLES_ENDPOINT}/${articleId}`;

        request(app)
          .get(getEndpoint)
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err, res) => {
            res.body.should.have.keys('message');
            res.body.message.should.equal(`No article with uuid ${articleId} exists.`);
            done(); // conditionally call done if necessary
        });
      });
    });

    describe('invalid request uuid format provided', function() {

      it('should return a 400 response status code.', function(done) {
        const articleId = 15;
        const getEndpoint = `${ARTICLES_ENDPOINT}/${articleId}`;

        request(app)
          .get(getEndpoint)
          .expect('Content-Type', /json/)
          .expect(400)
          .end((err, res) => {
            res.body.should.have.keys('message');
            res.body.message.should.equal(`Error getting article with uuid ${articleId}.`);
            done(); // conditionally call done if necessary
        });
      });
    });
  });

  describe('GET @integration', function() {

    describe('articles exist', function() {
      articleObjectsArray = [
        {
          author: "Ashton Kutcher",
          type: 0,
          sex: "male",
          birthday: "2017-08-26T04:56:47.881Z",
          articleText: "Hi! I'm article text",
          title: "I'm an article title",
          categories: ["Time Well Spent", "Wisdom", "Wonder"],
        },
        {
          author: "Selena Gomez",
          type: 0,
          sex: "female",
          birthday: "1992-10-14T04:53:23.000Z",
          articleText: "Hi! I'm article text 2",
          title: "I'm an article title 2",
          categories: ["Giving", "Well-Being", "Time Well Spent"],
        }
      ];

      it('should return a 200 response status code with properly formatted response.', function(done) {
        this.models.article.bulkCreate(articleObjectsArray)
          .then(function(articles) {
            const getEndpoint = `${ARTICLES_ENDPOINT}`;

            request(app)
              .get(getEndpoint)
              .expect('Content-Type', /json/)
              .expect(200)
              .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data[0].author).to.equal(articleObjectsArray[0].author);
                expect(res.body.data[0].type).to.equal(articleObjectsArray[0].type);
                expect(res.body.data[0].sex).to.equal(articleObjectsArray[0].sex);
                expect(res.body.data[0].birthday).to.equal(articleObjectsArray[0].birthday);
                expect(res.body.data[0].articleText).to.equal(articleObjectsArray[0].articleText);
                expect(res.body.data[0].title).to.equal(articleObjectsArray[0].title);
                expect(res.body.data[0].categories.length).to.equal(articleObjectsArray[0].categories.length);
                done(); // conditionally call done if necessary
            });
          })
          .catch(function(error) {
            console.log('Error: ', error);
            done();
          });
      });
    });
  });
});
