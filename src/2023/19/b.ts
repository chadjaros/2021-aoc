import { aoc } from '../../ts-utils/aoc';
import { Range } from '../../ts-utils/range';
import { Possible } from '../../ts-utils/util-types';

interface Rule {
    cat: string;
    op: string;
    val: number;
    then: string;
}

interface Wf {
    name: string;
    rules: Rule[];
}

const ruleRegex = /(\w+)([<>])(\d+):(\w+)/;

type Part = Map<string, Range>;
const clonePart = (p: Part, replace?: [string, Range]): Part => {
    const clone = new Map(p);
    if (replace) {
        clone.set(...replace);
    }
    return clone;
};

interface Result { part: Part, next: string; }

aoc((infile) => {
    const wfs = infile.lines
        .reduce<Map<string, Wf>>((acc, line) => {
            if (line.length > 0 && !line.startsWith('{')) {
                const [name, ruleStr] = line.split('{');

                const rules = ruleStr
                    .substring(0, ruleStr.length - 1)
                    .split(',')
                    .map((_) => {
                        const matches = _.match(ruleRegex);
                        if (!matches) {
                            return { cat: '', op: '!', val: Infinity, then: _ };
                        }
                        else {
                            return { cat: matches[1], op: matches[2], val: parseInt(matches[3]), then: matches[4] };
                        }
                    });

                acc.set(name, {
                    name,
                    rules
                });

            }
            return acc;
        }, new Map());


    const doRules = (rules: Rule[], part: Part): Result[] => {
        let current = part;
        const result: Result[] = [];
        for (const rule of rules) {
            const range = current.get(rule.cat)!;
            if (range === undefined) {
                result.push({ part: current, next: rule.then });
            }
            else if (rule.op === '<') {
                const inBound = rule.val - 1;

                const insect = range.intersection(new Range(-Infinity, inBound));
                if (insect) {
                    result.push({ part: clonePart(current, [rule.cat, insect]), next: rule.then });
                }
                const outsect = range.intersection(new Range(rule.val, Infinity));
                if (outsect) {
                    current = clonePart(current, [rule.cat, outsect]);
                }
            }
            else if (rule.op === '>') {
                const inBound = rule.val + 1;

                const insect = range.intersection(new Range(inBound, Infinity));
                if (insect) {
                    result.push({ part: clonePart(current, [rule.cat, insect]), next: rule.then });
                }
                const outsect = range.intersection(new Range(-Infinity, rule.val));
                if (outsect) {
                    current = clonePart(current, [rule.cat, outsect]);
                }
            }
        }
        return result;
    };

    const defaultRange = new Range(1, 4000);
    const startPart = new Map([['x', defaultRange.clone()], ['m', defaultRange.clone()], ['a', defaultRange.clone()], ['s', defaultRange.clone()]]);

    const result: Result[] = [];

    const stack = [{ part: startPart, next: 'in' }];
    let i = 0;
    while (stack.length > 0) {
        i++;
        const current = stack.shift()!;
        const wf = wfs.get(current.next)!;

        const next = doRules(wf.rules, current.part)
            .filter((_) => {
                if (_.next === 'R') {
                    return false;
                }
                else if (_.next === 'A') {
                    result.push(_);
                    return false;
                }
                return true;
            });

        stack.push(...next);
    }

    const value = result.reduce((acc, v) => {
        return acc + [...v.part.values()].reduce((iacc, r) => {
            return iacc * r.length;
        }, 1);
    }, 0);
    return { value };
});
