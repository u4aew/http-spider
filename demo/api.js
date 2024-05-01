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
  // Replace data from HTTP Spider
  'GET /api/transactions/list': (req, res) => {
    res.json([
      {
        id: 1,
        date: '01.02.2023 16:05',
        sum: '100.23',
        currency: 'USD',
      },
      {
        id: 2,
        date: '01.02.2023 16:05',
        sum: '100.23',
        currency: 'USD',
      },
    ]);
  },

  'GET /api/cards/list': (req, res) => {
    res.json([
      {
        id: 1,
        pan: '4111 3424 **** 3425',
        expiry: '09/27',
        name: 'John Smith',
        ps: 'VISA',
      },
      {
        id: 2,
        pan: '4133 3424 **** 3425',
        expiry: '09/29',
        name: 'John Smith',
        ps: 'VISA',
      },
    ]);
  },

  'GET /api/transactions/details': (req, res) => {
    res.json({
      transactionId: 1,
      date: '01.02.2023 16:05',
      sum: '100.23',
      currency: 'USD',
      recipientName: 'John Doe',
      recipientAccount: '123456789',
      senderName: 'Jane Smith',
      senderAccount: '987654321',
      transactionType: 'Transfer',
      description: 'Monthly rent payment',
      status: 'Completed',
    });
  },
};
module.exports = proxy;
