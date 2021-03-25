"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const formRouter_1 = __importDefault(require("./routes/formRouter"));
const clientRouter_1 = __importDefault(require("./routes/clientRouter"));
const errorHandler_1 = require("./services/errorHandler");
const mongoConnection_1 = __importDefault(require("./services/mongoConnection"));
// start server
const port = process.env.PORT || 5000;
const server = express_1.default();
server.use(cors_1.default());
server.use(express_1.default.urlencoded({ extended: true }));
server.use('/api/client', clientRouter_1.default);
server.use('/api/user', userRouter_1.default);
server.use('/api/form', formRouter_1.default); //auth.required
server.use(errorHandler_1.formErrorsHandler);
server.use(errorHandler_1.userErrorsHandler);
//services
console.log(mongoConnection_1.default);
server.listen(port, () => console.log('listening on port 4000'));
//# sourceMappingURL=app.js.map