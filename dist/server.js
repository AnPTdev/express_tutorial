"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
const account_1 = require("./models/account");
const PAGE_SIZE = 2;
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.get('/account/', (req, res, next) => {
    var page = req.query.page;
    if (page) {
        //GET PAGE
        var _page = parseInt(page);
        _page < 1 ? _page = 1 : page;
        var start = (_page - 1) * PAGE_SIZE;
        account_1.AccountModel
            .find({})
            .skip(start)
            .limit(PAGE_SIZE)
            .then(data => res.json(data))
            .catch(err => res.status(500).json('loi server: ' + err));
    }
    else {
        //GET ALL
        account_1.AccountModel.find({})
            .then(data => res.json(data))
            .catch(err => res.status(500).json('loi server: ' + err));
    }
});
app.listen(PORT, () => {
    console.log(`Socket.IO server running at http://localhost:${PORT}/`);
});
//# sourceMappingURL=server.js.map