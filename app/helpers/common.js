module.exports = {
  /** search ID in URL
   * @param {String} str
   * @return {number}
   */
  getIdRegExp: (str) => {
    if (typeof str !== 'string') throw Error('Wrong type');
    const regExp = new RegExp(/\/(\d+)\//);
    return Number(str.match(regExp)?.[1]);
  },
};
