import { Request, Response } from 'express';
import Friend from '../Models/Friend';
import User from '../Models/User';

const { ObjectId } = require('mongodb');

import { AuthRequest } from '../middlewave/auth';

class FriendController {
  async getAllFriend(req: AuthRequest, res: Response) {
    try {
      const allFriend = await Friend.find({});
      res.status(200).json({ success: true, message: 'get all friend successfully', allFriend });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async getallInfoFriend(req: AuthRequest, res: Response) {
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async getAllFriendOfUser(req: AuthRequest, res: Response) {
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
            from: 'users',
            let: { userIds: ['$userId', '$friendId'] },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$_id', '$$userIds'],
                  },
                },
              },
            ],
            as: 'friends',
          },
        },
        {
          $unwind: '$friends',
        },
        {
          $group: {
            _id: {
              $cond: {
                if: { $eq: ['$userId', new ObjectId(req.userId)] },
                then: '$friendId',
                else: '$userId',
              },
            },
            friends: { $addToSet: '$friends' },
          },
        },
        {
          $replaceRoot: { newRoot: { $arrayElemAt: ['$friends', 1] } },
        },
      ]);
      res.status(200).json({ success: true, message: 'get all friend successfully', result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

export default new FriendController();
