import {NextFunction, Request, Response} from 'express';
import UserModel from '../models/user-model'

export const localAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = req.user
    if (!user) return
    const token = user.generateJWT()
    res.status(200).json({
      status: "success",
      token})
  } catch(err) {
    res.status(500).json({
      status: 'error',
      error: {
        message: err.message,
      },
    });
  }
} 

export const googleAuth =  async (req: Request, res: Response) => {
    try {
      const user: any = req.user
      if (!user) return
      const token = user.generateJWT()
      res.status(200).json({
        status: "success",
        token})
    } catch (err) {
      res.status(500).json({
        status: 'error',
        error: {
          message: err.message,
        },
      });
    }
  }

export const protectedRoute = async (req: Request, res: Response) => {
    res.status(200).json({
      status: "success",
      data: {
        message: "Welcome in secret place",
      },
    });
  }