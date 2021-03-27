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
exports.protectedRoute = exports.login = exports.signup = void 0;
// import passport from "passport";
const passport_local_1 = __importDefault(require("../services/passport/passport-local"));
const createCookieFromToken = (user, statusCode, req, res) => {
    const token = user.generateVerificationToken();
    const cookieOptions = {
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "http",
    };
    res.cookie("jwt", token, cookieOptions);
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_local_1.default.authenticate("signup", { session: false }, (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (err || !user) {
                const { statusCode = 400, message } = info;
                return res.status(statusCode).json({
                    status: "error",
                    error: {
                        message,
                    },
                });
            }
            createCookieFromToken(user, 201, req, res);
        }
        catch (error) {
            throw new Error(error);
        }
    }))(req, res, next);
});
exports.signup = signup;
const login = (req, res, next) => {
    passport_local_1.default.authenticate("login", { session: false }, (err, user, info) => {
        if (err || !user) {
            let message = err;
            if (info) {
                message = info.message;
            }
            return res.status(401).json({
                status: "error",
                error: {
                    message,
                },
            });
        }
        // generate a signed son web token with the contents of user object and return it in the response
        createCookieFromToken(user, 200, req, res);
    })(req, res, next);
};
exports.login = login;
const protectedRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        status: "success",
        data: {
            message: "Yes you are. You are a Thor-n times developer",
        },
    });
});
exports.protectedRoute = protectedRoute;
//# sourceMappingURL=auth-controler.js.map