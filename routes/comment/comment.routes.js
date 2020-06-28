const express = require('express');
const commentController = require('../../controllers/comment/comment.controller');

const router = express.Router();

// GET
router.get('/', commentController.getAllComments);
router.get('/random', commentController.generateRandom);
router.get('/:commentId', commentController.getComment);

// POST
router.post('/', commentController.createComment);

// DELETE
router.delete('/:commentId', commentController.deleteComment);

//PUT
router.put('/:commentId', commentController.editComment);

module.exports = router;
