import {NextFunction, Request, Response} from 'express';
import FormModel from '../models/form-model'

export const createForm = async (req: Request, res: Response, next: NextFunction) => {
    const form = await FormModel.build(req.body).save().catch((err: Error)=>next(err))
        res.status(200).send(form)
}

export const getForm = async (req: Request, res: Response, next: NextFunction) => {
    const form = await FormModel.findOne({name: req.query.name}).exec().catch((err: Error)=>next(err))
    form?res.status(200).send(form):res.status(200).send('Form not found')
}

export const updateForm = async (req: Request, res: Response, next: NextFunction) => {
    const form = await FormModel.findOne({name: req.query.name}).exec().catch((err: Error)=>next(err))
    form.set(req.body)
    const updatedForm = await form.save().catch((err: Error)=>next(err))
        res.status(200).send(updatedForm)
    
}

export const deleteForm = async (req: Request, res: Response, next: NextFunction) => {
    const form = await FormModel.findOne({name: req.query.name}).exec().catch((err: Error)=>next(err))
    const removedForm = await form.remove().catch((err: Error)=>next(err))
        res.status(200).send(removedForm)
}


