import mongoose, { Schema }from 'mongoose'



interface IProperties {
    [key: string]: string;
  }
  
interface IStyle {
    [key: string]: string
  }
  
interface IElement {
    element: string;
    text?: string;
    properties?: IProperties;
    style?: IStyle;
  }
  
export interface IForm {
    name: string;
    steps: IElement[][];
    style?: IStyle;
  }
  

interface IFormModelInterface extends mongoose.Model<any> {
    build(args: IForm): any
}

const FormSchema = new mongoose.Schema({
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
