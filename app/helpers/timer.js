module.exports = () => {
  const mark = Date.now();
  return () => Date.now() - mark;
};
