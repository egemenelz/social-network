const router = require('express').Router();
const User = require('../../models/User');

router.get('/', (req, res) => {
    User.find({})
        .populate({ path: 'toughts' })
        .populate({ path: 'friends' })
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.get('/:id', (req, res) => {
    User.findOne({ _id: req.params.id })
        .populate({ path: 'toughts' })
        .populate({ path: 'friends' })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});