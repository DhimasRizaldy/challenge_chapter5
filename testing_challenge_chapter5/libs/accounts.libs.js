const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  createAccounts: async (user_id, bank_name, bank_account_number, balance) => {
    try {
      const existAccounts = await prisma.bank_Accounts.findUnique({ where: { id } });
      if (existAccounts) throw 'id sudah dipakai';

      const accounts = await prisma.bank_Accounts.create({
        data: {
          user_id,
          bank_name,
          bank_account_number,
          balance
        }
      });
      return accounts;
    } catch (err) {
      throw (err);
    }
  },

  getAccountsById: async (id) => {
    try {
      const accounts = await prisma.bank_Accounts.findUnique({ where: { id } });
      if (!accounts) throw 'id tidak ditemukan';

      return accounts;
    } catch (err) {
      throw err;
    }
  }
};