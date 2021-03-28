import { config } from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'



config()

interface IUser {
    userName: string,
    email: string,
    hash?: string,
    salt?: string,
    googleId?: string,
    createdOn?: Date,
    lastActive?: Date,
    forms?: string[]
}

interface IUserDocument extends IUser, mongoose.Document {
    generateJWT(): string,
    validatePassword(password: string): Promise<boolean>,
    toAuthJSON(): Promise<IUser>
} 

interface IUserModel extends mongoose.Model<IUserDocument> {
    checkExistingField(field: string, value: string): Promise<IUserDocument | null>,
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
        unique: true},
    googleId: {
        type: String,
        required: false,
        unique: true},
    hash: {type: String},
    salt: {type: String},
    createdOn: {
        type: Date,
        default: Date.now()
    },
    lastActive: {
        type: Date,
        default: Date.now()
    },
    forms: {
        type: Array,
        default: [],
    }
})

UserSchema.pre('save', async function (next) {
    if (!this.hash || !this.isModified('local.hash')) return next;
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
        .pbkdf2Sync(this.hash, this.salt, 128, 128, "sha512")
        .toString("hex");
    
    next()
})

UserSchema.methods.validatePassword = async function (password) {
    if (!this.salt || !this.hash) return
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 128, 128, "sha512")
        .toString("hex");
    return this.hash === hash
}

UserSchema.methods.generateJWT = function () {
return jwt.sign(
    { _id: this._id }, 
    jwtPrivateSecret, 
    { expiresIn: "10d",
    algorithm: "RS256", }
)};

UserSchema.methods.toAuthJSON = function (token) {
    return {
        _id: this._id,
        userName: this.userName,
        googleId: this.googleId,
        email: this.email,
        token: token,
    }
}

UserSchema.statics.checkExistingField = async (field, value) => {
    const checkField = await UserModel.findOne({ [`${field}`]: value });
    return checkField;
};

UserSchema.statics.build = (args: IUser) => {
    return new UserModel(args)
}

const UserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

export default UserModel
