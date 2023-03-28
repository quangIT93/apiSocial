import { Request, Response } from 'express';

class ProductController {
  async getAllProductOfStore(req: Request, res: Response) {
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async getAllProduct(req: Request, res: Response) {
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async deleteProductOfStore(req: Request, res: Response) {
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async addProductOfStore(req: Request, res: Response) {
    try {
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

export default new ProductController();
