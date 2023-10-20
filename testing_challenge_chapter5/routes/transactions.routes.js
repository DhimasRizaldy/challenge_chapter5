var express = require('express');
var router = express.Router();
const { createTransactions, getTransactionsById } = require('../controllers/transactions.controllers');

router.post('/', createTransactions);
router.get('/:id', getTransactionsById);

module.exports = router;