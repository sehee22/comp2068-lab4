'use strict';
var express = require('express');
var router = express.Router();
var Account = require('../models/account');


//Get all users
router.get('/', isLoggedIn, function (req, res) {
    Account.find(function (err, Account) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('users', { allAccounts: Account});
        }
    });
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
