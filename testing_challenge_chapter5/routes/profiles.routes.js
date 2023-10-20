var express = require('express');
var router = express.Router();
const { createProfiles, getProfilesById } = require('../controllers/profiles.controllers');

router.post('/', createProfiles);
router.get('/:id', getProfilesById);

module.exports = router;