"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const formRouter = express_1.default.Router();
formRouter.use((req, res, next) => {
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
formRouter.post('/create', errorHandlar, (req, res) => {
    res.send('create form');
});
formRouter.post('/update', errorHandlar, (req, res) => {
    res.send('upadate form ');
});
formRouter.post('/load', errorHandlar, (req, res) => {
    res.send('load form');
});
formRouter.post('/delete', errorHandlar, (req, res) => {
    res.send('delete form');
});
exports.default = formRouter;
//# sourceMappingURL=formRouter.js.map