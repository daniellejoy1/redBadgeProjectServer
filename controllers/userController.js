const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const user = require('../models/user');
const User = sequelize.import('../models/user.js'); // if you get TypeError: sequelize.import is not a function, check versions in package.json.
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.get("/practice", function(req, res){
    res.send("This is a practice route")
})

router.post('/register', (req, res) => {
    User.create ({
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 13)
    })
    .then (
        function createSuccess(user){
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1d"});
            res.json({
                user: user,
                message: "User registered successfully",
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({error: err}))
});


router.post('/login', function(req, res){
    User.findOne({
        where: {user:{
            username: req.body.user.username,
        }
        }
    })
    .then(function loginSuccess(user){
        if (user) {

            bcrypt.compare(req.body.user.password, user.password, function(err, matches){
                if (matches) {

            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
            res.status(200).json({
            user: user,
            message: "User successfully logged in!",
            sessionToken: token
        })
    } else {
        res.status(502).send({error: "login failed"});
    }
    });
    }else {
        res.status(500).json({ error: 'user does not exist.'})
    }
    })
    .catch(err => res.status(500).json({ error: err}))

});

module.exports = router;