import {NextFunction, Request, Response} from 'express';
import UserModel from '../models/user-model'

// const createCookieFromToken = (user: any, statusCode: number, req: Request, res: Response) => {
//   const token = user.generateJWT();
//   const cookieOptions = {
//     expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
//     httpOnly: false,
//     secure: req.secure || req.headers["x-forwarded-proto"] === "http",
//     sameSite: 'lax'
//   };
  
//   res.cookie("msfToken", token)
//   res.status(statusCode).json({
//     status: "success",
//     token,
//     data: {
//       user,
//     },
//   });
// };

export const localAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = req.user
    console.log('user in local auth', user)
    if (!user) return
    const token = user.generateJWT()
    const userToJson = user.toAuthJSON(token)
    res.status(200).json({
      status: "success",
      token,
      data: userToJson})
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
      const userToJson = user.toAuthJSON(token)
      res.status(200).json({
        status: "success",
        token,
        data: userToJson})
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