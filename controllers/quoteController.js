const express = require('express');
const router = express.Router();
const headers = require('../middleware/headers')
const sequelize = require('../db');
const quote = require('../models/quotes');
const Quote = sequelize.import('../models/quotes.js');


router.get("/practice", function(req, res){
    res.send("This is a practice route")
})

router.post('/new', function(req, res){
    res.header("Access-Control-Allow_Origin: * ");

    Quote.create({
        address: req.body.quote.address,
        serviceDescription: req.body.quote.serviceDescription,
        estimator: req.body.quote.estimator,
        price: req.body.quote.price,
        squareFootage: req.body.quote.squareFootage,
        quoteStatus: req.body.quote.quoteStatus,
        notes: req.body.quote.notes
})
    .then (quote => res.status(200).json({ message:'New quote created', quote}))
    .catch(err => res.status(500).json({error:err}))
})

router.get('/list', (req, res) => {
    res.header("Access-Control-Allow_Origin: * ");
    Quote.findAll()

    .then(quote => res.status(200).json({
        message: 'Quote list retrieved', quote
    }))
    .catch(err => res.status(500).json({
        message: 'Quote list retrieval failed', err
    }))
})

router.put('/update/:id', (req, res) => {
    res.header("Access-Control-Allow_Origin: * ");
    Quote.update({
        address: req.body.quote.address,
        serviceDescription: req.body.quote.serviceDescription,
        estimator: req.body.quote.estimator,
        price: req.body.quote.price,
        squareFootage: req.body.quote.squareFootage,
        quoteStatus: req.body.quote.quoteStatus,
        notes: req.body.quote.notes},
{where: {id: req.params.id}
    })
    .then(updated => res.status(200).json({
        message: `Quote #${req.params.id} updated successfully`, updated
    }))
    .catch(err => res.status(500).json({
        message: 'Update failed', err
    }))
})

router.delete('/delete/:id', (req, res) => {
    res.header("Access-Control-Allow_Origin: * ");
    Quote.destroy({ where : {id: req.params.id }})
    .then (deleted => res.status(200).json({ message :`Quote #${ req.params.id} has been deleted`}))
    .catch(err => res.status(500).json({message: 'Error deleting quote', err}))
})
module.exports = router;

