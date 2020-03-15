"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Todo {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
}
exports.Todo = Todo;
// when this class is assigned, the result properties should be like
//{id: id, text: text}
