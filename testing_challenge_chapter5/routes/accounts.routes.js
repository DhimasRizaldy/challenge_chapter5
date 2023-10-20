var express = require('express');
var router = express.Router();
const { createAccounts, getAccountsById } = require('../controllers/accounts.controllers');

router.post('/', createAccounts);
router.get('/:id', getAccountsById);

module.exports = router;