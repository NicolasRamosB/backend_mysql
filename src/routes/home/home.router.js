const express = require('express');
const router = express.Router();
const Container = require('../../../class/Container');


router.get('/', (_req, res, next) => {
  try {
    res.render('pages/home');

  } catch (err) {
    next(err);
    
  };

});



module.exports = router;