import { performance } from 'perf_hooks';

export interface AocResult {
    value: number | string;
}

export const aoc = (f: () => AocResult | Promise<AocResult>): void => {

    let start = 0;
    let end = 0;
    new Promise<AocResult>((res, rej) => {
        try {
            start = performance.now();
            res(f());
        }
        catch (err) {
            rej(err);
        }
    })
        .then((r) => {
            end = performance.now();
            const {value, ...extra} = r;
            console.log('---');
            console.log('value:', value);
            console.log('extra:', extra);
        })
        .catch((err) => {
            end = performance.now();
            console.log('---');
            console.log('error:', err);
        })
        .finally(() => {
            console.log('---');
            console.log(`time: ${(end - start).toFixed(3)} ms`);
        });
};