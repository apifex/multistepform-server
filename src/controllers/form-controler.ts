import {NextFunction, Request, Response} from 'express';
import FormModel from '../models/form-model'
import StepModel from '../models/step-model'
import {create, format, appendRow} from '../services/googlesheets'

interface FormError extends Error {
    code: number
}

class FormError extends Error {
    constructor(message: string, code: number) {
        super(message)
        this.code = code
    }
}

class FormActions {

     errorHandler = async (next: NextFunction, promise: any) => {
        try {
            const result = await promise()
            return result
        } catch (error) {
            next(error)
        }
    }

    createForm = async (req: Request, res: Response, next: NextFunction) => {
        this.errorHandler(next, async () => {
                const checkName = await FormModel.findOne({name: req.body.name}).exec()
                if (checkName && checkName.owner == req.user) throw new FormError("This name already exists", 409)
                const form = await FormModel
                .build(req.body)
                form.addOwner(req.user)
                await form.save()
                return res.status(201).send(form)
            })    
    }

    createStep = async (req: Request, res: Response, next: NextFunction) => {
        this.errorHandler(next, async () => {
                const form = await FormModel.findOne({_id: req.query.formid}).exec()
                if(!form || form.owner != req.user) throw new FormError('No form with this id', 404)
                const step = new StepModel()
                step.addOwner(req.user as string)
                await step.save()
                form.addStep(step._id, req.body.position)
                console.log(req.body.position)
                console.log(typeof req.body.position)
                await form.save()
                return res.status(201).send(step)
            })
    }

    createElement = async (req: Request, res: Response, next: NextFunction) => {
        this.errorHandler(next, async () => {
                const step = await StepModel.findOne({_id: req.query.stepid}).exec()
                if (!step || step.owner != req.user) throw new FormError('No step with this id', 404)
                const position = req.body.position?req.body.position:step.elements.length
                step.elements.push({$each: [req.body.element], $position: position})
                await step.save()
                return res.status(201).send(step.elements)
            })
    }

    editForm = async (req: Request, res: Response, next: NextFunction) => {
        this.errorHandler(next, async () => {
                const form = await FormModel.findOne({_id: req.query.formid}).exec()
                if(!form || form.owner != req.user) return new FormError('No form with this id', 404)
                form.name = req.body.name
                await form.save()
                return res.status(200).send(form)
            })
    }

    editStepPosition = async (req: Request, res: Response, next: NextFunction) => {
        this.errorHandler(next, async () => {
                const form = await FormModel.findOne({_id: req.query.formid}).exec()
                if (!form || form.owner != req.user) throw new FormError('No form with this id', 404)
                form.editStepsPosition(req.query.stepid as string, req.body.position)
                await form.save()
                return res.status(200).send(form)
            })
    }

    editElement = async (req: Request, res: Response, next: NextFunction) => {
        this.errorHandler(next, async () => {
                const step = await StepModel.findOne({_id: req.query.stepid}).exec()
                if (!step  || step.owner != req.user) throw new FormError('No step with this id', 404)
                step.elements.pull({_id: req.query.elementid})
                step.elements.splice(req.body.position, 0, req.body.element)
                await step.save()
                return res.status(200).send(step.elements)
                
            })
    }

    deleteForm = async (req: Request, res: Response, next: NextFunction) => {
        this.errorHandler(next, async () => {
                await FormModel.deleteOne({_id: req.query.formid}).exec()
                return res.status(200).send('Form deleted')
            })  
    }

    deleteStep = async (req: Request, res: Response, next: NextFunction) => {
        this.errorHandler(next, async () => {
                const form = await FormModel.findOne({_id: req.query.formid}).exec()
                if (!form || form.owner != req.user) throw new FormError('No step with this id', 404)
                form.editStepsPosition(req.query.stepid as string)
                await form.save()
                await StepModel.deleteOne({_id: req.query.stepid}).exec()
                return res.status(200).send(form)
            }) 
    }

    deleteElement = async (req: Request, res: Response, next: NextFunction) => {
        this.errorHandler(next, async () => {
                const step = await StepModel.findOne({_id: req.query.stepid}).exec()
                if (!step  || step.owner != req.user) throw new FormError('No step with this id', 404)
                if (!step.elements.find(el=>el._id == req.query.elementid)) throw new FormError('No elments with this id', 404)
                step.elements.pull({_id: req.query.elementid})
                await step.save()
                return res.status(200).send(step.elements)
            }) 
    }

