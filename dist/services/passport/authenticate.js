"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const config_1 = __importDefault(require("./config"));
const authenticate = (req, res, next) => {
    config_1.default.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            throw new Error('invalid token, please log in or sign up');
        }
        req.user = user;
        return next();
    })(req, res, next);
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map