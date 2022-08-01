const http = require('http');
const Koa = require('koa');
const config = require('config');

const {
  routesPublic,
  routesPrivate,
} = require('./routes/index');

const app = new Koa();
app.use(async (ctx, next) => {
  if (process.env.TEST_USER) {
    ctx.userId = process.env.TEST_USER;
  }
  await next();
});
app.use(routesPrivate());
app.use(routesPublic());

app.use(async (ctx, next) => {
  if (ctx.status >= 400) {
    const error = new Error();
    error.message = `Status->${ctx.status} Method->${ctx.method} headers-> ${JSON.stringify(ctx.request.headers)}`;
    console.error(error);
  }
  await next();
});
const server = http.createServer(app.callback())
  .listen(config.server.port, () => {
    // eslint-disable-next-line no-console
    console.table({
      Application: config.app.name,
      Version: config.app.version,
      Environment: config.server.env,
    });
  });

module.exports = {
  server,
  closeServer() {
    server.close();
  },
};
