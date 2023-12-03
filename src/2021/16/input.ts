const mainInput =
    '005532447836402684AC7AB3801A800021F0961146B1007A1147C89440294D005C12D2A7BC992D3F4E50C72CDF29EECFD0ACD5CC016962099194002CE31C5D3005F401296CAF4B656A46B2DE5588015C913D8653A3A001B9C3C93D7AC672F4FF78C136532E6E0007FCDFA975A3004B002E69EC4FD2D32CDF3FFDDAF01C91FCA7B41700263818025A00B48DEF3DFB89D26C3281A200F4C5AF57582527BC1890042DE00B4B324DBA4FAFCE473EF7CC0802B59DA28580212B3BD99A78C8004EC300761DC128EE40086C4F8E50F0C01882D0FE29900A01C01C2C96F38FCBB3E18C96F38FCBB3E1BCC57E2AA0154EDEC45096712A64A2520C6401A9E80213D98562653D98562612A06C0143CB03C529B5D9FD87CBA64F88CA439EC5BB299718023800D3CE7A935F9EA884F5EFAE9E10079125AF39E80212330F93EC7DAD7A9D5C4002A24A806A0062019B6600730173640575A0147C60070011FCA005000F7080385800CBEE006800A30C023520077A401840004BAC00D7A001FB31AAD10CC016923DA00686769E019DA780D0022394854167C2A56FB75200D33801F696D5B922F98B68B64E02460054CAE900949401BB80021D0562344E00042A16C6B8253000600B78020200E44386B068401E8391661C4E14B804D3B6B27CFE98E73BCF55B65762C402768803F09620419100661EC2A8CE0008741A83917CC024970D9E718DD341640259D80200008444D8F713C401D88310E2EC9F20F3330E059009118019A8803F12A0FC6E1006E3744183D27312200D4AC01693F5A131C93F5A131C970D6008867379CD3221289B13D402492EE377917CACEDB3695AD61C939C7C10082597E3740E857396499EA31980293F4FD206B40123CEE27CFB64D5E57B9ACC7F993D9495444001C998E66B50896B0B90050D34DF3295289128E73070E00A4E7A389224323005E801049351952694C000';

const convertMap = new Map([
    ['0', [false, false, false, false]],
    ['1', [false, false, false, true]],
    ['2', [false, false, true, false]],
    ['3', [false, false, true, true]],
    ['4', [false, true, false, false]],
    ['5', [false, true, false, true]],
    ['6', [false, true, true, false]],
    ['7', [false, true, true, true]],
    ['8', [true, false, false, false]],
    ['9', [true, false, false, true]],
    ['A', [true, false, true, false]],
    ['B', [true, false, true, true]],
    ['C', [true, true, false, false]],
    ['D', [true, true, false, true]],
    ['E', [true, true, true, false]],
    ['F', [true, true, true, true]],
]);

export function hexToBinary(s: string): boolean[] {
    return s.split('').flatMap((x) => convertMap.get(x)!);
}

export const input16 = hexToBinary(mainInput);

export function binToDec(value: boolean[]) {
    let sum = 0;
    for (let x = 0; x < value.length; x++) {
        if (value[value.length - 1 - x]) {
            sum += Math.pow(2, x);
        }
    }
    return sum;
}

export interface Packet {
    readonly version: number;
    readonly type: number;
    value?: number;
    readonly lengthType?: number;
    readonly subPackets?: Packet[];
    readonly length: number;
}

export function parsePacket(data: boolean[]): Packet {
    let remainder = data;
    const version = binToDec(data.slice(0, 3));
    const type = binToDec(data.slice(3, 6));

    if (type === 4) {
        let index = 1;
        let bits: boolean[] = [];
        do {
            index += 5;
            bits = [...bits, ...data.slice(index + 1, index + 5)];
        } while (data[index] === true);

        return {
            version,
            type,
            value: binToDec(bits),
            length: index + 5,
        };
    } else {
        const lengthType = binToDec(data.slice(6, 7));
        const subPackets: Packet[] = [];
        let parsedLength = 0;
        if (lengthType === 0) {
            const subpacketLength = binToDec(data.slice(7, 22));
            parsedLength = 22;
            while (parsedLength < subpacketLength + 22) {
                const response = parsePacket(data.slice(parsedLength));
                subPackets.push(response);
                parsedLength += response.length;
            }
        } else {
            const subpacketCount = binToDec(data.slice(7, 18));
            parsedLength = 18;
            let parsedCount = 0;
            while (parsedCount < subpacketCount) {
                const response = parsePacket(data.slice(parsedLength));
                subPackets.push(response);
                parsedLength += response.length;
                parsedCount++;
            }
        }

        return {
            version,
            type,
            lengthType,
            subPackets,
            length: parsedLength,
        };
    }
}
