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
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoute = exports.googleAuth = exports.localAuth = void 0;
// const createCookieFromToken = (user: any, statusCode: number, req: Request, res: Response) => {
//   const token = user.generateJWT();
//   const cookieOptions = {
//     expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
//     httpOnly: false,
//     secure: req.secure || req.headers["x-forwarded-proto"] === "http",
//     sameSite: 'lax'
//   };
//   res.cookie("msfToken", token)
//   res.status(statusCode).json({
//     status: "success",
//     token,
//     data: {
//       user,
//     },
//   });
// };
const localAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user)
            return;
        const token = user.generateJWT();
        const userToJson = user.toAuthJSON(token);
        res.status(200).json({
            status: "success",
            token,
            data: userToJson
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'error',
            error: {
                message: err.message,
            },
        });
    }
});
exports.localAuth = localAuth;
const googleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user)
            return;
        const token = user.generateJWT();
        const userToJson = user.toAuthJSON(token);
        res.status(200).json({
            status: "success",
            token,
            data: userToJson
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'error',
            error: {
                message: err.message,
            },
        });
    }
});
exports.googleAuth = googleAuth;
const protectedRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        status: "success",
        data: {
            message: "Welcome in secret place",
        },
    });
});
exports.protectedRoute = protectedRoute;
//# sourceMappingURL=user-controler.js.map