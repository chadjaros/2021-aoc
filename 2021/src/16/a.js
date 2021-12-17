"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
const result = (0, input_1.parsePacket)(input_1.input16);
function countVersions(p) {
    var _a;
    return p.version +
        ((_a = p.subPackets) !== null && _a !== void 0 ? _a : []).reduce((sum, packet) => {
            return sum + countVersions(packet);
        }, 0);
}
console.log(countVersions(result));
//# sourceMappingURL=a.js.map