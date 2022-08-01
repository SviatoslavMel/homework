const secureHeaderName = 'are-you-auth';
const secureHeaderValue = 'yes';

module.exports = {
  auth: (ctx, next) => {
    const authHeader = ctx.headers[secureHeaderName];
    const isUserAuth = authHeader === secureHeaderValue;
    ctx.assert(isUserAuth, 401, { message: 'Auth required' });
    return next();
  },
};
