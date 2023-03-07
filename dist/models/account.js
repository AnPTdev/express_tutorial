"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = void 0;
const mongoose_1 = require("mongoose");
(0, mongoose_1.connect)('mongodb://localhost/K5-Nodemy');
const accountSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true }
}, {
    collection: 'account'
});
const AccountModel = (0, mongoose_1.model)('account', accountSchema);
exports.AccountModel = AccountModel;
//# sourceMappingURL=account.js.map