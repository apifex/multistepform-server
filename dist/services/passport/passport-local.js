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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const user_model_1 = __importDefault(require("../../models/user-model"));
const authFields = {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
};
passport_1.default.use("login", new passport_local_1.Strategy(authFields, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: email });
        if (!user || !user.validatePassword(password)) {
            return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
})));
passport_1.default.use("signup", new passport_local_1.Strategy(authFields, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkEmail = yield user_model_1.default.checkExistingField('email', email);
        if (checkEmail) {
            throw new Error('Email already registered, log in instead');
        }
        const checkUserName = yield user_model_1.default.checkExistingField('userName', req.body.userName);
        if (checkUserName) {
            throw new Error('Username exists, please try another');
        }
        const newUser = yield user_model_1.default
            .build({ userName: req.body.userName,
            email: email,
        });
        newUser.passwordToHash(password);
        newUser.save();
        return done(null, newUser);
    }
    catch (err) {
        return done(err, false, { message: err.message });
    }
})));
exports.default = passport_1.default;
//# sourceMappingURL=passport-local.js.map