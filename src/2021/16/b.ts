import { hexToBinary, input16, Packet, parsePacket } from './input';

const result = parsePacket(input16);

// const result = parsePacket(hexToBinary('9C005AC2F8F0'));

function calculate(packet: Packet): number {
    const subValues = packet.subPackets?.map((x) => calculate(x)) ?? [];
    switch (packet.type) {
        case 0:
            return subValues.reduce((sum, v) => sum + v, 0);
        case 1:
            return subValues.reduce((prod, v) => prod * v, 1);
        case 2:
            return subValues.reduce<number>(
                (min, v) => (v < min ? v : min),
                Infinity
            );
        case 3:
            return subValues.reduce<number>(
                (min, v) => (v > min ? v : min),
                -Infinity
            );
        case 4:
            return packet?.value ?? 0;
        case 5:
            return (subValues[0] ?? 0) > (subValues[1] ?? 0) ? 1 : 0;
        case 6:
            return (subValues[0] ?? 0) < (subValues[1] ?? 0) ? 1 : 0;
        case 7:
            return (subValues[0] ?? 0) === (subValues[1] ?? 0) ? 1 : 0;
        default:
            throw new Error(`Unknown packet type ${packet.type}`);
    }
}

console.log(calculate(result));
