/**
 * Postgres agent configuration
 */
const Sequelize = require('sequelize');

const dbConfig = {
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },

  logging: false,

  define: {
    timestamps: true,
    underscored: true,
    paranoid: true,
  },
};

const postgresDB = new Sequelize(process.env.POSTGRES_DB_URL, dbConfig);

module.exports = {
  postgresDB,
};
