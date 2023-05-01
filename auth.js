const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const router = express.Router();

router.get('/', (req, res) => {
    const user = req.oidc.user || null;
    res.render('home', { user });
  });

router.get('/login', (req, res) => {
  res.oidc.login({ returnTo: '/profile' });
});

router.get('/register', requiresAuth(), (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).send('Please provide all fields');
    }
  
    const existingUser = await User.findOne({ email });
  
    if (existingUser) {
      return
    }
    const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
      name,
      email,
      password: hashedPassword,
      });
      
      try {
      await user.save();
      res.redirect('/login');
      } catch (err) {
      console.error(err);
      res.status(500).send('Something went wrong');
      }
      });

module.exports = router;
