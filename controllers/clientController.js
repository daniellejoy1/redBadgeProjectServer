const express = require('express');
// const { Client } = require('pg');
const router = express.Router();
const headers = require('../middleware/headers')
const sequelize = require('../db');
const client = require('../models/clients');
const { authDeleteClient } = require('../middleware/auth');
const Client = sequelize.import('../models/clients.js');


router.get("/practice", function(req, res){
    res.send("This is a practice route")
})

router.post('/new', function(req, res){
    res.header("Access-Control-Allow_Origin: * ");

    Client.create({
        firstName: req.body.client.firstName,
        lastName: req.body.client.lastName,
        businessName: req.body.client.businessName ,
        email: req.body.client.email,
        primaryPhoneNumber: req.body.client.primaryPhoneNumber,
        secondaryPhoneNumber: req.body.client.secondaryPhoneNumber,
        billingAddress: req.body.client.billingAddress
})
    .then (client => res.status(200).json({ message:'Client Created', client}))
    .catch(err => res.status(500).json({error:err}))
})

router.get('/list', (req, res) => {
    res.header("Access-Control-Allow_Origin: * ");
    Client.findAll()

    .then(client => res.status(200).json({
        message: 'Client list retrieved', client
    }))
    .catch(err => res.status(500).json({
        message: 'Client list retrieval failed', err
    }))
})

router.put('/update/:id', (req, res) => {
    res.header("Access-Control-Allow_Origin: * ");
    Client.update({
        firstName: req.body.client.firstName,
        lastName: req.body.client.lastName,
        businessName: req.body.client.businessName ,
        email: req.body.client.email,
        primaryPhoneNumber: req.body.client.primaryPhoneNumber,
        secondaryPhoneNumber: req.body.client.secondaryPhoneNumber,
        billingAddress: req.body.client.billingAddress}, 
        {where: {id: req.params.id}
    })
    .then(updated => res.status(200).json({
        message: `Client #${req.params.id} updated successfully`, updated
    }))
    .catch(err => res.status(500).json({
        message: 'Update failed', err
    }))
})

router.delete('/delete/:id', authDeleteClient(["admin"]), (req, res) => {
    res.header("Access-Control-Allow_Origin: * ");
    Client.destroy({ where : {id: req.params.id }})
    .then (deleted => res.status(200).json({ message :`Client #${ req.params.id} has been deleted`}))
    .cath(err => res.status(500).json({message: 'Error deleting client', err}))
})
module.exports = router;