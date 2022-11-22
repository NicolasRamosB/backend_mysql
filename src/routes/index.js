const express = require('express');
const router = express.Router();
const homeRouter = require('./home/home.router');

router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    health: 'up',
    enviroment: process.env.ENVIROMENT
  });
})
.use('/', homeRouter);



module.exports = router