import mongoose, { Schema }from 'mongoose'

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
  
interface IStyle {
    [key: string]: string
  }
//TO DO update types!!
interface IElement {
    id: string,
    element: string;
    description?: string;
    options?: string[];
    text?: string;
    properties?: IProperties;
    style?: IStyle;
  }
  
export interface IForm {
    userId: string;
    name: string;
    steps: IElement[];
    style?: IStyle;
  }
  
interface IFormModelInterface extends mongoose.Model<any> {
    build(args: IForm): any
}

const FormSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true
    },
    name: {
        type: String,
        required: true
    },
    steps: {
        type: Schema.Types.Mixed,
        required: true
    },
    style: {
        type: Schema.Types.Mixed,
        required: false,
    },
})

FormSchema.statics.build = (args: IForm) => {
    return new FormModel(args)
}

const FormModel = mongoose.model<any, IFormModelInterface>('Form', FormSchema)

export default FormModel
