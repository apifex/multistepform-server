import {NextFunction, Request, Response} from 'express';
import UserModel from '../models/user-model'

export const localAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findOne({_id: req.user}).exec()
    if (!user) return
    const token = user.generateJWT()
    res.status(200).json({
      status: "success",
      email: user.email,
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
      const user = await UserModel.findOne({_id: req.user}).exec()
      if (!user) return
      const token = user.generateJWT()
      
      res.status(200).json({
        status: "success",
        email: user.email,
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


 //test
export const protectedRoute = async (req: Request, res: Response) => {
    res.status(200).json({
      status: "success",
      data: {
        message: "Welcome in secret place",
      },
    });
  }