# i18next-parrot-backend

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
