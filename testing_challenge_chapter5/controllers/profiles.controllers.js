const { createProfiles, getProfilesById } = require('../libs/profiles.libs');

module.exports = {
  createProfiles: async (req, res, next) => {
    try {
      let { user_id, identity_type, identity_number, address } = req.body;

      try {
        let profiles = await createProfiles(user_id, identity_type, identity_number, address);

        return res.status(201).json({
          status: false,
          message: 'OK',
          data: profiles
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

  getProfilesById: async (req, res, next) => {
    try {
      let { id } = req.params;
      try {
        let profiles = await getProfilesById(Number(id));

        return res.status(200).json({
          status: false,
          message: 'OK',
          data: profiles
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