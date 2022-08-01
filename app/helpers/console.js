module.exports = {
  logErrMsg: (path) => (method, e = {}) => console.error(`ERROR: ${path} :${method}: ${e.message}`),
};
