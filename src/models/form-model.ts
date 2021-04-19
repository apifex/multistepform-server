import { Document, Types, Schema, model, Model }from 'mongoose'
import jwt from 'jsonwebtoken'
  
export interface IForm {
    name: string;
    steps: [string];
    owner: string;
    status?: string;
    clientToken?: string;
    sheetUrl?: string;
    sheetId?: string;
    createdOn: Date
  }

interface IFormDocument extends IForm, Document {
    addOwner(): void,
    addStep(stepId: string, position?: number): void,
    editStepsPosition(stepId: string, position?: number): void,
    generateJWT(): string,
} 

interface IFormModel extends Model<IFormDocument> {
    build(args: IForm): any
}

const jwtPrivateSecret = process.env.JWT_PRIVATE_SECRET.replace(/\\n/g, "\n")

const FormSchema = new Schema<IFormDocument, IFormModel>({
    name: {
      type: String,
      required: true,
    },
    steps: {
      type: Array,
      default: [],
    },
    owner: {
      type: String,
    },
    clientToken: {
      type: String, // token for client script
    },
    status: {
      type: String, //created/ published/ closed
    },
    sheetUrl: {
      type: String,
      default: ''
    },
    sheetId: {
      type: String,
      default: ''
    },
    createdOn: {
      type: Date,
      default: Date.now()
  },
})

FormSchema.methods.addOwner = function (owner: string) {
    this.owner = owner
  }

FormSchema.methods.addStep = function (stepId: string, position?: number) {
  if (!position) position = this.steps.length
  if (position == 0) position = 0
  this.steps.splice(position, 0, stepId)
}

FormSchema.methods.editStepsPosition = function(stepId: string, newPosition: number) {
  const stepIndex = this.steps.findIndex(step => step==stepId)
  if (stepIndex === -1) return
  this.steps.splice(stepIndex, 1)
  if (newPosition || newPosition == 0) this.steps.splice(newPosition, 0, stepId)
}

FormSchema.methods.generateJWT = function () {
  const token = jwt.sign(
      { _id: this.owner }, 
      jwtPrivateSecret, 
      {algorithm: "RS256"})
  this.clientToken = token
  return token
  };

FormSchema.statics.build = (args: IForm) => {
    return new FormModel(args)
  }

const FormModel = model<IFormDocument, IFormModel>('Form', FormSchema)

export default FormModel
