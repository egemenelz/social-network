const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controllers');

/**
 * API REQUESTS ARE WITHOUT PATH VARIABLE;
 *  @param {getAllThought, createThought}
 * getAllThought -> Returns all the thought objects saved in the database
 * createThought -> Creates a new thought object in the database.
 */
router.route('/').get(getAllThought).post(createThought);
/**
 * API REQUESTS ARE WITH PATH VARIABLE (/:id)
 * @param {getThoughtById, updateThought, deleteThought}
 * getThoughtById -> Returns information about the given id
 * updateThought -> Updates the object with given id!
 * deleteThought -> Deletes the object with given id!
 */
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);
/**
 * API REQUEST WITH PATH VARIABLE (/:id/reactions)
 * @param {createReaction}
 * createReaction -> Creates a reaction object to the given thought id.
 */
router.route('/:id/reactions').post(createReaction);
/**
 * API REQUEST WITH PATH VARIABLE (/:id/reactions/:friendId)
 * @param {deleteReaction}
 * deleteReaction -> Deletes a reaction fromt  object to the given thought id and reactionId.
 */
router.route('/:id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;