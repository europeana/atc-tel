# Assimilated Traffic Control: The European Library

Express app to redirect from the European Library website URLs to equivalents on
[Europeana](https://www.europeana.eu/).

The handler will inspect the incoming URL path, and:
* if it starts with `/tel4/newspapers/issue/`, query the
  [Europeana Search API](https://pro.europeana.eu/page/search),
  for the Europeana ID matching the TEL ID on the remainder of the URL path,
  then redirect to the equivalent record page on the Europeana website
* otherwise redirect to the
  [Europeana Newspapers Collection](https://www.europeana.eu/collections/newspapers)

## Dependencies

* Node.js 16

## Install

```
npm ci
```

## Run for production (without .env support)

```
npm run start
```

## Run for development (with .env support)

```
npm run start:dev
```

## License

Licensed under the EUPL v1.2.

For full details, see [LICENSE.md](LICENSE.md).





## Dependencies

* Node.js 10
* [Europeana API key](https://pro.europeana.eu/get-api)

## Deploy to OpenWhisk

```
wsk action create atc/tel src/action.js --web true --kind nodejs:10 -m 128 \
  --param europeanaApiKey YOUR_API_KEY
```

## Build for local use

```
npm install
```

## Tests

```
npm test
```

## License

Licensed under the EUPL V.1.2.

For full details, see [LICENSE.md](LICENSE.md).
