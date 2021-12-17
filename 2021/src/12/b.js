"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
const nodes = new Map();
input_1.input12.forEach((x) => {
    var _a, _b;
    x.forEach((n) => {
        if (!nodes.has(n)) {
            nodes.set(n, new Set());
        }
    });
    (_a = nodes.get(x[0])) === null || _a === void 0 ? void 0 : _a.add(x[1]);
    (_b = nodes.get(x[1])) === null || _b === void 0 ? void 0 : _b.add(x[0]);
});
// console.log(nodes);
const paths = [];
function getPaths(start, end, current, visited, canVisitTwice, visitCount) {
    // console.log('getpaths', start, current, 'visitTwice', canVisitTwice);
    if (start === end) {
        paths.push([...current, start]);
        return;
    }
    else if ((start === canVisitTwice && visitCount > 1) || visited.has(start)) {
        return;
    }
    const cNext = [...current, start];
    let vNext = visited;
    let nextVc = visitCount;
    if (start === canVisitTwice) {
        nextVc++;
    }
    if (!(0, input_1.isBig)(start) && start !== canVisitTwice) {
        vNext = new Set([...visited, start]);
    }
    for (const n of nodes.get(start)) {
        getPaths(n, end, cNext, vNext, canVisitTwice, nextVc);
    }
}
const smallKeys = [...nodes.keys()].filter((k) => !(0, input_1.isBig)(k) && k !== 'start' && k !== 'end');
for (const k of smallKeys) {
    getPaths('start', 'end', [], new Set(), k, 0);
}
const s = new Set(paths.map((p) => p.join(',')));
// console.log(s);
console.log(s.size);
//# sourceMappingURL=b.js.map