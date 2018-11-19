const express = require('express');
const passport = require('passport');
const session = require('express-session');
const app = express();

const userRoutes = require('./api/routes/user')
const nativeRoutes = require('./api/routes/native')

app.use((req, res, next) => {
    res.status(200).json({
        message: 'Connection Established'
    });
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRoutes);
app.use('/native', nativeRoutes);

module.exports = app;