import mongoose, { Schema }from 'mongoose'

interface IProperties {
    [key: string]: string;
}
  
interface IForm {
    formID: string,
    element: string,
    text: string,
    properties: IProperties,
}

interface IFormModelInterface extends mongoose.Model<any> {
    build(args: IForm): any
}

const FormSchema = new mongoose.Schema({
    formID: {
        type: String,
        required: true
    },
    element: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false,
    },
    properties: {
        type: Schema.Types.Mixed,
        required: false,
    }
})

FormSchema.statics.build = (args: IForm) => {
    return new FormModel(args)
}

const FormModel = mongoose.model<any, IFormModelInterface>('Form', FormSchema)

export default FormModel
