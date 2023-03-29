import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User, { IUser } from '../Models/User';
import Post from '../Models/Post';
import Friend from '../Models/Friend';
import Like from '../Models/Like';
import Products from '../Models/Product';
import { AuthRequest } from '../middlewave/auth';

class AuthController {
  async home(req: AuthRequest, res: Response) {
    try {
      const user = await User.findById(req.userId).select('-password');
      if (!user) return res.status(400).json({ success: false, message: 'User not found' });

      return res.status(201).json({ success: true, message: 'Authenization successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async register(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'thieu TEN DANG NHAP hoac/va MAT KHAU',
      });
    }

    try {
      // check for exiting user
      // kiem tra xem co ton tai 1 username nao cung ten vs username cua ban khong
      const user = await User.findOne({ username });

      if (user) {
        return res.status(400).json({
          success: false,
          message: 'ten nguoi dung da ton tai',
        });
      }
      // tat ca deu ok thi hash mat khau
      // hash cung bat dong bo nen dung async
      // const hashedpassword = await argon2.hash(password)

      const salt = await bcrypt.genSalt(10);

      const hashedpassword = await bcrypt.hash(password, salt);

      const newUser: IUser = new User({
        username,
        password: hashedpassword,
        firstName: '',
        lastName: '',
        profilePicture: '',
        coverPhoto: '',
        bio: '',
        email: '',
        phone: '',
        location: {
          city: '',
          country: '',
          district: '',
        },
        dateOfBirth: null,
        gender: '',
      });
      // await newUser.save();

      return res.status(201).json({ success: true, message: 'Register successfully', newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
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
