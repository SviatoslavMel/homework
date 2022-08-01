const pkg = require('../package.json');

module.exports = {
  app: {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
  },
  server: {
    port: process.env.NODE_APP_INSTANCE,
    env: process.env.NODE_ENV,
  },
  rest: {
    starWars: {
      protocol: process.env.STAR_WARS_PROTOCOL,
      hostname: process.env.STAR_WARS_HOSTNAME,
    },
  },
  dnscache: {
    enable: true,
    ttl: 300,
    cachesize: 1000,
  },
};
