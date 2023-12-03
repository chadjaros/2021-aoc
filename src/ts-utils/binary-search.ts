export function binarySearch<T>(
    list: T[],
    target: T,
    comparator: (a: T, b: T) => number
): { index: number; value: T | undefined; match: boolean } {
    let l = 0;
    let r = list.length - 1;

    while (l <= r) {
        const m = Math.floor((l + r) * 0.5);
        const comp = comparator(list[m], target);
        if (comp < 0) {
            l = m + 1;
        } else if (comp > 0) {
            r = m - 1;
        } else {
            return {
                index: m,
                value: list[m],
                match: true,
            };
        }
    }

    if (l > list.length - 1) {
        return {
            index: -1,
            value: undefined,
            match: false,
        };
    }

    return {
        index: l,
        value: list[l],
        match: false,
    };
}
