const express = require('express');
const CommentModel = require('../../models/comment/comment.model').CommentModel;
const commentSchemaValidation = require('../../validation/comment/comment.validation');

// GET ALL
const getAllComments = async (req, res) => {
  try {
    const data = await CommentModel.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET BY ID
const getComment = async (req, res) => {
  try {
    const data = await CommentModel.findById(req.params.commentId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// CREATE COMMENT
const createComment = async (req, res) => {
  try {
    const validation = await commentSchemaValidation.validate(req.body);
    if (validation.error) {
      return res
        .status(409)
        .json({ message: validation.error.details[0].message });
    }
    const comment = await new CommentModel({ text: req.body.text });
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
};

// EDIT COMMENT
const editComment = async (req, res) => {
  try {
    const validation = await commentSchemaValidation.validate(req.body);
    if (validation.error) {
      return res
        .status(409)
        .json({ message: validation.error.details[0].message });
    }
    await CommentModel.updateOne(
      { _id: req.params.commentId },
      {
        text: req.body.text,
      },
    );
    const modifiedComment = await CommentModel.findById(req.params.commentId);
    res.status(200).json(modifiedComment);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE COMMENT
const deleteComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.commentId);
    if (comment) {
      await comment.remove();
      return res.status(200).json({ message: 'Comment deleted' });
    } else {
      return res.status(404).json({ message: 'Comment does not exist' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// GENERATE RANDOM COMMENT
const generateRandom = async (req, res) => {
  try {
    await CommentModel.aggregate([{ $sample: { size: 1 } }], (err, data) => {
      err ? res.status(500).json(err) : res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllComments,
  getComment,
  deleteComment,
  createComment,
  editComment,
  generateRandom,
};
