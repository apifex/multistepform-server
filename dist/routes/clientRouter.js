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
clientRouter.get('/load'); //TODO loadForm
clientRouter.post('/submit'); //submitForm) //TODO
exports.default = clientRouter;
//# sourceMappingURL=clientRouter.js.map