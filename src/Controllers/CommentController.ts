import { Request, Response } from 'express';

import { ObjectId } from 'mongodb';
import mongoose, { Mongoose, Schema } from 'mongoose';
import { AuthRequest } from '../middlewave/auth';

import Comment from '../Models/Comment';
import Post, { ICommentPost } from '../Models/Post';

class CommentController {
  async getCommentPost(req: AuthRequest, res: Response) {
    try {
      const result = await Comment.find({
        postId: new Object('63fdef88a9b18f79379468a8'),
      }).populate({
        path: 'userId',
        select: 'firstName _id lastName profilePicture',
      });
      // .populate({ path: 'postId', select: 'userId text image' });

      if (result)
        return res
          .status(200)
          .json({ success: true, message: 'get comment of postId successfully', result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async deleleCommentPost(req: Request, res: Response) {
    const { commentId } = req.body;

    try {
      const result = await Comment.findOne({ _id: commentId });

      if (result)
        res.status(200).json({ success: true, message: 'delete comment successfully', result });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async createCommentPost(req: AuthRequest, res: Response) {
    const { postId, text } = req.body;
    console.log(req.body);
    try {
      const getPost = await Post.findById(new ObjectId(postId));
      if (!getPost) return res.status(400).json({ success: false, message: "don't find post" });

      const newComment = new Comment({
        userId: new ObjectId(req.userId),
        postId,
        text,
      });

      // const createComment = await newComment.save();
      // Tạo comment mới

      const id = req.userId?.toString();
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'userId: undefine',
        });
      }

      const newCommentPost: ICommentPost = {
        userId: new mongoose.Types.ObjectId(id),
        text,
        _id: new mongoose.Types.ObjectId(newComment._id),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // const addCommentPost = await Post.updateOne(
      //   { _id: postId },
      //   { $push: { comments: newCommentPost } }
      // );

      // if (createComment && addCommentPost)
      return res.status(200).json({
        success: true,
        message: 'create comment successfully',
        newComment,
        newCommentPost,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

export default new CommentController();
