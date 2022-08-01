require('dotenv').config();
const config = require('config');
require('dnscache')(config.dnscache);
require('./app');
