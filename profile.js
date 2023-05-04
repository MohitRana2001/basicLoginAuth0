const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const Usermodel = require('./models/User');
const router = express.Router();

router.get('/', requiresAuth(), (req, res) => {
  // const user = new Usermodel({
  //   email: req.oidc.user.email,
  //   password: req.oidc.user.name
  // });
  // user.save();
  console.log(req.oidc.user);
  res.render('profile', { user: req.oidc.user });
});

module.exports = router;