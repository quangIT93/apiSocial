import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export interface AuthRequest extends Request {
  userId?: string;
}

interface DecodedToken {
  userId: string;
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ success: false, message: 'Không tìm thấy token' });

  try {
    // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      return res
        .status(500)
        .json({ success: false, message: 'Server error: ACCESS_TOKEN_SECRET is not defined.' });
    }

    //  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as DecodedToken;
    const decoded = jwt.verify(token, secret) as DecodedToken;
    console.log(decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Token không hợp lệ' });
  }
};

export default verifyToken;
