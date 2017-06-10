'use strict';

// Need to bootstrap DI quick hack probably should be mocked

import config from 'config';
import VirtualPrinter from 'lib/printer/virtual';
import winston from 'winston';

// Register class with DI container under 'printer' name
config.container.service('printer', VirtualPrinter);
config.container.service('logger', () => {
  var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        level: 'silly'
      })
    ]
  });
  return logger;
});
