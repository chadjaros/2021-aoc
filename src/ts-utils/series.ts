export class Series {
    static generated<T>(count: number, fn: (count: number) => T): Iterable<T> {
        let i = 0;
        return {
            [Symbol.iterator]: () => ({
                next: () => {
                    i++;
                    return {
                        value: fn(i),
                        done: i > count,
                    };
                },
            }),
        };
    }

    static of<T>(count: number, value: T): Iterable<T> {
        let i = 0;
        return {
            [Symbol.iterator]: () => ({
                next: () => {
                    i++;
                    return {
                        value,
                        done: i > count,
                    };
                },
            }),
        };
    }

    static to(from: number, to: number): Iterable<number> {
        return this.range(from, to);
    }

    static until(from: number, until: number): Iterable<number> {
        return this.range(from, from <= until ? until - 1 : until + 1);
    }

    static range(from: number, to: number): Iterable<number> {
        let i = from;

        if (from > to) {
            return {
                [Symbol.iterator]: () => ({
                    next: () => {
                        const done = i < to;
                        return {
                            value: i--,
                            done,
                        };
                    },
                }),
            };
        }

        return {
            [Symbol.iterator]: () => ({
                next: () => {
                    const done = i > to;
                    return {
                        value: i++,
                        done,
                    };
                },
            }),
        };
    }
}
