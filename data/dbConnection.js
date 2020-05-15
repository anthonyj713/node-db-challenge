const knex = require('knex');

const knexfile = require('../knexfile.js');

const environment = process.env.NODE.env || 'development'; //undefined|production

module.exports = knex(knexfile[environment]);

