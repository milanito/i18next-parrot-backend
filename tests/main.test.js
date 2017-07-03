import i18next from 'i18next';
import nock from 'nock';
import { expect } from 'chai';

import backend from '../src/i18next-parrot-backend';
import { auth, tokenPath, translationPath } from '../src/config';

describe('i18next Parrot backend plugin tests', () => {
  describe('Success Cases', () => {
    const token = 'some-token';
    const options = {
      url: 'https://some.url',
      client_id: 'client_id',
      client_secret: 'client_secret',
      project: 'project',
    };
    let nockToken, nockTranslation;

    before((done) => {
      nockToken = nock(options.url)
      .post(tokenPath)
      .reply(200, {
        payload: {
          access_token: token
        }
      });
      nockTranslation = nock(options.url, {
        reqheaders: {
          authorization: `Bearer ${token}`,
          host: 'some.url',
          accept: 'application/json'
        }
      })
      .get(translationPath.replace('{{project_id}}',options.project).replace('{{locale}}', 'en_US'))
      .reply(200, {
        'SOME.string': 'is translated'
      });
      done();
    });

    after((done) => {
      nock.cleanAll();
      done();
    });

    it('should load the translations', (done) => {
      const instance = i18next.createInstance()
      .use(backend)
      .init({
        backend: options,
        fallbackLng: 'en_US'
      });

      instance.on('loaded', () => {
        expect(nockToken.isDone()).to.be.equal(true);
        expect(nockTranslation.isDone()).to.be.equal(true);
        expect(instance.t('SOME.string')).to.be.equal('is translated');
        done();
      });
    });
  });
});
