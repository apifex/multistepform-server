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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_model_1 = __importDefault(require("../../models/user-model"));
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;
dotenv_1.config();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield user_model_1.default.findOne({ googleId: profile.id });
        if (currentUser) {
            return done(null, currentUser, { statusCode: 200 });
        }
        if (!profile.emails)
            return;
        const email = profile.emails[0].value;
        const userName = profile.emails[0].value;
        const checkEmail = yield user_model_1.default.checkExistingField("email", email);
        if (checkEmail) {
            const user = yield user_model_1.default.findByIdAndUpdate(checkEmail._id, { googleId: profile.id }, { new: true });
            if (user)
                return done(null, user, { statusCode: 200 });
        }
        const userObj = new user_model_1.default({
            googleId: profile.id,
            userName,
            email,
        });
        const user = yield userObj.save({ validateBeforeSave: false });
        return done(null, user, { statusCode: 201 });
    }
    catch (err) {
        done(err, false);
    }
})));
exports.default = passport_1.default;
//# sourceMappingURL=passport-google.js.map