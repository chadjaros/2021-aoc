import { aoc } from '../../ts-utils/aoc';
import { Range } from '../../ts-utils/range';

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
interface Result { part: Part, result: string; }

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
        const current = part;
        const result: Result[] = [];
        for (const rule of rules) {
            const range = part.get(rule.cat)!;
            if (range === undefined) {
                result.push({ part: current, result: rule.then });
            }
            else if (rule.op === '<') {
                if (part.get(rule.cat)! < rule.val) {
                    return rule.then;
                }
            }
            else if (rule.op === '>') {
                if (part.get(rule.cat)! > rule.val) {
                    return rule.then;
                }
            }
        }
        return result;
    };

    const defaultRange = new Range(1, 4000);
    const startPart = new Map([['x', defaultRange.clone()], ['m', defaultRange.clone()], ['a', defaultRange.clone()], ['s', defaultRange.clone()]]);

    const result: Result[] = [];

    const stack = [{ part: startPart, wf: 'in' }];

    while (stack.length > 0) {
        const current = stack.shift()!;
        const rules = wfs.get(current.wf)!;



    }

    const value = 0;
    return { value };
});
