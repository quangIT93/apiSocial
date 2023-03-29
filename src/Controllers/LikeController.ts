import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { AuthRequest } from '../middlewave/auth';
import Like from '../Models/Like';
import Post from '../Models/Post';

class LikeController {
  async getAllLikeOfPostId(req: Request, res: Response) {
    const { postId } = req.body;
    try {
      const result = await Like.find({ postId: new mongoose.Types.ObjectId(postId) });
      if (result)
        return res.status(200).json({ success: true, message: 'get like successfully', result });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async getUserLikeOfPostId(req: Request, res: Response) {
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async deleteLikeForPostId(req: Request, res: Response) {
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async createLikeForPostId(req: AuthRequest, res: Response) {
    try {
      const { postId } = req.body;

      const newLike = new Like({
        userId: req.userId,
        postId,
      });

      const newLikePost = {
        _id: new mongoose.Types.ObjectId(newLike._id),
        userId: new mongoose.Types.ObjectId(req.userId),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const checkLiked = await Like.find({
        userId: new mongoose.Types.ObjectId(req.userId),
        postId: new mongoose.Types.ObjectId(postId),
      });
      console.log(checkLiked);
      if (checkLiked.length === 0) {
        const createNewLike = await newLike.save();

        const addNewPostLike = await Post.updateOne(
          { _id: postId },
          { $push: { likes: newLikePost } }
        );
        if (addNewPostLike && createNewLike)
          return res
            .status(200)
            .json({ success: true, message: 'create Like successfully', newLike, newLikePost });
      }

      const deleteLikePost = await Post.updateOne(
        {
          _id: postId,
        },
        { $pull: { likes: { userId: req.userId } } }
      );

      const deleteLike = await Like.findOneAndDelete({ userId: req.userId, postId: postId });

      return res
        .status(200)
        .json({ success: true, message: 'delete Like successfully', deleteLikePost, deleteLike });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

export default new LikeController();
