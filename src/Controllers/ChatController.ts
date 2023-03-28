import { Request, Response } from 'express';

class ChatController {
  async getAllUserSend(req: Request, res: Response) {
    // lấy tất cả người đã gửi tin nhắn cho user
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async getAllMessageOfChatId(req: Request, res: Response) {
    // lấy tất cả tin nhắn của cuộc trò chuyện
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async deleteMessageOfChatId(req: Request, res: Response) {
    // xoá 1 tin nhắn của cuộc thoại thoại
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async createMessageOfChatId(req: Request, res: Response) {
    // tạo tin nhắn của cuộc trò chuyện
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async deleteChatId(req: Request, res: Response) {
    // xoá tất cả tin nhắn của chatId cả trong messageId
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

export default new ChatController();
