import { aoc } from '../../ts-utils/aoc';

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

type Part = Map<string, number>;

const ruleRegex = /(\w+)([<>])(\d+):(\w+)/;

aoc((infile) => {
    const { wfs, parts } = infile.lines
        .reduce<{
            wfs: Map<string, Wf>;
            parts: Part[];
        }>((acc, line) => {
            if (line.length > 0) {
                if (line.startsWith('{')) {
                    acc.parts.push(new Map(line.substring(1, line.length - 1).split(',').map((_) => {
                        const [key, value] = _.split('=');
                        return [key, parseInt(value)];
                    })));
                }
                else {
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

                    acc.wfs.set(name, {
                        name,
                        rules
                    });
                }
            }
            return acc;
        }, { wfs: new Map<string, Wf>(), parts: [] });


    const doRules = (rules: Rule[], part: Part): string => {
        for (const rule of rules) {
            if (rule.op === '<') {
                if (part.get(rule.cat)! < rule.val) {
                    return rule.then;
                }
            }
            else if (rule.op === '>') {
                if (part.get(rule.cat)! > rule.val) {
                    return rule.then;
                }
            }
            else if (rule.op === '!') {
                return rule.then;
            }

        }
        throw new Error('fail');
    };

    const value = parts
        .filter((part) => {

            let curr: string = 'in';
            while (!(curr === 'A' || curr === 'R')) {
                const wf = wfs.get(curr)!;
                curr = doRules(wf.rules, part);
            }

            return curr === 'A';
        })
        .reduce((acc, part) => acc + Array.from(part.values()).reduce((acc, v) => acc + v, 0), 0);
    return { value };
});
