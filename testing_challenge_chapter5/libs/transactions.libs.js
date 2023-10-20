const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  createTransactions: async (source_account_id, destination_account_id, amount) => {
    try {
      const existTransactions = await prisma.transactions.findUnique({ where: { id } });
      if (existTransactions) throw 'id sudah dipakai';

      const transactions = await prisma.transactions.create({
        data: {
          source_account_id,
          destination_account_id,
          amount,
        }
      });
      return transactions;
    } catch (err) {
      throw (err);
    }
  },

  getTransactionsById: async (id) => {
    try {
      const transactions = await prisma.transactions.findUnique({ where: { id } });
      if (!transactions) throw 'id tidak ditemukan';

      return transactions;
    } catch (err) {
      throw err;
    }
  },

  updateTransactions: async (id, newData) => {
    try {
      const existingTransactions = await prisma.transactions.findUnique({ where: { id } });
      if (!existingTransactions) throw 'transactions tidak ditemukan';

      const updatedTransactions = await prisma.transactions.update({ where: { id }, data: newData });

      return updatedTransactions;
    } catch (err) {
      throw err;
    }
  },

  deletetransactions: async (id) => {
    try {
      const existingTransactions = await prisma.transactions.findUnique({ where: { id } });
      if (!existingTransactions) throw 'transactions tidak ditemukan';

      await prisma.transactions.delete({ where: { id } });
    } catch (err) {
      throw err;
    }
  }
};