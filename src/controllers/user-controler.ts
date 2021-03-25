import {NextFunction, Request, Response} from 'express';
import UserModel from '../models/user-model'

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
   
        res.status(200).send('signUp')
}

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
   
    res.status(200).send('signIn')
}
