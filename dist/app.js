"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //call express
const body_parser_1 = require("body-parser"); // to make sure there is req.body. initiate by using 'app.use(json())
const todos_1 = __importDefault(require("./routes/todos"));
const app = express_1.default();
app.use(body_parser_1.json());
app.use("/todos", todos_1.default); // '/todos/ = all requests from todos, when the source path is correct, start todoRoutes
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(3000);
