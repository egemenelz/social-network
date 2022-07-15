const { Thought } = require('../models');

module.exports = {
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(x => {
                console.log(x)
                res.json(x)
            })
            .catch(err => {
                res.status(400).json(err)
            });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(x => {
                if (!x) {
                    res.status(404).json({ message: "No thought with this id!" })
                    return;
                }
                res.json(x)
            })
            .catch(err => res.status(400).json(err));
    },
    createThought({ body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(x => { res.json(x) })
            .catch(err => res.json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        ).then(x => {
            if (!x) {
                res.status(404).json({ message: `No Thought found with this id!` });
                return;
            }
            res.json(x);
        }).catch(err => res.status(400).json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(x => {
                if (!x) {
                    res.status(404).json({ message: `No Thought found with this id!` });
                    return;
                }
                res.json({ message: `The Thought with this ${params.id} has been deleted` });
            }).catch(err => res.status(400).json(err));
    },
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: { reactions: body } },
            { new: true, runValidators: true },
        ).then(x => {
            console.log(x)
            res.json(x)
        }).catch(err => res.json(err));
    },
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true },
        ).then(x => {
            console.log(x)
            res.json(x)
        }).catch(err => res.json(err));
    }
};