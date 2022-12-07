import { performance } from 'perf_hooks';

export interface AocResult {
    value: number | string;
}

export const aoc = async (f: () => AocResult | Promise<AocResult>): Promise<void> => {

    let start = 0;
    let end = 0;

    try {
        start = performance.now();
        const {value, ...extra}  =await f();
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