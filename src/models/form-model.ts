import mongoose, { Document, Types, Schema }from 'mongoose'

//form sample

const From = {
  name: 'Form123',
  steps: [
    {
      id: '11',
      elements: [{element: 'input', type: 'text', label: 'Imię'}, 
                 {element: 'input', type: 'checkbox', label: "Lubisz spać?"},  
                ]
    },
    {
      id: '12',
      elements: [{element: 'input', type: 'text'}, 
                 {element: 'input', type: 'checkbox'}, 
                 {element: 'input', type: 'password'} 
                ]
    }
  ]
}

interface IProperties {
    [key: string]: string;
  }

interface IElement extends Types.EmbeddedDocument{
    element: string;
    label?: string;
    options?: string[];
    placeholder?: string;
    properties?: IProperties;
  }

interface IStep extends Types.EmbeddedDocument{
  elements: Types.DocumentArray<IElement>
  }
  
export interface IForm {
    name: string;
    steps: Types.DocumentArray<IStep>;
    owner: string;
    createdOn: Date
  }


interface IFormDocument extends IForm, mongoose.Document {
    addOwner(): void
} 

interface IFormModel extends mongoose.Model<IFormDocument> {
    build(args: IForm): any
}



const ElementSchema = new mongoose.Schema({
  element: {
    type: String,
    required: true,
  },
  label: {type: String},
  options: [Schema.Types.Mixed],
  placeholder: {type: String},
  properties: {type: Schema.Types.Mixed}
})

const StepSchema = new mongoose.Schema({
  elements: [ElementSchema]
})

const FormSchema = new mongoose.Schema<IFormDocument, IFormModel>({
    name: {
        type: String,
        required: true
    },
    steps: [StepSchema],
    owner: {
      type: String,
    },
    createdOn: {
      type: Date,
      default: Date.now()
  },
})

FormSchema.methods.addOwner = function (owner) {
    this.owner = owner
  }

FormSchema.statics.build = (args: IForm) => {
    return new FormModel(args)
  }

const FormModel = mongoose.model<IFormDocument, IFormModel>('Form', FormSchema)

export default FormModel
