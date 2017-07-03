import request from 'request-promise';
import { clone, extend, join, get, merge, forEach, set } from 'lodash';

import { auth, tokenPath, translationPath } from './config';

const getDefaults = args => extend({
}, clone(args));

/**
 * This call is responsible for fetching the translations
 * from a parrot back end
 */
class Backend {
  /**
   * Default constructor
   * @param { Object } services i18n services
   * @param { Object } options the backend options
   */
  constructor(services, options) {
    if (!(this instanceof Backend)) {
      throw new TypeError('Unable to call a class as a function');
    }
    this.type = 'backend';
    this.options = getDefaults(options);
  }

  /**
   * Initialize the service
   * @param { Object } services i18n services
   * @param { Object } options the backend options
   * @param { Object } i18nextOptions the i18n options
   */
  init(services, options) {
    this.services = services;
    this.options = getDefaults(options);
  }

  /**
   * Fetch translations for a language
   * @param { String } lang the language key
   * @param { String } ns the namespace
   * @param { Function } cb the cb to use
   */
  read(lang, ns, cb) {
    const { url, client_id, client_secret, project } = this.options;
    request.post({
      url: join([url, tokenPath], ''),
      rejectUnauthorized: false,
      form: merge(auth, { client_id, client_secret }),
      json: true
    })
      .then(({ payload }) => get(payload, 'access_token', ''))
      .then(token =>
        request.get({
          url: join([
            url, translationPath.replace('{{project_id}}', project).replace('{{locale}}', lang)
          ], ''),
          rejectUnauthorized: false,
          headers: {
            Authorization: `Bearer ${token}`
          },
          json: true
        }))
      .then((body) => {
        const translations = {};
        forEach(body, (value, key) => set(translations, key, value));
        return translations;
      })
      .then(translations => cb(null, translations))
      .catch(err => cb(err));
  }

  // eslint-disable-next-line
  readMulti(lang, ns, cb) {
    console.log('read multi not implemented');
  }

  // eslint-disable-next-line
  create(lang, ns, key, fbValue) {
    console.log('create not implemented');
  }
}

Backend.type = 'backend';

module.exports = Backend;
