import {NextFunction, Request, Response} from 'express';
import FormModel from '../models/form-model'

export const createForm = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const form = await FormModel
        .build(req.body)
        form.addOwner(req.user)
        await form.save()
    return res.status(200).send({Form: form})
    } catch(error) {
        next(error)
    }  
}

export const createStep = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const form = await FormModel
        .findOne({_id: req.query.formid}).exec()
    if (!form) throw Error('no form with this id')
        form.steps.splice(req.body.stepPosition, 0, req.body.step)
        await form.save()
    return res.status(200).send({Step: form.steps[req.body.stepPosition]})
    } catch (error) {
        next(error)
    }    
}

export const createElement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const form = await FormModel
            .findOne({'steps._id': req.query.stepid}).exec()
            if (!form) throw new Error('no form with this id')
        const step =  form.steps.id(req.query.stepid)
            if (!step) throw new Error('no step with this id')
            step.elements.splice(req.body.elementPosition, 0 , req.body.element)
            await form.save()
    return res.status(200).send({Element: step.elements[req.body.elementPosition]})
    } catch (error) {
        next(error)
    }
}

export const editForm = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const form = await FormModel.findOneAndUpdate(
            {_id: req.query.formid}, 
            req.body,
            {new: true}).exec()
    return res.status(200).send({UpdatedForm: form})
    } catch(error) {
        next(error)
    }  
}

export const editStep = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const form = await FormModel
        .findOne({_id: req.query.formid}).exec()
    if (!form) throw Error('no form with this id')
        let step = form.id(req.query.stepid)
        step = req.body.step
    if (!step) throw Error('no step with this id')
        await form.save()
    return res.status(200).send({Step: form.steps.id(req.query.stepid)})
    } catch (error) {
        next(error)
    }    
}

export const editElement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const form = await FormModel
            .findOne({'steps._id': req.query.stepid}).exec()
            if (!form) throw new Error('no form with this id')
        const step =  form.steps.id(req.query.stepid)
            if (!step) throw new Error('no step with this id')
        let element = step.elements.find((el)=>el._id === req.query.elementid)
            element = req.body.element
            await form.save()
    return res.status(200).send({Element: step.elements.id(req.query.elementid)})
    } catch (error) {
        next(error)
    }
}






