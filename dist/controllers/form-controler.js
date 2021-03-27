"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteForm = exports.updateForm = exports.getForm = exports.createForm = void 0;
const form_model_1 = __importDefault(require("../models/form-model"));
const createForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield form_model_1.default
        .build(req.body)
        .save()
        .catch((err) => next(err));
    res.status(200).send(form);
});
exports.createForm = createForm;
const getForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield form_model_1.default
        .findOne({ name: req.query.name })
        .exec()
        .catch((err) => next(err));
    form ? res.status(200).send(form) : res.status(200).send('Form not found');
});
exports.getForm = getForm;
const updateForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield form_model_1.default
        .findOne({ name: req.query.name })
        .exec()
        .catch((err) => next(err));
    form.set(req.body);
    const updatedForm = yield form.save()
        .catch((err) => next(err));
    res.status(200).send(updatedForm);
});
exports.updateForm = updateForm;
const deleteForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield form_model_1.default
        .findOne({ name: req.query.name })
        .exec()
        .catch((err) => next(err));
    const removedForm = yield form.remove()
        .catch((err) => next(err));
    res.status(200).send(removedForm);
});
exports.deleteForm = deleteForm;
//# sourceMappingURL=form-controler.js.map