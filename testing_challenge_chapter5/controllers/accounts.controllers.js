const { createAccounts, getAccountsById } = require('../libs/accounts.libs');

module.exports = {
  createAccounts: async (req, res, next) => {
    try {
      let { user_id, bank_name, bank_account_number, balance } = req.body;

      try {
        let accounts = await createAccounts(user_id, bank_name, bank_account_number, balance);

        return res.status(201).json({
          status: false,
          message: 'OK',
          data: accounts
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err,
          data: null
        });
      }
    } catch (err) {
      next(err);
    }
  },

  getAccountsById: async (req, res, next) => {
    try {
      let { id } = req.params;
      try {
        let accounts = await getAccountsById(Number(id));

        return res.status(200).json({
          status: false,
          message: 'OK',
          data: accounts
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err,
          data: null
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err,
        data: null
      });
    }
  }
};