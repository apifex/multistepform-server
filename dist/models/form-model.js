"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
//form sample
const From = {
    name: 'Form123',
    steps: [
        {
            id: '11',
            elements: [{ element: 'input', type: 'text', label: 'Imię' },
                { element: 'input', type: 'checkbox', label: "Lubisz spać?" },
            ]
        },
        {
            id: '12',
            elements: [{ element: 'input', type: 'text' },
                { element: 'input', type: 'checkbox' },
                { element: 'input', type: 'password' }
            ]
        }
    ]
};
const ElementSchema = new mongoose_1.default.Schema({
    element: {
        type: String,
        required: true,
    },
    label: { type: String },
    options: [mongoose_1.Schema.Types.Mixed],
    placeholder: { type: String },
    properties: { type: mongoose_1.Schema.Types.Mixed }
});
const StepSchema = new mongoose_1.default.Schema({
    elements: [ElementSchema]
});
const FormSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    steps: [StepSchema],
    owner: {
        type: String,
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
});
FormSchema.methods.addOwner = function (owner) {
    this.owner = owner;
};
FormSchema.statics.build = (args) => {
    return new FormModel(args);
};
const FormModel = mongoose_1.default.model('Form', FormSchema);
exports.default = FormModel;
//# sourceMappingURL=form-model.js.map