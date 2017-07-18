# i18next-parrot-backend

[![CircleCI](https://circleci.com/gh/milanito/i18next-parrot-backend.svg?style=svg)](https://circleci.com/gh/milanito/i18next-parrot-backend) [![npm version](https://badge.fury.io/js/i18next-parrot-backend.svg)](https://badge.fury.io/js/i18next-parrot-backend) [![GitHub issues](https://img.shields.io/github/issues/milanito/i18next-parrot-backend.svg)](https://github.com/milanito/i18next-parrot-backend/issues) [![GitHub stars](https://img.shields.io/github/stars/milanito/i18next-parrot-backend.svg)](https://github.com/milanito/i18next-parrot-backend/stargazers)

This is a simple i18next backend to be used when you have a [parrot](http://anthonynsimon.com/parrot.github.io/) instance.

## Getting started

Source can be installed doing this :

    $ npm install i18next-parrot-backend
    $ yarn add i18next-parrot-backend

Using it then is quite straightfoward :

    import i18next from 'i18next';
    import parrotBackend from 'i18next-parrot-backend';

    i18next
    .use(parrotBackend)
    .init(i18nextOptions)

## Backend Options

The following options are available :

```
{
  // Your backend URL
  url: 'https://some.url',
  client_id: 'your client id',
  client_secret: 'your client secret',
  project: 'project'
}
```

Please pass the options using the preferred way, using the `i18next.init`.

    import i18next from 'i18next';
    import parrotBackend from 'i18next-parrot-backend';

    i18next
    .use(parrotBackend)
    .init({
      backend: options,
      ...
    })

You can also use the other methods :

    import ParrotBackend from 'i18next-parrot-backend';

    // construction
    const instance = new ParrotBackend(null, options);
    // or init
    const instance = new ParrotBackend();
    instance.init(options);

## License

MIT
