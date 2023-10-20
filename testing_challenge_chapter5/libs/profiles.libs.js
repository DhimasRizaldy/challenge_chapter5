const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  createProfiles: async (user_id, identity_type, identity_number, address) => {
    try {
      const existProfiles = await prisma.profiles.findUnique({ where: { id } });
      if (existProfiles) throw 'id sudah dipakai';

      const profiles = await prisma.profiles.create({
        data: {
          user_id,
          identity_type,
          identity_number,
          address
        }
      });
      return profiles;
    } catch (err) {
      throw (err);
    }
  },

  getProfilesById: async (id) => {
    try {
      const profiles = await prisma.profiles.findUnique({ where: { id } });
      if (!profiles) throw 'id tidak ditemukan';

      return profiles;
    } catch (err) {
      throw err;
    }
  }
};