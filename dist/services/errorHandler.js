"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userErrorsHandler = exports.formErrorsHandler = void 0;
const formErrorsHandler = (err, req, res, next) => {
    return res.status(500).json({ error: err.message });
};
exports.formErrorsHandler = formErrorsHandler;
const userErrorsHandler = (err, req, res, next) => {
    return res.status(500).json({ error: err.message });
};
exports.userErrorsHandler = userErrorsHandler;
//# sourceMappingURL=errorHandler.js.map