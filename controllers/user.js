// const {v4: uuidv4}=require('uuid');
const User = require('../models/user');
const { setUser, getUser } = require('../Services/auth');

const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;
  await User.insertMany({
    name,
    email,
    password,
  });
  return res.redirect('/');
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render('login', {
      error: 'Invalid Username or Password',
    });

  //    const sessionId=uuidv4();
  //    setUser(sessionId,user);
  //    res.cookie("uid",sessionId);

  const token = setUser(user);
  res.cookie('token', token);
  // return res.json({ token });

  return res.redirect('/');
};

module.exports = { handleUserSignup, handleUserLogin };
