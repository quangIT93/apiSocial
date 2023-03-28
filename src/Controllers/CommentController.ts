import { Request, Response } from 'express';

import Comment from '../Models/Comment';
class CommentController {
  async getCommentPost(req: Request, res: Response) {
    try {
      const result = await Comment.find({});
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async deleleCommentPost(req: Request, res: Response) {
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async createCommentPost(req: Request, res: Response) {
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

export default new CommentController();
