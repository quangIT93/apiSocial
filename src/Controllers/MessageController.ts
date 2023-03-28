import { Request, Response } from 'express';

class MessageController {
  async getAllUserSend(req: Request, res: Response) {
    // lấy tin nhắn đầu tiên để thể hiện ra
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async getAllMessageUserSend(req: Request, res: Response) {
    // lấy tất cả cuộc trò chuyện của người dùng và bạn bè
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async deleteMessageIdUserIdSend(req: Request, res: Response) {
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async createMessageSenderId(req: Request, res: Response) {
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

export default new MessageController();
