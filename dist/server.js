"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const authentication_1 = require("./routers/authentication");
app.use('/Authentication/', authentication_1.AuthenticationRouter);
app.listen(PORT, () => {
    console.log(` server running at http://localhost:${PORT}/`);
});
//# sourceMappingURL=server.js.map