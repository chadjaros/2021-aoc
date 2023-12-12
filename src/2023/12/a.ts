import { aoc } from '../../ts-utils/aoc';

interface Record {
    str: string[];
    spans: number[];
}

function count(record: Record, strIdx: number, spanIdx: number, memo = new Map<string, number>()): number {
    const key = `${strIdx},${spanIdx}`;
    if (memo.has(key)) {
        return memo.get(key)!;
    }

    if (spanIdx === record.spans.length) {
        return 1;
    } else if (strIdx === record.str.length) {
        return 0;
    }

    const span = record.spans[spanIdx];
    const scanPart = record.str.slice(strIdx);
    const scanStart = scanPart.findIndex((c, idx) => c === '#' || c === '?');
    const spanStart = scanStart + strIdx;
    if (scanStart === -1 || spanStart + span >= record.str.length) {
        return 0;
    }

    let spanEnd = scanPart.slice(scanStart).findIndex((c) => c === '.');
    if (spanEnd === -1) {
        spanEnd = scanPart.length;
    }

    if (spanEnd - scanStart < span) {
    }

    return 0;
}

aoc((infile) => {
    const lines = infile.lines.map((line) => {
        const [str, nums] = line.split(' ');
        const spans = nums.split(',').map((n) => parseInt(n));
        return { str: str.split(''), spans };
    });

    const memo = new Map<string, number>();

    return { value: 0 };
});
