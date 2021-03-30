"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const form_controler_1 = require("../controllers/form-controler");
const passport_jwt_1 = __importDefault(require("../services/passport/passport-jwt"));
const formRouter = express_1.default.Router();
const authenticate = passport_jwt_1.default.authenticate('jwt', { session: false });
const authorise = (req, res, next) => {
    //@ts-ignore
    console.log('user', req.user._id);
    next();
};
formRouter.post('/createForm', authenticate, authorise, form_controler_1.createForm);
formRouter.post('/createStep', authenticate, authorise, form_controler_1.createStep);
formRouter.post('/createElement', authenticate, authorise, form_controler_1.createElement);
// formRouter.post('/load', getForm)
// formRouter.post('/delete', deleteForm)
exports.default = formRouter;
//# sourceMappingURL=formRouter.js.map