const router = require('express').Router();
const Tought = require('../../models/Tought');

router.get('/', (req, res) => {
    Tought.find({})
    .populate({
        path:''
    })
})