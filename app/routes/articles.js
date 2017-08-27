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

  Article.findOne({ where: { uuid: articleId } })
    .then((article) => {
      if (!article) return responseController.sendError(res, `No article with uuid ${articleId} exists.`);
      return responseController.sendSuccess(res, { data: [article] });
    })
    .catch((err) => {
      // In a real-world environment, this would get logged to an error monitor
      console.log(`Error getting article with uuid ${articleId}.`, err);
      return responseController.sendError(res, `Error getting article with uuid ${articleId}.`, 500);
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
    author,
    type,
    sex,
    birthday,
    articleText,
    title,
    categories,
  } = req.swagger.params.body.value.Article;

  return Article.create({ author, type, sex, birthday, articleText, title, categories })
    .then(article => responseController.sendSuccess(res, { data: [article] }))
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

  return Article.destroy({ where: { uuid: articleId } })
    .then((article) => {
      if (!article) return responseController.sendError(res, `No article with uuid ${articleId} exists.`);
      return responseController.sendSuccess(res, { data: [{ result: article }] });
    })
    .catch((err) => {
      // In a real-world environment, this would get logged to an error monitor
      console.log(`Error deleting article with uuid ${articleId}`, err);
      return responseController.sendError(res, `Error deleting article with uuid ${articleId}`, 500);
    });
};

module.exports = {
  getArticles,
  getArticle,
  postArticle,
  deleteArticle,
};
