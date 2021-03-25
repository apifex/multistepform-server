"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = process.env.MONGOURL || 'mongodb://mongo:27017';
try {
    mongoose_1.default.connect(connectionString, { useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('connected to db'));
}
catch (error) {
    console.log(error); //TODO handleError
}
const db = mongoose_1.default.connection;
exports.default = db;
//# sourceMappingURL=mongoConnection.js.map