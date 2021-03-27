"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const form_controler_1 = require("../controllers/form-controler");
const formRouter = express_1.default.Router();
formRouter.use((req, res, next) => {
    // TODO: authentification
    next();
});
formRouter.post('/create', form_controler_1.createForm);
formRouter.post('/update', form_controler_1.updateForm);
formRouter.get('/get', form_controler_1.getForm);
formRouter.post('/delete', form_controler_1.deleteForm);
exports.default = formRouter;
//# sourceMappingURL=formRouter.js.map