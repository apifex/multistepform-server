import express from 'express';
import FormActions from '../controllers/form-controler'
import {createSpreadsheet, saveToSheet, formatSheet} from '../controllers/sheets-controler'
import passport from '../services/passport/passport-jwt'

const formRouter = express.Router();

const authenticate = passport.authenticate('jwt', {session: false})


// interface IActions {
//     [key: string]: {
//         method: string,
//         url: string,
//         authenticate: any,
//         action: any
//     }
// }

// const actions: IActions = {
//     createForm: {
//         method: 'post',
//         url: '/createForm',
//         authenticate: authenticate,
//         action: FormActions.createForm
//     },
//     getForm: {
//         method: 'get',
//         url: '/getForm',
//         authenticate: authenticate,
//         action: FormActions.getForm
//     },
// }

// const createRouter = (actions: IActions) => {
//     console.log('creatign router')
//     const values = Object.values(actions)
//     const router = express.Router();
//     for (const {method, url, authenticate, action} of values) {
//         if (method === 'get') router.get(url, authenticate, action)
//         if (method === 'post') router.post(url, authenticate, action)
//     }
//     return router
// }

// createRouter(actions)

formRouter.post('/createForm', authenticate, FormActions.createForm)

formRouter.post('/createStep', authenticate, FormActions.createStep)

formRouter.post('/createElement', authenticate, FormActions.createElement)

formRouter.post('/editForm', authenticate, FormActions.editForm)

formRouter.post('/deleteForm', authenticate, FormActions.deleteForm)

formRouter.post('/editStep', authenticate, FormActions.editStepPosition)

formRouter.post('/deleteStep', authenticate, FormActions.deleteStep)

formRouter.post('/editElement', authenticate, FormActions.editElement)

formRouter.post('/deleteElement', authenticate, FormActions.deleteElement)

formRouter.get('/getForm', authenticate, FormActions.getForm)

formRouter.get('/getFullForm', authenticate, FormActions.getFullForm)

formRouter.get('/getAllSteps', authenticate, FormActions.getAllSteps)

formRouter.get('/getUserForms', authenticate, FormActions.getUserForms)

formRouter.get('/getStep', authenticate, FormActions.getStep)

formRouter.post('/createSpreadsheet', authenticate, createSpreadsheet)

formRouter.post('/saveToSheet', authenticate, saveToSheet)

formRouter.post('/formatSheet', authenticate, formatSheet)
  
export default formRouter;

