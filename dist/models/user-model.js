"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.config();
const jwtPrivateSecret = process.env.JWT_PRIVATE_SECRET.replace(/\\n/g, '\n');
const UserSchema = new mongoose_1.default.Schema({
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
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.password || !this.isModified('password'))
            return next;
        this.password = yield bcrypt_1.default.hash(this.password, parseInt(process.env.HASH));
        next();
    });
});
UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject({ transform: (user, ret) => { delete ret.password; return ret; } });
    console.log('user object test', userObject);
    return userObject;
};
UserSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof this.password === 'string') {
            return yield bcrypt_1.default.compare(password, this.password);
        }
    });
};
UserSchema.methods.generateVerificationToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, jwtPrivateSecret, {
        expiresIn: "10d",
        algorithm: "RS256",
    });
};
UserSchema.statics.checkExistingField = (field, value) => __awaiter(void 0, void 0, void 0, function* () {
    const checkField = yield UserModel.findOne({ [`${field}`]: value });
    return checkField;
});
UserSchema.statics.build = (args) => {
    return new UserModel(args);
};
const UserModel = mongoose_1.default.model('User', UserSchema);
exports.default = UserModel;
//# sourceMappingURL=user-model.js.map