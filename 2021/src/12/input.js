"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.input12mid = exports.input12small = exports.input12mini = exports.isBig = exports.input12 = void 0;
exports.input12 = [
    ['lg', 'GW'],
    ['pt', 'start'],
    ['pt', 'uq'],
    ['nx', 'lg'],
    ['ve', 'GW'],
    ['start', 'nx'],
    ['GW', 'start'],
    ['GW', 'nx'],
    ['pt', 'SM'],
    ['sx', 'GW'],
    ['lg', 'end'],
    ['nx', 'SM'],
    ['lg', 'SM'],
    ['pt', 'nx'],
    ['end', 've'],
    ['ve', 'SM'],
    ['TG', 'uq'],
    ['end', 'SM'],
    ['SM', 'uq'],
];
function isBig(s) {
    return s === s.toUpperCase();
}
exports.isBig = isBig;
exports.input12mini = [
    ['start', 'A'],
    ['start', 'b'],
    ['A', 'c'],
    ['A', 'b'],
    ['b', 'd'],
    ['A', 'end'],
    ['b', 'end'],
];
exports.input12small = [
    ['dc', 'end'],
    ['HN', 'start'],
    ['start', 'kj'],
    ['dc', 'start'],
    ['dc', 'HN'],
    ['LN', 'dc'],
    ['HN', 'end'],
    ['kj', 'sa'],
    ['kj', 'HN'],
    ['kj', 'dc'],
];
exports.input12mid = [
    ['fs', 'end'],
    ['he', 'DX'],
    ['fs', 'he'],
    ['start', 'DX'],
    ['pj', 'DX'],
    ['end', 'zg'],
    ['zg', 'sl'],
    ['zg', 'pj'],
    ['pj', 'he'],
    ['RW', 'he'],
    ['fs', 'DX'],
    ['pj', 'RW'],
    ['zg', 'RW'],
    ['start', 'pj'],
    ['he', 'WI'],
    ['zg', 'he'],
    ['pj', 'fs'],
    ['start', 'RW'],
];
//# sourceMappingURL=input.js.map