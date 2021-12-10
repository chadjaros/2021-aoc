
export function setEq(a: Set<unknown>, b: Set<unknown>): boolean {
    if (a.size !== b.size) return false;
    for (const item of a) {
        if (!b.has(item)) return false;
    }
    return true;
}

export function union<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set([...a, ...b]);
}

export function intersection<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set([...a].filter(x => b.has(x)));
}

export function difference<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set([...a].filter(x => !b.has(x)));
}

export function symmetricDifference<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set([...a, ...b]
        .filter((x) => !(a.has(x) && b.has(x))));
}
