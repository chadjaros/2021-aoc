"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
const result = (0, input_1.parsePacket)(input_1.input16);
// const result = parsePacket(hexToBinary('9C005AC2F8F0'));
function calculate(packet) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const subValues = (_b = (_a = packet.subPackets) === null || _a === void 0 ? void 0 : _a.map((x) => calculate(x))) !== null && _b !== void 0 ? _b : [];
    switch (packet.type) {
        case 0:
            return subValues.reduce((sum, v) => sum + v, 0);
        case 1:
            return subValues.reduce((prod, v) => prod * v, 1);
        case 2:
            return subValues.reduce((min, v) => v < min ? v : min, Infinity);
        case 3:
            return subValues.reduce((min, v) => v > min ? v : min, -Infinity);
        case 4:
            return (_c = packet === null || packet === void 0 ? void 0 : packet.value) !== null && _c !== void 0 ? _c : 0;
        case 5:
            return ((_d = subValues[0]) !== null && _d !== void 0 ? _d : 0) > ((_e = subValues[1]) !== null && _e !== void 0 ? _e : 0) ? 1 : 0;
        case 6:
            return ((_f = subValues[0]) !== null && _f !== void 0 ? _f : 0) < ((_g = subValues[1]) !== null && _g !== void 0 ? _g : 0) ? 1 : 0;
        case 7:
            return ((_h = subValues[0]) !== null && _h !== void 0 ? _h : 0) === ((_j = subValues[1]) !== null && _j !== void 0 ? _j : 0) ? 1 : 0;
        default:
            throw new Error(`Unknown packet type ${packet.type}`);
    }
}
console.log(calculate(result));
//# sourceMappingURL=b.js.map