    getForm = async (req: Request, res: Response, next: NextFunction) => {
        this.errorHandler(next, async () => {
                const form = await FormModel
                    .findById(req.query.formid).exec()
                if (!form  || form.owner != req.user) throw new Error("no form with this id")
                return res.status(200).send(form)
            }) 
    }
    
    getFullForm = async (req: Request, res: Response, next: NextFunction) => {
        this.errorHandler(next, async () => {
                const form = await FormModel
                    .findById(req.query.formid).exec()
                if (!form  || form.owner != req.user) throw new FormError('No form with this id', 404)
                const steps: any = []
                const promisses = form.steps.map((step)=> StepModel.findById(step).exec())
                const resolved = await Promise.all(promisses)
                    resolved.forEach(step=> steps.push(step))
                return res.status(200).send({
                    steps: steps,
                    createdOn: form.createdOn,
                    _id: form._id,
                    name: form.name,
                    owner: form.owner,
                    __v: form.__v
                })
            }) 
    }

    
    getAllSteps = async (req: Request, res: Response, next: NextFunction) => {
        this.errorHandler(next, async () => {
                const form = await FormModel
                    .findById(req.query.formid).exec()
                if (!form  || form.owner != req.user) throw new FormError('No form with this id', 404)
                const steps: any = []
                const promisses = form.steps.map((step)=> StepModel.findById(step).exec())
                const resolved = await Promise.all(promisses)
                    resolved.forEach(step=> steps.push(step))
                return res.status(200).send(steps)
            }) 
    }

    getStep = async (req: Request, res: Response, next: NextFunction) => {
        this.errorHandler(next, async () => {
                const step = await StepModel
                    .findById(req.query.stepid).exec()
                if (!step  || step.owner != req.user) throw new FormError('No step with this id', 404)
                return res.status(200).send(step)
            }) 
    }
    
    getUserForms = async (req: Request, res: Response, next: NextFunction) => {
        this.errorHandler(next, async () => {
                const forms = await FormModel
                    .find({owner: req.user}).exec()
                if (!forms) throw new FormError('No form found', 404)
                return res.status(200).send(forms)
            })  
    }

    publishForm = async (req: Request, res: Response, next: NextFunction) => {
        this.errorHandler(next, async () => {
            const form = await FormModel
                    .findById(req.query.formid).exec()
                if (!form || form.owner != req.user) throw new FormError('No form with this id', 404)
            const clientToken = form.generateJWT()
            const createSheet = await create(req.user as string, form.name)
            if (!createSheet?.spreadsheetUrl || !createSheet?.spreedsheetId) throw new FormError('Error when creating google Sheet', 500)
            const formatSheet = await format(req.user as string, createSheet.spreedsheetId)
            console.log('formatsheet', formatSheet)
            await appendRow(req.user as string, createSheet.spreedsheetId, ['hellos'])
            form.sheetUrl = createSheet.spreadsheetUrl
            form.sheetId = createSheet.spreedsheetId
            form.status = 'published'
            const publishedForm = await form.save()
            return res.status(200).send(
                {
                    form: form.name,
                    clientToken: clientToken,
                    status: publishedForm.status,
                    googleSheetsUrl: createSheet?.spreadsheetUrl
                }
            )
        })
    }

    closeForm = async (req: Request, res: Response, next: NextFunction) => {
        this.errorHandler(next, async () => {
            const form = await FormModel
                    .findById(req.query.formid).exec()
                if (!form || form.owner != req.user) throw new FormError('No form with this id', 404)
            form.status = 'closed'
            const closed = await form.save()
            return res.status(200).send(closed.status)
        })
    }

    loadForm = async (req: Request, res: Response, next: NextFunction) => {
        this.errorHandler(next, async () => {
                const form = await FormModel
                    .findById(req.query.formid).exec()
                if (!form  || form._id != req.user) throw new FormError('No form with this id', 404)
                const steps: any = []
                const promisses = form.steps.map((step)=> StepModel.findById(step).exec())
                const resolved = await Promise.all(promisses)
                    resolved.forEach(step=> steps.push(step))
                return res.status(200).send({
                    name: form.name,
                    steps: steps,
                    _id: form._id,
                })
            }) 
    }
}

export default new FormActions()

