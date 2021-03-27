"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const dotenv_1 = require("dotenv");
const user_model_1 = __importDefault(require("../../models/user-model"));
dotenv_1.config();
const jwtPublicSecret = process.env.JWT_PUBLIC_SECRET.replace(/\\n/g, '\n');
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    return token;
};
const options = {
    secretOrKey: jwtPublicSecret,
    algorithms: ['RS256'],
    passReqToCallback: true,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
        passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        req => cookieExtractor(req),
    ])
};
passport_1.default.use(new passport_jwt_1.Strategy(options, (req, jwtPayload, done) => {
    user_model_1.default.findOne({ _id: jwtPayload.id })
        .then(user => {
        if (user) {
            delete user.password;
            done(null, user);
        }
        else {
            done(null, false);
        }
    })
        .catch(err => {
        if (err) {
            return done(err, false);
        }
    });
}));
exports.default = passport_1.default;
//# sourceMappingURL=config.js.map