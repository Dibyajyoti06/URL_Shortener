const shortid = require('shortid');
const URL = require('../models/url');

const handleGenerateNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url)
    return res.status(400).json({
      error: 'url is required',
    });
  const shortID = shortid.generate();
  await URL.insertMany({
    shortId: shortID,
    redirectURL: body.url,
    visitedHistory: [],
    createdBy: req.user.id,
  });
  return res.render('home', {
    id: shortID,
  });
};

const handleGetURL = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  if (entry && entry.redirectURL) {
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).send('Not Found');
  }
};

const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  handleGenerateNewShortURL,
  handleGetURL,
  handleGetAnalytics,
};
