import { Request, Response } from 'express';

import { ObjectId } from 'mongodb';

import Friend from '../Models/Friend';
import Post from '../Models/Post';
import { AuthRequest } from '../middlewave/auth';

class PostController {
  async getAllPostUser(req: AuthRequest, res: Response) {
    try {
      console.log(req.userId);
      console.log(new ObjectId(req.userId));
      const result = await Post.find({ userId: new ObjectId(req.userId) });
      return res.status(200).json({ success: true, message: 'get post user', result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async getAllPostFriend(req: AuthRequest, res: Response) {
    try {
      const result = await Friend.aggregate([
        {
          $match: {
            $and: [
              {
                $or: [{ userId: new ObjectId(req.userId) }, { friendId: new ObjectId(req.userId) }],
              },
              { status: 'accepted' },
            ],
          },
        },
        {
          $lookup: {
            from: 'posts',
            let: { userIds: ['$userId', '$friendId'] },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$userId', '$$userIds'],
                  },
                },
              },
            ],
            as: 'posts',
          },
        },
        {
          $unwind: '$posts',
        },
        {
          $replaceRoot: { newRoot: '$posts' },
        },
        {
          $match: {
            userId: { $ne: new ObjectId(req.userId) },
          },
        },
      ]);

      res.status(200).json({ success: true, message: 'get post Friend successfully', result });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async createPost(req: Request, res: Response) {
    try {
      const { text, image, likes, comments, userId } = req.body;
      const posts = new Post({
        userId,
        text,
        image,
        likes,
        comments,
      });
      console.log(posts);
      return res.status(200).json({ success: true, message: 'create post successfully', posts });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const { postId } = req.body;
      const deletePost = await Post.findByIdAndDelete({ _id: postId });
      if (deletePost)
        return res.status(200).json({ success: true, message: ' delete Post successfully' });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

export default new PostController();
