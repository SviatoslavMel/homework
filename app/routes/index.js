const Router = require('koa-router');
const koaBody = require('koa-body');
const service = require('../controllers/service');
const { auth } = require('../middleware/auth');

const routesPublic = new Router();
const routesPrivate = new Router();

routesPublic
  .use(koaBody())
  .prefix('/public')
  .get('/planet/:id', require('../controllers/starWars').getPlanetById)
  .get('/planet/', require('../controllers/starWars').getAllPlanetId);

routesPrivate
  .use(koaBody())
  .use(auth)
  .get('/', service.about)
  .get('/people-from-planet/:id', require('../controllers/starWars').getPeopleFromPlanetId);

module.exports = {
  routesPublic() {
    return routesPublic.routes();
  },
  routesPrivate() {
    return routesPrivate.routes();
  },
};
