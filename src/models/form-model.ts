import { Document, Types, Schema, model, Model }from 'mongoose'
  
export interface IForm {
    name: string;
    steps: [string];
    owner: string;
    createdOn: Date
  }

interface IFormDocument extends IForm, Document {
    addOwner(): void,
    addStep(stepId: string, position?: number): void,
    editStepsPosition(stepId: string, position: number): void,
} 

interface IFormModel extends Model<IFormDocument> {
    build(args: IForm): any
}
const FormSchema = new Schema<IFormDocument, IFormModel>({
    name: {
      type: String,
      required: true
    },
    steps: {
      type: Array,
      default: [],
    },
    owner: {
      type: String,
    },
    createdOn: {
      type: Date,
      default: Date.now()
  },
})

FormSchema.methods.addOwner = function (owner: string) {
    this.owner = owner
  }

FormSchema.methods.addStep = function (stepId: string, position: number = 0) {
  this.steps.splice(position, 0, stepId)
}

FormSchema.methods.editStepsPosition = function(stepId: string, newPosition: number) {
  this.steps.filter(el=>el!=stepId)
  this.steps.splice(newPosition, 0, stepId)
}

FormSchema.statics.build = (args: IForm) => {
    return new FormModel(args)
  }

const FormModel = model<IFormDocument, IFormModel>('Form', FormSchema)

export default FormModel
