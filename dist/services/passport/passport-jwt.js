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
const passport_jwt_1 = require("passport-jwt");
const user_model_1 = __importDefault(require("../../models/user-model"));
dotenv_1.config();
const jwtPublicSecret = process.env.JWT_PUBLIC_SECRET.replace(/\\n/g, "\n");
// const cookieExtractor = (req: Request)  => {
//   let token = null;
//   if (req && req.cookies.msfToken) {
//     token = req.cookies.msfToken;
//   }
//   return token;
// };
const options = {
    secretOrKey: jwtPublicSecret,
    algorithms: ['RS256'],
    passReqToCallback: true,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
        passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    ])
};
passport_1.default.use(new passport_jwt_1.Strategy(options, (req, jwtPayload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ _id: jwtPayload._id });
        user ? done(null, user) : done(null, false);
    }
    catch (err) {
        done(err, false);
    }
})));
exports.default = passport_1.default;
//# sourceMappingURL=passport-jwt.js.map