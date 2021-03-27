import { config } from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

config()

interface IUser {
    userName: string,
    email: string,
    password?: string,
    createdOn?: Date,
    lastActive?: Date,
}

interface IUserDocument extends IUser, mongoose.Document {
    generateVerificationToken(): string,
    comparePassword(password: string): Promise<boolean>,
    
} 

interface IUserModel extends mongoose.Model<IUserDocument> {
    checkExistingField(field: string, value: string): Promise<boolean>,
    build(args: IUser): any
}



const jwtPrivateSecret = process.env.JWT_PRIVATE_SECRET.replace(/\\n/g, "\n")

const UserSchema = new mongoose.Schema<IUserDocument, IUserModel>({
    userName: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,   
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
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



UserSchema.pre('save', async function (next) {
    if (!this.password || !this.isModified('password')) return next;

    this.password = await bcrypt.hash(
        this.password,
        parseInt(process.env.HASH)
    );
    next()
})

UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject({ transform: (user, ret) => { delete ret.password; return ret; }})
    return userObject
}

UserSchema.methods.comparePassword = async function (password) {
    if (typeof this.password === 'string') {
    return await bcrypt.compare(password, this.password)}
  };

UserSchema.methods.generateVerificationToken = function () {
return jwt.sign({ id: this._id }, jwtPrivateSecret, {
    expiresIn: "10d",
    algorithm: "RS256",
});
};

UserSchema.statics.checkExistingField = async (field, value) => {
    const checkField = await UserModel.findOne({ [`${field}`]: value });
    return checkField;
};

UserSchema.statics.build = (args: IUser) => {
    return new UserModel(args)
}

const UserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

export default UserModel
