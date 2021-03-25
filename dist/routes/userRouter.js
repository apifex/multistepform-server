"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.use((req, res, next) => {
    // TODO authentification
    next();
});
const errorHandlar = (req, res, next) => {
    try {
        return next();
    }
    catch (err) {
        console.log(err);
        res.status(500).send("error catched");
    }
};
userRouter.get('/login', errorHandlar, (req, res) => {
    res.send('login to server');
});
userRouter.get('/signup', errorHandlar, (req, res) => {
    res.send('signup to server');
});
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map