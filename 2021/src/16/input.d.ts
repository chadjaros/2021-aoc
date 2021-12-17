export declare function hexToBinary(s: string): boolean[];
export declare const input16: boolean[];
export declare function binToDec(value: boolean[]): number;
export interface Packet {
    readonly version: number;
    readonly type: number;
    value?: number;
    readonly lengthType?: number;
    readonly subPackets?: Packet[];
    readonly length: number;
}
export declare function parsePacket(data: boolean[]): Packet;
