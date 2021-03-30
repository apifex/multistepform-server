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
exports.createElement = exports.createStep = exports.createForm = void 0;
const form_model_1 = __importDefault(require("../models/form-model"));
const createForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield form_model_1.default
        .build(req.body);
    form.addOwner(req.user);
    yield form.save().catch(next);
    return res.status(200).send({ FormId: form._id });
});
exports.createForm = createForm;
const createStep = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield form_model_1.default
        .findOne({ _id: req.query.formid }).exec();
    console.log('form in crate step', form);
    if (!form)
        throw Error('no form with this id');
    form.steps.splice(req.body.stepPosition, 0, req.body.step);
    form.save()
        .catch((err) => next(err));
    res.status(200).send({ StepId: form.steps[form.steps.length - 1]._id });
});
exports.createStep = createStep;
const createElement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield form_model_1.default
        .findOne({ "form.steps._id": req.query.stepid }).exec();
    if (!form)
        throw new Error('no form with this id');
    const step = form.steps.id(req.query.stepid);
    console.log('step ', step);
    if (!step)
        throw new Error('no step with this id');
    step.elements.splice(req.body.elementPosition, 0, req.body.element);
    console.log('step after splice', step);
    form.save()
        .catch((err) => next(err));
    res.status(200).send({ ElementId: step.elements[step.elements.length - 1]._id });
});
exports.createElement = createElement;
//TODO
// List.collection.update(
//     {},
//     { "$push": {
//     "list.sub": {
//       "$each": [ 1, 2, 3 ],
//       "$position": 0 }
//     }
//     },function(err,NumAffected) {
//       console.log("done");
//     }
//   );
// export const getForm = async (req: Request, res: Response, next: NextFunction) => {
//     const form = await FormModel
//         .findOne({name: 'halina'})
//         .exec()
//         .catch((err: Error)=>next(err))
//     form?res.status(200).send(form):res.status(200).send('Form not found')
// }
// export const updateForm = async (req: Request, res: Response, next: NextFunction) => {
//     const form = await FormModel
//         .findOne({name: req.query.name as string})
//         .exec()
//         .catch((err: Error)=>next(err))
//     if (!form) throw new Error('no form with this name')
//     form.set(req.body)
//     const updatedForm = await form.save()
//         .catch((err: Error)=>next(err))
//         res.status(200).send(updatedForm)
// }
// export const deleteForm = async (req: Request, res: Response, next: NextFunction) => {
//     const form = await FormModel
//         .findOne({name: req.query.name})
//         .exec()
//         .catch((err: Error)=>next(err))
//     const removedForm = await form.remove()
//         .catch((err: Error)=>next(err))
//         res.status(200).send(removedForm)
// }
//# sourceMappingURL=form-controler.js.map