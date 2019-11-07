'use strict';
var express = require('express');
var router = express.Router();
var Account = require('../models/account');

/* GET register page. */
router.get('/', isLoggedIn, function (req, res) {
    res.render('secret');
});


//Is the user logged in?
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('Not authenticated!');
    res.redirect('/');
}
module.exports = router;
