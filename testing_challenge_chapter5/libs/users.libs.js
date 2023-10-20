const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  createUsers: async (name, email, password) => {
    try {
      const existUsers = await prisma.users.findUnique({ where: { email } });
      if (existUsers) throw 'email sudah dipakai';

      const users = await prisma.users.create({ data: { name, email, password } });
      return users;
    } catch (err) {
      throw err;
    }
  },

  getUsersById: async (id) => {
    try {
      const users = await prisma.users.findUnique({ where: { id } });
      if (!users) throw 'users tidak ditemukan';

      return users;
    } catch (err) {
      throw err;
    }
  },

  updateUsers: async (id, newData) => {
    try {
      const existingUser = await prisma.users.findUnique({ where: { id } });
      if (!existingUser) throw 'users tidak ditemukan';

      const updatedUser = await prisma.users.update({ where: { id }, data: newData });

      return updatedUser;
    } catch (err) {
      throw err;
    }
  },

  deleteUsers: async (id) => {
    try {
      const existingUser = await prisma.users.findUnique({ where: { id } });
      if (!existingUser) throw 'users tidak ditemukan';

      await prisma.users.delete({ where: { id } });
    } catch (err) {
      throw err;
    }
  }
};