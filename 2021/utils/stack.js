"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack {
    constructor(values = []) {
        this.values = values;
    }
    push(it) {
        this.values.push(it);
    }
    pop() {
        return this.values.pop();
    }
    get end() {
        return this.values[this.values.length - 1];
    }
    get size() {
        return this.values.length;
    }
}
exports.Stack = Stack;
//# sourceMappingURL=stack.js.map