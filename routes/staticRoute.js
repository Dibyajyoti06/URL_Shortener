const express = require('express');
const URL = require('../models/url');
const { restrictTo } = require('../middlewares/auth');
const router = express.Router();

router.get('/admin/urls', restrictTo(['ADMIN']), async (req, res) => {
  const allurls = await URL.find({ createdBy: req.user.id });
  res.render('home', {
    urls: allurls,
  });
});

router.get('/', restrictTo(['NORMAL', 'ADMIN']), async (req, res) => {
  // if (!req.user) return res.redirect('/login');
  const allurls = await URL.find({ createdBy: req.user.id });
  res.render('home', {
    urls: allurls,
  });
});

router.get('/signup', (req, res) => {
  return res.render('Signup');
});

router.get('/login', (req, res) => {
  return res.render('login');
});
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});
module.exports = router;
