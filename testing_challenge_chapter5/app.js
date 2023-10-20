var express = require('express');
var logger = require('morgan');

var usersRouter = require('./routes/users.routes');
var profilesRouter = require('./routes/profiles.routes');
var accountsRouter = require('./routes/accounts.routes');
var transactionsRouter = require('./routes/transactions.routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/profiles', profilesRouter);
app.use('/api/v1/accounts', accountsRouter);
app.use('/api/v1/transactions', transactionsRouter);

module.exports = app;
