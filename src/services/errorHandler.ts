import {NextFunction, Request, Response} from 'express';

export const formErrorsHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({error: err.message})
}

export const userErrorsHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({error: err.message})
}
