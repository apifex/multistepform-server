"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clientRouter = express_1.default.Router();
clientRouter.use((req, res, next) => {
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
clientRouter.get('/load', errorHandlar, (req, res) => {
    res.send('load form');
});
clientRouter.post('/submit', errorHandlar, (req, res) => {
    res.send('submit form');
});
exports.default = clientRouter;
//# sourceMappingURL=clientRouter.js.map