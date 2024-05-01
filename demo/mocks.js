module.exports = {
  'GET /api/transactions/list': (req, res) => {
    res.json([
      { id: 1, date: '01.02.2023 16:05', sum: '100.23', currency: 'USD' },
      { id: 2, date: '01.02.2023 16:05', sum: '100.23', currency: 'USD' },
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
};
