"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formErrorsHandler = void 0;
const formErrorsHandler = (err, req, res, next) => {
    return res.status(500).json({ error: err.message });
};
exports.formErrorsHandler = formErrorsHandler;
//# sourceMappingURL=errorHandler.js.map