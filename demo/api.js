const mocks = require('./mocks');

const proxy = {
  _proxy: {
    proxy: {},
    pathRewrite: {},
    changeHost: true,
    // modify the http-proxy options
    httpProxy: {
      options: {
        ignorePath: true,
      },
      listeners: {
        proxyReq: function () {
          console.log('proxyReq');
        },
      },
    },
  },
  ...mocks,
};
module.exports = proxy;
