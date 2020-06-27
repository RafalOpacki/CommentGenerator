const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

const CommentModel = mongoose.model('comment', CommentSchema);

module.exports = {
  CommentSchema,
  CommentModel,
};
