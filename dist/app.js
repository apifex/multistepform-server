"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const formRouter_1 = __importDefault(require("./routes/formRouter"));
const clientRouter_1 = __importDefault(require("./routes/clientRouter"));
const errorHandler_1 = require("./services/errorHandler");
const mongoConnection_1 = require("./services/mongoConnection");
dotenv_1.config();
// configure server
const PORT = process.env.PORT || 5000;
console.log(PORT);
console.log(process.env.JWT_PUBLIC_SECRET);
const server = express_1.default();
server.use(cors_1.default());
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use(cookie_parser_1.default());
passport_1.default.initialize();
server.use('/api/client', clientRouter_1.default);
server.use('/api/user', userRouter_1.default);
server.use('/api/form', formRouter_1.default); //auth.required 
server.use(errorHandler_1.formErrorsHandler);
server.use(errorHandler_1.userErrorsHandler);
// test
server.get('/test', (req, res) => { res.send('server works'); });
// connect to db
mongoConnection_1.connectToDb().then(() => server.listen(PORT, () => console.log(`server is listening on port ${PORT}`)));
//# sourceMappingURL=app.js.map