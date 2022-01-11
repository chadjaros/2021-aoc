import { input16 } from './input';

const input = input16;

const key = new Map(Object.entries({
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
}));

const result = input.filter((x) => [...x.props.entries()].every(([k, v]) => {
    if (k === 'cats' || k === 'trees') {
        return key.get(k)! < v;
    }
    else if (k === 'pomeranians' || k === 'goldfish') {
        return key.get(k)! > v;
    }
    return key.get(k) === v;
}));

console.log(...result.map((x) => x.name.split(' ')[1]));
