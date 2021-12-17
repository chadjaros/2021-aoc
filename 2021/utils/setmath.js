"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symmetricDifference = exports.difference = exports.intersection = exports.union = exports.setEq = void 0;
function setEq(a, b) {
    if (a.size !== b.size)
        return false;
    for (const item of a) {
        if (!b.has(item))
            return false;
    }
    return true;
}
exports.setEq = setEq;
function union(a, b) {
    return new Set([...a, ...b]);
}
exports.union = union;
function intersection(a, b) {
    return new Set([...a].filter(x => b.has(x)));
}
exports.intersection = intersection;
function difference(a, b) {
    return new Set([...a].filter(x => !b.has(x)));
}
exports.difference = difference;
function symmetricDifference(a, b) {
    return new Set([...a, ...b]
        .filter((x) => !(a.has(x) && b.has(x))));
}
exports.symmetricDifference = symmetricDifference;
//# sourceMappingURL=setmath.js.map