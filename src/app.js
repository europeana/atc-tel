import express from 'express';
import morgan from 'morgan';
import elasticApmNode from 'elastic-apm-node';
import expressPkg from 'express/package.json' assert { type: 'json' };
import config from './config.js';
import handler from './handler.js';
import pkg from '../package.json' assert { type: 'json' };

if (config.elasticApm.serverUrl) {
  const elasticApmOptions = {
    ...config.elasticApm,
    frameworkName: 'Express.js',
    frameworkVersion: expressPkg.version,
    serviceName: 'api-proxy-cache',
    serviceVersion: pkg.version
  };
  elasticApmNode.start(elasticApmOptions);
}

const app = express();
app.use(morgan('combined'));
app.get('/*', handler);

const server = app.listen(config.port, () => {
  console.log('Listening on port ' + server.address().port);
});
