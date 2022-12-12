import { readFileSync } from 'fs';
import { dirname } from 'path';
import { performance } from 'perf_hooks';
import { Grid } from './grid';


export class AocInputFileHelper {
    constructor(readonly inputFile: string) {}

    get buffer(): Buffer {
        return readFileSync(this.inputFile);
    }

    get string(): string {
        return this.buffer.toString().trim();
    }

    get lines(): string[] {
        return this.string.split('\n');
    }

    get tokenLines(): string[][] {
        return this.splitLines(/\s+/);
    }

    regexLines(regex: string | RegExp): string[][] {
        return this.lines.map((line) => {
            return line.match(regex)?.map((x) => x).slice(1) ?? [];
        });
    }

    splitLines(s: string | RegExp): string[][] {
        return this.lines.map((line) => line.split(s));
    }

    splitLinesAndMap<T>(s: string | RegExp, mapFn: ((x: string) => T)): T[][] {
        return this.lines.map((line) => line.split(s).map(mapFn)) as T[][];
    }

    grid<T>(s: string | RegExp, mapFn: ((x: string) => T)): Grid<T> {
        return new Grid(this.splitLinesAndMap(s, mapFn));
    }
}

export interface AocResult {
    value: number | string;
}

export const aoc = async (f: (infile: AocInputFileHelper) => AocResult | Promise<AocResult>): Promise<void> => {

    const inputpath = dirname(process.argv[1]) + '/input.txt';

    let start = 0;
    let end = 0;

    try {
        start = performance.now();
        const {value, ...extra}  =await f(new AocInputFileHelper(inputpath));
        end = performance.now();
        console.log('---');
        console.log('value:', value);
        console.log('extra:', extra);
    }
    catch (err) {
        end = performance.now();
        console.log('---');
        console.log('error:', err);
    }
    finally {
        console.log('---');
        console.log(`time: ${(end - start).toFixed(3)} ms`);
    }
};