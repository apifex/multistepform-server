import { Document, Types, Schema, model, Model }from 'mongoose'


interface IProperties {
    [key: string]: string;
  }

export interface IElement extends Types.EmbeddedDocument{
    element: string;
    label?: string;
    options?: string[];
    styles?: {};
    placeholder?: string;
    properties?: IProperties;
  }

export interface IStep {
  elements: Types.DocumentArray<IElement>,
  owner: string
  }

interface IStepDocument extends IStep, Document {
    addOwner(owner: string): void
} 

interface IStepModel extends Model<IStepDocument> {
    build(args: IStep): any
}

const ElementSchema = new Schema({
  element: {
    type: String,
    required: true,
  },
  label: {type: String},
  styles: {type: Schema.Types.Mixed},
  options: [Schema.Types.Mixed],
  placeholder: {type: String},
  properties: {type: Schema.Types.Mixed}
})

const StepSchema = new Schema<IStepDocument, IStepModel>({
  elements: [{type: ElementSchema, default: []}],
  owner: {type: String}
})


StepSchema.methods.addOwner = function (owner) {21
    this.owner = owner
  }

StepSchema.statics.build = (args: IStep) => {
    return new StepModel(args)
  }

const StepModel = model<IStepDocument, IStepModel>('Step', StepSchema)

export default StepModel
