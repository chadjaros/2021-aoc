import { parsePacket, input16, Packet } from './input';

const result = parsePacket(input16);

function countVersions(p: Packet): number {
    return (
        p.version +
        (p.subPackets ?? []).reduce((sum, packet) => {
            return sum + countVersions(packet);
        }, 0)
    );
}

console.log(countVersions(result));
