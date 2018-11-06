const express = require('express');
const app = express();

const userRoutes = require('./api/routes/user')

app.use((req, res, next) => {
    res.status(200).json({
        message: 'Connection Established'
    });
});
app.use('/user', userRoutes);

module.exports = app;