'use strict';
var express = require('express');
var router = express.Router();
var Product = require('../models/products');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

//Get all products
router.get('/products', function (req, res) {
    Product.find(function (err, products) {
        if (err) console.log(err);
        else res.render('products', { allProducts: products });
    });
});

//Add Product
router.get('/products/add', function (req, res) {
    res.render('add');
});

//Add a Product to DB
router.post('/products/add', function (req, res) {
    Product.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    }, function (err, Product) {
        if (err) console.log(err);
        else {
            console.log('Product added: ' + Product);
            res.render('added', { product: Product.title });
        }
    });
});

// Delete a Product
router.get('/products/delete/:id', function (req, res) {
    var id = req.params.id;

    Product.deleteOne({ _id: id }, function (err) {//_id is for DB, id is a parameter
        if (err)
            console.log('Product : ' + id + 'not found!');
        else
            res.redirect('/products');
    });
});

// Edit a Product
router.get('/products/edit/:id', function (req, res) {
    var id = req.params.id;

    Product.findById(id, function (err, product) {
        if (err)
            res.send('Product: ' + id + 'not found!');
        else
            res.render('edit', { product: product });
    });
});

//Edit a Product and save to DB
router.post('/products/edit', function (req, res) {
    var id = req.body.id;
    var editedProduct = {
        _id: id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    };

    Product.updateOne({ _id: id }, editedProduct, function (err) {
        if (err) res.send('Product: ' + id + ' not founds!');
        else {
            console.log('Product ' + id + ' updated!');
            res.redirect('/products');
        }
    });
});


module.exports = router;


