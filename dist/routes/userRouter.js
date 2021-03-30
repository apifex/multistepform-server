"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_local_1 = __importDefault(require("../services/passport/passport-local"));
const passport_google_1 = __importDefault(require("../services/passport/passport-google"));
const user_controler_1 = require("../controllers/user-controler");
const userRouter = express_1.default.Router();
userRouter.post('/login', passport_local_1.default.authenticate('login', { session: false }), user_controler_1.localAuth);
userRouter.post('/signup', passport_local_1.default.authenticate('signup', { session: false }), user_controler_1.localAuth);
userRouter.get("/google", passport_google_1.default.authenticate('google', { scope: ["profile", "email"], session: false }));
userRouter.get('/google/callback', passport_google_1.default.authenticate('google', { session: false }), user_controler_1.googleAuth);
userRouter.get('/restricted', passport_local_1.default.authenticate('jwt', { session: false }), user_controler_1.protectedRoute);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map