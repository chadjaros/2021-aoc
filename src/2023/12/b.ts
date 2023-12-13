import { aoc } from '../../ts-utils/aoc';
import { Series } from '../../ts-utils/series';

interface SpanDef { len: number; follow: number; }
interface Record {
    str: string;
    lastHashIdx: number;
    spans: SpanDef[];
}

function count(record: Record, strIdx: number = 0, spanIdx: number = 0, memo = new Map<string, number>()): number {
    const key = `${strIdx},${spanIdx}`;
    if (memo.has(key)) {
        return memo.get(key)!;
    }

    if (spanIdx === record.spans.length) {
        return 1;
    } else if (strIdx === record.str.length) {
        return 0;
    }

    const isLastSpan = spanIdx === record.spans.length - 1;
    const indices: number[] = [];
    let spCt = 0;
    let firstHashIdx: number | undefined = undefined;
    const span = record.spans[spanIdx];
    for (const i of Series.range(strIdx, record.str.length - span.follow + span.len)) {
        const char = record.str[i];
        if (firstHashIdx === undefined && char === '#') {
            firstHashIdx = i;
        }
        if (firstHashIdx !== undefined && firstHashIdx < (i - span.len)) {
            break;
        }
        if (spCt >= span.len && (char === '?' || char === '.')) {
            if (!(isLastSpan && i <= record.lastHashIdx)) {
                indices.push(i - span.len);
            }
        }
        if (char === '#' || char === '?') {
            spCt++;
        }
        if (char === '.') {
            spCt = 0;
        }
        if (i === record.str.length - 1 && spCt >= span.len) {
            if (firstHashIdx !== undefined && firstHashIdx < (i - span.len + 1)) {
                break;
            }
            indices.push(i - span.len + 1);
            break;
        }
    }

    const res = indices.reduce((acc, idx) => {
        return acc + count(record, idx + span.len + 1, spanIdx + 1, memo);
    }, 0);
    memo.set(key, res);
    return res;
}

aoc((infile) => {
    const lines =
        infile.lines
            .map((line) => {
                const [rawStr, rawNums] = line.split(' ');

                const str = Array.from(Series.of(5, rawStr)).join('?');
                const nums = Array.from(Series.of(5, rawNums)).join(',');

                const spanLens = nums.split(',').map((n) => parseInt(n));
                let sum = 0;
                const spans: SpanDef[] = [];
                for (const i of Series.range(spanLens.length - 1, 0)) {
                    sum += spanLens[i];
                    spans.unshift({ len: spanLens[i], follow: sum });
                    sum++;
                }
                const lastHashIdx = str.lastIndexOf('#');
                return { str, lastHashIdx, spans };
            });

    const value = lines.reduce((acc, value) => {
        const v = count(value);
        // console.log(value.str, value.spans.map((_) => _.len).join(','), v);
        return acc + v;
    }, 0);

    return { value };
});
