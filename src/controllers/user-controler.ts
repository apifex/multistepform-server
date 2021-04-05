import {NextFunction, Request, Response} from 'express';
import UserModel from '../models/user-model'

export const editUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //TODO 
  } catch(err) {
    res.status(500).json({
      status: 'error',
      error: {
        message: err.message,
      },
    });
  }
} 

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findOneAndDelete({email: req.body.email}).exec()
    console.log(user)

  } catch(err) {
    res.status(500).json({
      status: 'error',
      error: {
        message: err.message,
      },
    });
  }
} 


export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findOne({email: req.body.email}).exec()
    res.status(200).json({user: user})

  } catch(err) {
    res.status(500).json({
      status: 'error',
      error: {
        message: err.message,
      },
    });
  }
} 



export const addGoogleSheets = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //TODO 
    } catch(err) {
      res.status(500).json({
        status: 'error',
        error: {
          message: err.message,
        },
      });
    }
  } 


