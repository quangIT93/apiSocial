import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../Models/User';
import Post from '../Models/Post';
import Friend from '../Models/Friend';
import Like from '../Models/Like';
import Products from '../Models/Product';
import { AuthRequest } from '../middlewave/auth';

class AuthController {
  async home(req: AuthRequest, res: Response) {
    try {
      const user = await User.findById(req.userId).select('-password');

      // Lấy danh sách bạn bè của người dùng
      const friends = await Friend.find({
        $or: [{ userId: req.userId }, { friendId: req.userId }],
        status: 'accepted',
      }).populate('userId friendId', '-password');

      // Lấy tất cả các bài post
      const posts1 = await Post.find();

      // Sử dụng truy vấn aggregate để lấy tất cả các bài đăng của người dùng và các bạn bè của họ
      const posts2 = await Post.aggregate([
        // Lookup để lấy thông tin user của từng bài post
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$user' },

        // Lookup để lấy danh sách bạn bè của người dùng
        {
          $lookup: {
            from: 'friends',
            let: { userId: '$userId' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$userId', '$$userId'] }, { $eq: ['$status', 'accepted'] }],
                  },
                },
              },
              { $project: { userId: 1, friendId: 1 } },
            ],
            as: 'friends',
          },
        },
        // Unwind friends để có được một mảng các friendId
        // { $unwind: '$friends' },
        // Group lại để thu thập tất cả các friendId thành một mảng
        // {
        //   $group: {
        //     _id: '$_id',
        //     userId: { $first: '$userId' },
        //     friends: { $push: '$friends.friendId' },
        //     createdAt: { $first: '$createdAt' },
        //     text: { $first: '$text' },
        //   },
        // },
        // Tìm tất cả các bài đăng của người dùng và bạn bè, sắp xếp theo thời gian mới nhất đến cũ nhất
        // {
        //   $match: {
        //     $or: [
        //       { userId: req.userId }, // Các bài đăng của người dùng
        //       {
        //         userId: {
        //           $in: { $map: { input: '$friends._id', as: 'friendId', in: '$$friendId' } },
        //         },
        //       }, // Các bài đăng của các bạn bè
        //     ],
        //   },
        // },
        // { $sort: { createdAt: -1 } }, // Sắp xếp theo thời gian mới nhất đến cũ nhất
      ]);

      console.log(posts2.length);
      // Lấy số lượt like
      const likes = await Like.find();

      if (!user) return res.status(400).json({ success: false, message: 'User not found' });
      return res.status(200).json({
        success: true,
        mesage: 'get homepage successfully',
        // user,
        // posts1,
        // posts2,
        friends,
        // likes,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      // Check if user with email already exists
      const user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      const newUser = new User({
        username,
        password,
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      // Save user to database
      const savedUser = await newUser.save();

      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }
      // Generate JWT token
      const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      console.log(username);
      // Check if user with email exists

      const user = await User.findOne({ username });
      console.log(user);
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET
        // {expiresIn: '1h'}
      );

      return res.status(200).json({ success: true, message: 'đăng nhập thành công!', token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server error', error });
    }
  }
}

export default new AuthController();
