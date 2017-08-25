/**
 * Article Schema module
 */
const Sequelize = require('sequelize');

module.exports = (sequelizeDB, modelName) => {
  const Article = sequelizeDB.define(modelName, {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sex: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birthdayMs: {
      type: Sequelize.INTEGER,
      field: 'birthday_ms',
      allowNull: false,
    },
    articleText: {
      type: Sequelize.STRING,
      field: 'article_text',
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    categories: {
      type: Sequelize.STRING, // TODO update this to JSON or Array
      allowNull: false,
    },
  });

  return Article;
};
