const fetch = require('node-fetch');

module.exports = class PeopleRest {
  #url;

  /** Create PeopleRest object
   * @param {String<'https'|'http'>} protocol
   * @param {String} hostname
   * @param {String} port
   * @return {PeopleRest}
   */
  constructor({ protocol, hostname }) {
    this.#url = `${protocol}://${hostname}/api/people/`;
    return this;
  }

  /** Get people by his ID
   * @param {Number} id
   * @return {Promise}
   */
  getById(id) {
    return fetch(`${this.#url}${id}`)
      .then((response) => response.json());
  }
};
