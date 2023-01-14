export default {
  elasticApm: {
    environment: process.env['ELASTIC_APM_ENVIRONMENT'] || 'development',
    logLevel: process.env['ELASTIC_APM_LOG_LEVEL'] || 'info',
    serverUrl: process.env['ELASTIC_APM_SERVER_URL']
  },
  europeana: {
    apiKey: process.env['EUROPEANA_API_KEY'],
  },
  port: process.env.PORT || 3000
};
