const config = require('config');
const PeopleRest = require('../managers/people');
const PlanetRest = require('../managers/planet');
const logErrMsg = require('../helpers/console').logErrMsg(__filename);
const { getIdRegExp } = require('../helpers/common');

const peopleManager = new PeopleRest(config.rest.starWars);
const planetManager = new PlanetRest(config.rest.starWars);

module.exports = {
  /** Get all planets ID
   * @param ctx
   * @param next
   * @return {Promise<[Number]>}
   */
  getAllPlanetId: async (ctx, next) => {
    const planets = await planetManager.getAll()
      .catch((error) => {
        logErrMsg('planetManager.getAll', error);
        ctx.throw(500, { message: 'Something went wrong' });
      });

    ctx.body = planets?.results?.map(({ url } = {}) => getIdRegExp(url));
    return next();
  },

  /** Get information about planet by ID
   * @param ctx
   * @param next
   * @return {Promise<Object>}
   */
  getPlanetById: async (ctx, next) => {
    const { id } = ctx.params;
    ctx.assert(Number(id), 400, { message: `Wrong id ${id}` });

    const planet = await planetManager.getById(id)
      .catch((error) => {
        logErrMsg('planetManager.getById', error);
        ctx.throw(500, { message: 'Something went wrong' });
      });

    ctx.assert(planet, 404, { message: `Planet id: ${id} NOT found` });
    ctx.body = planet;
    return next();
  },

  /** Get all people from planet
   * @param ctx
   * @param next
   * @return {Promise<Object>}
   */
  getPeopleFromPlanetId: async (ctx, next) => {
    const { id } = ctx.params;
    ctx.assert(Number(id), 400, { message: `Wrong id ${id}` });

    const planet = await planetManager.getById(id)
      .catch((error) => {
        logErrMsg('planetManager.getById', error);
        ctx.throw(500, { message: 'Something went wrong' });
      });

    ctx.assert(planet, 404, { message: `Planet id: ${id} NOT found` });

    const peoples = await Promise.all(
      planet.residents.map((url) => {
        const peopleId = getIdRegExp(url);
        if (!peopleId) return undefined;

        return peopleManager.getById(peopleId)
          .catch((error) => logErrMsg('peopleManager.getById', error));
      }),
    );

    ctx.body = peoples
      ?.filter((people) => people);
    return next();
  },
};
