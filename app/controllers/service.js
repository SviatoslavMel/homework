const config = require('config');
const timer = require('../helpers/timer')();

const { name, version, description } = config.app;

const about = async (ctx, next) => {
  ctx.body = (
    {
      name,
      version,
      description,
      uptime: String(timer()),
      now: new Date(),
    }
  );
  await next();
};

module.exports = {
  about,
};
