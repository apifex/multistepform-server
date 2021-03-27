"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../services/passport/authenticate");
const auth_controler_1 = require("../controllers/auth-controler");
const userRouter = express_1.default.Router();
// userRouter.use((req: Request, res: Response, next: NextFunction)=> {
//     // TODO authentification
//     next();
// })
userRouter.post('/login', auth_controler_1.login);
userRouter.post('/signup', auth_controler_1.signup);
userRouter.get('/pawel', authenticate_1.authenticate, auth_controler_1.protectedRoute);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map