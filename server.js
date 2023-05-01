require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongo');
const { auth, requiresAuth } = require('express-openid-connect');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path');
const db = require('./database');
const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const bcrypt = require("bcrypt");


const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoDBStore.create({mongoUrl: process.env.MONGO_URI}),
  })
);
app.use(
  auth({
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET,
    authRequired: false,
    auth0Logout: true,
  })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.render('profile', { user: req.oidc.user });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
