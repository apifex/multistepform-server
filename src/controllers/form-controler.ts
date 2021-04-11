import {NextFunction, Request, Response} from 'express';
import FormModel from '../models/form-model'
import StepModel from '../models/step-model'


export const createForm = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const form = await FormModel
        .build(req.body)
        form.addOwner(req.user)
        const savedForm = await form.save()
    return res.status(200).send(savedForm)
    } catch(error) {
        next(error)
    }  
}

export const createStep = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const form = await FormModel.findOne({_id: req.query.formid}).exec()
        if(!form || form.owner != req.user) throw new Error ('No form with this id')
        const step = new StepModel()
        step.addOwner(req.user as string)
        await step.save()
        form.addStep(step._id, req.body.position)
        await form.save()
    return res.status(200).send(step)
    } catch(error) {
        next(error)
    }  
}

export const createElement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const step = await StepModel
            .findOne({_id: req.query.stepid}).exec()
            if (!step || step.owner != req.user) throw new Error('no step with this id')
            step.elements.push({$each: [req.body.element], $position: req.body.position})
        const savedStep = await step.save()
    return res.status(200).send(savedStep.elements[req.body.position])
    } catch (error) {
        next(error)
    }
}

export const editForm = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const form = await FormModel.findOne({_id: req.query.formid}).exec()
        if(!form || form.owner != req.user) return new Error ('No form with this id')
            form.name = req.body.name
        const updatedForm = await form.save()
    return res.status(200).send(updatedForm)
    } catch(error) {
        next(error)
    }  
}

export const deleteForm = async (req: Request, res: Response, next: NextFunction) => {
    try{
    await FormModel.deleteOne({_id: req.query.formid}).exec()
    return res.status(200).send('Form deleted')
    } catch(error) {
        next(error)
    }  
}



export const editStepPosition = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const form = await FormModel.findOne({_id: req.query.formid}).exec()
    if (!form || form.owner != req.user) throw Error('no step with this id')
        form.editStepsPosition(req.body.stepid, req.body.position)
        const updatedForm = await form.save()
    return res.status(200).send({Form: updatedForm})
    } catch (error) {
        next(error)
    }    
}

export const deleteStep = async (req: Request, res: Response, next: NextFunction) => {
    try{
    const form = await FormModel.findOne({_id: req.query.formid}).exec()
    if (!form || form.owner != req.user) throw Error('no step with this id')
        form.deleteStep(req.query.stepid as string)
        const updatedForm = await form.save()
    await StepModel.deleteOne({_id: req.query.stepid}).exec()
    return res.status(200).send({Form: updatedForm})
    } catch(error) {
        next(error)
    }  
}

export const editElement = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const step = await StepModel.findOne({_id: req.query.stepid}).exec()
        if (!step) throw new Error('no form with this id')
    step.elements.pull({_id: req.query.elementid})
    step.elements.splice(req.body.position, 0, req.body.element)
    const updatedElement = await step.save()
    return res.status(200).send({Element: updatedElement.elements.id(req.query.elementid)})
    } catch (error) {
        next(error)
    }
}

export const deleteElement = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const step = await StepModel.findOne({_id: req.query.stepid}).exec()
        if (!step) throw new Error('no form with this id')
    step.elements.pull({_id: req.query.elementid})
    const updatedElement = await step.save()
    return res.status(200).send("Element deleted")
    } catch (error) {
        next(error)
    }
}

export const getForm = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const form = await FormModel
        .findById(req.query.formid).exec()
    if (!form) throw new Error("no form with this id")
    return res.status(200).send(
            {[`Form ${req.query.formid}`]: form})
    } catch(error) {
        next(error)
    }  
}

export const getStep = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const step = await StepModel
        .findById(req.query.stepid).exec()
    if (!step) throw new Error("no step with this id")
    return res.status(200).send(
            {[`Step ${req.query.stepid}`]: step})
    } catch(error) {
        next(error)
    }  
}

export const getFormList = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const forms = await FormModel
        .find({owner: req.user}).exec()
    if (!forms) throw new Error("no forms found")
    return res.status(200).send(
            {Forms: forms})
    } catch(error) {
        next(error)
    }  
}

