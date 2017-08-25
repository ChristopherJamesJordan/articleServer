/**
 * Article Endpoints module
 */
const app = require('../server');
const responseController = require('../controllers/response');

const Article = app.models.article;

/**
* Get exisiting articles
* @param {Request} req
* @param {Response} res
* @returns {Promise}
*/
const getArticles = (req, res) => {
  Article.findAll()
    .then(articles => responseController.sendSuccess(res, { data: articles }))
    .catch((err) => {
      // In a real-world environment, this would get logged to an error monitor
      console.log(`Error getting all articles.`, err);
      return responseController.sendError(res, `Error getting all articles.`, 500);
    });
};

/**
* Get an existing article by id
* @param {Request} req
* @param {Response} res
* @returns {Promise}
*/
const getArticle = (req, res) => {
  const {
    id: {
      value: articleId,
    },
  } = req.swagger.params;

  Article.findOne({ where: { id: articleId } })
    .then((article) => {
      if (!article) return responseController.sendError(res, `No article with id ${articleId} exists.`);
      return responseController.sendSuccess(req, { data: { articles: [article] } });
    })
    .catch((err) => {
      // In a real-world environment, this would get logged to an error monitor
      console.log(`Error getting article with id ${articleId}.`, err);
      return responseController.sendError(res, `Error getting article with id ${articleId}.`, 500);
    });
};

/**
* Create a new article with request parameters
* @param {Request} req
* @param {Response} res
* @returns {Promise}
*/
const postArticle = (req, res) => {
  const {
    author: {
      value: author,
    },
    type: {
      value: type,
    },
    sex: {
      value: sex,
    },
    birthdayMs: {
      value: birthdayMs,
    },
    articleText: {
      value: articleText,
    },
    title: {
      value: title,
    },
    categories: {
      value: categories,
    },
  } = req.swagger.params;

  return Article.create({ author, type, sex, birthdayMs, articleText, title, categories })
    .then(article => responseController.sendSuccess(res, { data: { articles: [article] } }))
    .catch((err) => {
      // In a real-world environment, this would get logged to an error monitor
      console.log(`Error creating article with name ${title}.`, err);
      return responseController.sendError(res, `Error creating article with name ${title}.`, 500);
    });
};

/**
* Delete an exisiting article by id
* @param {Request} req
* @param {Response} res
* @returns {Promise}
*/
const deleteArticle = (req, res) => {
  const {
    id: {
      value: articleId,
    },
  } = req.swagger.params;

  return Article.destroy({ where: { id: articleId } })
    .then((article) => {
      if (!article) return responseController.sendError(res, `No article with id ${articleId} exists.`);
      return responseController.sendSuccess(res, { data: { articles: [article] } });
    })
    .catch((err) => {
      // In a real-world environment, this would get logged to an error monitor
      console.log(`Error deleting article with id ${articleId}`, err);
      return responseController.sendError(res, `Error deleting article with id ${articleId}`, 500);
    });
};

module.exports = {
  getArticles,
  getArticle,
  postArticle,
  deleteArticle,
};
