import mongoose from 'mongoose'


interface IUser {
    name: string,
    email: string,
    password: string,
    createdOn: Date,
    lastActive: Date,
}

interface IUserModelInterface extends mongoose.Model<any> {
    build(args: IUser): any
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    lastActive: {
        type: Date,
        default: Date.now()
    }
})

const UserModel = mongoose.model<any, IUserModelInterface>('User', UserSchema);

export default UserModel
