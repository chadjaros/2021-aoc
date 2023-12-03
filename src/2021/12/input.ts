export const input12 = [
    ['lg', 'GW'],
    ['pt', 'start'],
    ['pt', 'uq'],
    ['nx', 'lg'],
    ['ve', 'GW'],
    ['start', 'nx'],
    ['GW', 'start'],
    ['GW', 'nx'],
    ['pt', 'SM'],
    ['sx', 'GW'],
    ['lg', 'end'],
    ['nx', 'SM'],
    ['lg', 'SM'],
    ['pt', 'nx'],
    ['end', 've'],
    ['ve', 'SM'],
    ['TG', 'uq'],
    ['end', 'SM'],
    ['SM', 'uq'],
];

export function isBig(s: string): boolean {
    return s === s.toUpperCase();
}

export const input12mini = [
    ['start', 'A'],
    ['start', 'b'],
    ['A', 'c'],
    ['A', 'b'],
    ['b', 'd'],
    ['A', 'end'],
    ['b', 'end'],
];

export const input12small = [
    ['dc', 'end'],
    ['HN', 'start'],
    ['start', 'kj'],
    ['dc', 'start'],
    ['dc', 'HN'],
    ['LN', 'dc'],
    ['HN', 'end'],
    ['kj', 'sa'],
    ['kj', 'HN'],
    ['kj', 'dc'],
];

export const input12mid = [
    ['fs', 'end'],
    ['he', 'DX'],
    ['fs', 'he'],
    ['start', 'DX'],
    ['pj', 'DX'],
    ['end', 'zg'],
    ['zg', 'sl'],
    ['zg', 'pj'],
    ['pj', 'he'],
    ['RW', 'he'],
    ['fs', 'DX'],
    ['pj', 'RW'],
    ['zg', 'RW'],
    ['start', 'pj'],
    ['he', 'WI'],
    ['zg', 'he'],
    ['pj', 'fs'],
    ['start', 'RW'],
];
