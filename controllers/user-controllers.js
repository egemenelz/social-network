const { User } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(x => res.json(x))
            .catch(err => {
                res.status(400).json(err);
            });
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .select('-__v')
            .then(x => res.json(x))
            .catch(err => {
                res.status(400).json(err);
            });
    },
    createUser({ body }, res) {
        User.create(body)
            .then(x => res.json(x))
            .catch(err => {
                res.status(400).json(err);
            })
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        ).then(x => {
            if (!x) {
                res.status(404).json({ message: `No User found with this id!` });
                return;
            }
            res.json(x);
        }).catch(err => res.status(400).json(err));
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(x => {
                if (!x) {
                    res.status(404).json({ message: `No User found with this id!` });
                    return;
                }
                res.json({ message: `The user with this ${params.id} has been deleted` });
            }).catch(err => res.status(400).json(err));
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: { friendId: params.friendId } } },
            { new: true },
        )
            .then(x => res.json(x))
            .catch(err => res.json(err));
    },
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: { friendId: params.friendId } } },
            { new: true },
        ).then(x => {
            if (!x) {
                res.status(404).json({ message: `No User found with this id!` });
                return;
            }
            res.json({ message: `The user with this ${params.id} has been deleted` })
        })
            .catch(err => res.json(err));
    }
};