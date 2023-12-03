import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    const input = new Map(
        infile
            //.sample()
            .splitLines(/:? /)
            .map((x) => {
                const value = parseInt(x[1]);
                const var1 = x[1];
                const op = x[2];
                const var2 = x[3];
                return [
                    x[0],
                    {
                        isValue: !isNaN(value),
                        value,
                        var1,
                        var2,
                        op,
                    },
                ];
            })
    );

    console.log(input);

    function resolve(varName: string): number {
        const entry = input.get(varName)!;
        if (entry.isValue) {
            return entry.value;
        }

        const val1 = resolve(entry.var1);
        const val2 = resolve(entry.var2);

        if (entry.op === '+') {
            return val1 + val2;
        } else if (entry.op === '-') {
            return val1 - val2;
        } else if (entry.op === '*') {
            return val1 * val2;
        } else if (entry.op === '/') {
            return val1 / val2;
        }

        return NaN;
    }

    const value = resolve('root');

    return { value };
});
