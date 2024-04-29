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
  '/api/user': {
    id: 1,
    username: 'kenny',
    sex: 6,
  },
  'GET /api/user/list': [
    {
      id: 1,
      username: 'kenny',
      sex: 6,
    },
    {
      id: 2,
      username: 'kenny',
      sex: 6,
    },
  ],
};
module.exports = proxy;
