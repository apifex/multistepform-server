import { config } from 'dotenv'
import {google} from 'googleapis'
import UserModel from '../models/user-model'

config()

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;
const oauth2client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL)


const authorize = async (userId: string) => {
    const user = await UserModel.findOne({_id: userId})
    if (!user) return
    if (!user.googleTokens) throw new Error ('No google tokens. Need to connect with google')
    oauth2client.setCredentials(user.googleTokens)
    return google.sheets({version: 'v4', auth: oauth2client})
    }

export const create = async (userId: string, formName: string) => {
        const sheets = await authorize(userId)
        if (!sheets) return
        const spreadsheet = await sheets.spreadsheets.create({requestBody: {
        properties: {
            title: formName, 
        }}})
        const response = {
            spreedsheetId: spreadsheet.data.spreadsheetId,
            spreadsheetUrl: spreadsheet.data.spreadsheetUrl
        }
        return response
    }

export const appendRow = async (userId: string, spreadsheetId: string, data: string[]) => {
        const sheets = await authorize(userId)
        if (!sheets) return
        const response = await sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        valueInputOption: 'RAW',
        range: 'A1:Z1000',
        requestBody: {
            values: [data]
        }
        })
        return response
    }

export const format = async (userId: string, spreadsheetId: string) => {
    const sheets = await authorize(userId)
    if (!sheets) return
    await sheets.spreadsheets.batchUpdate(
        {
            spreadsheetId: spreadsheetId,
            requestBody: {
                requests: [
                    {
                        "repeatCell": {
                          "range": {
                            "sheetId": 0,
                            "startRowIndex": 0,
                            "endRowIndex": 1
                          },
                          "cell": {
                            "userEnteredFormat": {
                              "backgroundColor": {
                                "red": 1.0,
                                "green": 0.8,
                                "blue": 1.0
                              },
                              "horizontalAlignment" : "CENTER",
                              "textFormat": {
                                "foregroundColor": {
                                  "red": 0.0,
                                  "green": 0.0,
                                  "blue": 0.7
                                },
                                
                                "bold": true
                              }
                            }
                          },
                          "fields": "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)"
                        }
                      },
                    {
                        "updateSheetProperties": {
                            "properties": {
                                "sheetId": 0,
                                "gridProperties": {
                                    "frozenRowCount": 1
                                },
                            },
                            "fields": 'gridProperties.frozenRowCount'
                        }
                    }
                ]
            }
        }
    )
}
    
    



