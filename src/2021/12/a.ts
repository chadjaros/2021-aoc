import { input12, input12mid, input12mini, input12small, isBig } from './input';

const nodes = new Map<string, Set<string>>();

input12.forEach((x) => {
    x.forEach((n) => {
        if (!nodes.has(n)) {
            nodes.set(n, new Set());
        }
    });

    nodes.get(x[0])?.add(x[1]);
    nodes.get(x[1])?.add(x[0]);
});

// console.log(nodes);

const paths: string[][] = [];

function getPaths(start: string, end: string, current: string[], visited: Set<string>): void {

    // console.log('getpaths', start, current);

    if (start === end) {
        paths.push([...current, start]);
        return;
    }
    else if (visited.has(start)) {
        return;
    }

    const cNext = [...current, start];
    let vNext = visited;
    if (!isBig(start)) {
        vNext = new Set([...visited, start]);
    }

    for (const n of nodes.get(start)!) {
        getPaths(n, end, cNext, vNext);
    }
}

getPaths('start', 'end', [], new Set());

const s = new Set(paths.map((p) => p.join(',')));
// console.log(s);
console.log(s.size);
