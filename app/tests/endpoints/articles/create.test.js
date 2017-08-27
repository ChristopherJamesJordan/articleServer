/**
 * Articles Endpoint Module - POST Article tests
 */
const app = require('../../../server');
const chai = require('chai');
const request = require('supertest');
const { ENDPOINTS } = require('../../constants');

const ARTICLES_ENDPOINT = ENDPOINTS.ARTICLES;
const expect = chai.expect;

describe(ARTICLES_ENDPOINT, function() {
  before(function(done) {
    this.timeout(3000);
    setTimeout(done, 1000); // ensure test server has time to start
  });

  describe('POST @integration', function() {

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

    it('responds with a 200 response with correct params', function(done) {
      request(app)
        .post(ARTICLES_ENDPOINT)
        .send(articleObject)
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
    });

    it('responds with a 400 response with invalid type in params', function(done) {
      const badArticleObject = articleObject;
      badArticleObject.type = 'bad type';
      request(app)
        .post(ARTICLES_ENDPOINT)
        .send(badArticleObject)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done(); // conditionally call done if necessary
      });
    });

    it('responds with a 400 response with invalid categories in params', function(done) {
      const badArticleObject = articleObject;
      badArticleObject.categories = 5;
      request(app)
        .post(ARTICLES_ENDPOINT)
        .send(badArticleObject)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done(); // conditionally call done if necessary
      });
    });

    it('responds with a 400 response with invalid title in params', function(done) {
      const badArticleObject = articleObject;
      badArticleObject.categories = [8, 0];
      request(app)
        .post(ARTICLES_ENDPOINT)
        .send(badArticleObject)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done(); // conditionally call done if necessary
      });
    });
  });
});
