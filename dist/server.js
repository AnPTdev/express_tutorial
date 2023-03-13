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
const authenticate_1 = require("./routers/authenticate");
app.use('/authenticate/', authenticate_1.AuthenticateRouter);
const task_1 = require("./routers/task");
app.use('/task/', task_1.TaskRouter);
//TODO adding keys to futher authenticate
app.listen(PORT, () => {
    console.log(` server running at http://localhost:${PORT}/`);
});
//# sourceMappingURL=server.js.map