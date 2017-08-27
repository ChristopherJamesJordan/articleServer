/**
 * Articles Endpoint Module - DELETE Article tests
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

  describe('DELETE @integration', function() {

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

      it('should return a 200 response status code.', function(done) {
        this.models.article.create(articleObject.Article)
          .then(function(article) {
            const articleId = article.dataValues.uuid;
            const deleteEndpoint = `${ARTICLES_ENDPOINT}/${articleId}`;
            const deleteSuccess = 1;

            request(app)
              .delete(getEndpoint)
              .expect('Content-Type', /json/)
              .expect(200)
              .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data[0]).to.equal(deleteSuccess);
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
        const deleteEndpoint = `${ARTICLES_ENDPOINT}/${articleId}`;

        request(app)
          .delete(deleteEndpoint)
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
        const deleteEndpoint = `${ARTICLES_ENDPOINT}/${articleId}`;

        request(app)
          .delete(deleteEndpoint)
          .expect('Content-Type', /json/)
          .expect(400)
          .end((err, res) => {
            res.body.should.have.keys('message');
            res.body.message.should.equal(`Error deleting article with uuid ${articleId}`);
            done(); // conditionally call done if necessary
        });
      });
    });
  });
});
