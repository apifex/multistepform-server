import {NextFunction, Request, Response} from 'express';
interface IFormError extends Error {
    code: number
}
export const formErrorsHandler = (err: IFormError, req: Request, res: Response, next: NextFunction) => {
    
    return res.status(err.code?err.code:400).send({error: err.message})
}

