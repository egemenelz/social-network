const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user-controllers');

/**
 * API REQUESTS ARE WITHOUT PATH VARIABLE;
 *  @param {getAllUsers, createUser}
 * getAllUsers -> Returns all the user objects saved in the database
 * createUser -> Creates a new user object in the database.
 */
router.route('/').get(getAllUsers).post(createUser);
/**
 * API REQUESTS ARE WITH PATH VARIABLE (/:id)
 * @param {getUserById, updateUser, deleteUser}
 * getUserById -> Returns information about the given id
 * updateUser -> Updates the object with given id!
 * deleteUser -> Deletes the object with given id!
 */
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);
/**
 * API REQUEST WITH PATH VARIABLE (/:id/friends/:friendId)
 * @param {addFriend,deleteReaction}
 * addFriend -> Adds friends to the given user id
 * deleteFriend -> Deletes a reaction fromt  object to the given thought id and reactionId.
 */
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;