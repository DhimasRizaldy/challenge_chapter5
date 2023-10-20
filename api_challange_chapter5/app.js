require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const { PORT = 3000 } = process.env;
const endpointv1 = require('./routes/endpointV1');

// 
app.use(morgan('dev'));
app.use(express.json());

// import authRouter
const authRouter = require('./routes/auth.routes');
app.use('/api/v1/auth', authRouter);
app.use("/api/v1", endpointv1);

// 404 error handling
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Not Found",
    data: null,
  });
});

// 500 error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: false,
    message: "Internal Server Error",
    data: err.message
  });
});

// running port 3000
app.listen(PORT, () => console.log(`Server ON : http://localhost:${PORT}`));