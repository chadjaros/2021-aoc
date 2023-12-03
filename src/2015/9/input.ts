import { Node } from '../../ts-utils/graph';

const raw = `Faerun to Norrath = 129
Faerun to Tristram = 58
Faerun to AlphaCentauri = 13
Faerun to Arbre = 24
Faerun to Snowdin = 60
Faerun to Tambi = 71
Faerun to Straylight = 67
Norrath to Tristram = 142
Norrath to AlphaCentauri = 15
Norrath to Arbre = 135
Norrath to Snowdin = 75
Norrath to Tambi = 82
Norrath to Straylight = 54
Tristram to AlphaCentauri = 118
Tristram to Arbre = 122
Tristram to Snowdin = 103
Tristram to Tambi = 49
Tristram to Straylight = 97
AlphaCentauri to Arbre = 116
AlphaCentauri to Snowdin = 12
AlphaCentauri to Tambi = 18
AlphaCentauri to Straylight = 91
Arbre to Snowdin = 129
Arbre to Tambi = 53
Arbre to Straylight = 40
Snowdin to Tambi = 15
Snowdin to Straylight = 99
Tambi to Straylight = 70`;

export const input9 = raw.split('\n').reduce((nodes, x) => {
    const splits = x.split(' ');

    const a = splits[0];
    const b = splits[2];
    const distance = parseInt(splits[4]);

    if (!nodes.has(a)) {
        nodes.set(a, { id: a, edges: [] });
    }
    if (!nodes.has(b)) {
        nodes.set(b, { id: b, edges: [] });
    }

    nodes.get(a)?.edges.push({ nodeId: b, weight: distance });
    nodes.get(b)?.edges.push({ nodeId: a, weight: distance });

    return nodes;
}, new Map<string, Node>());
