import {NextFunction, Request, Response} from 'express';
import {create, format, appendRow} from '../services/googlesheets'

export const createSpreadsheet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await create(req.user as string, req.body.name)
        res.status(200).send(response)
    }catch(error) {
        next(error)
    }
}

export const saveToSheet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await appendRow(req.user as string, req.body.spreadsheetid, req.body.data)
        res.status(200).send(response)
    }catch(error) {
        next(error)
    }
}

export const formatSheet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await format(req.user as string, req.body.spreadsheetid)
        res.status(200).send(response)
    }catch(error) {
        next(error)
    }
}