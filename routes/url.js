const express = require('express');
const {
  handleGenerateNewShortURL,
  handleGetURL,
  handleGetAnalytics,
} = require('../controllers/url');
const router = express.Router();

router.post('/', handleGenerateNewShortURL);

router.get('/:shortId', handleGetURL);

router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;
