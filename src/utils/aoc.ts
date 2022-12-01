export interface AocResult {
    value: number | string;
}

export const aoc = (f: () => AocResult | Promise<AocResult>): void => {

    const start = Date.now();
    new Promise<AocResult>((res, rej) => {
        try {
            res(f());
        }
        catch (err) {
            rej(err);
        }
    })
        .then((r) => {
            const {value, ...extra} = r;
            console.log('---');
            console.log('value:', value);
            console.log('extra:', extra);
        })
        .catch((err) => {
            console.log('---');
            console.log('error:', err);
        })
        .finally(() => {
            console.log('---');
            console.log('time: ', Date.now() - start, 'ms');
        });
};