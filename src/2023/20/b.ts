import { aoc } from '../../ts-utils/aoc';
import { AdvMath } from '../../ts-utils/adv-math';
import { Series } from '../../ts-utils/series';

type Signal = boolean;

interface Record {
    from: string;
    to: string;
    signal: Signal;
}

class Module {
    constructor(
        readonly name: string,
        readonly inputs: string[],
        readonly outputs: string[],
        public type?: string,
    ) { }

    processInput(from: string, signal: Signal): Record[] {
        return [];
    }

    send(to: string, signal: Signal): Record {
        return { to, signal, from: this.name };
    }

    get constructorArgs(): ConstructorParameters<typeof Module> {
        return [this.name, this.inputs, this.outputs, this.type];
    }
}

class Broadcast extends Module {

    processInput(from: string, signal: Signal): Record[] {
        return this.outputs.map((to) =>
            this.send(to, false)
        );
    }
}

class FlipFlop extends Module {
    state = false;

    processInput(from: string, signal: Signal): Record[] {
        if (signal === false) {
            this.state = !this.state;
            return this.outputs.map((to) =>
                this.send(to, this.state)
            );
        }
        return [];
    }
}

class Conjunction extends Module {

    readonly state: Map<string, Signal>;
    constructor(...args: ConstructorParameters<typeof Module>) {
        super(...args);
        const inputs = args[1];
        this.state = new Map(inputs.map((_) => [_, false]));
    }

    processInput(from: string, signal: boolean): Record[] {
        this.state.set(from, signal);
        const allHigh = Array.from(this.state.values()).every((_) => _);
        return this.outputs.map((to) =>
            this.send(to, !allHigh)
        );
    }
}

const regex = /([%&]?)(\w+) -> (.*)/;

aoc((infile) => {
    const rawModules = infile.lines.reduce((acc, line) => {
        const match = line.match(regex)!;
        const name = match[2];
        const type = name === 'broadcaster' ? name : match[1];
        const outputs = match[3].split(', ');

        if (!acc.has(name)) {
            acc.set(name, new Module(name, [], outputs, type));
        }
        else {
            const mod = acc.get(name)!;
            mod.type = type;
            mod.outputs.push(...outputs);
        }

        outputs.forEach((_) => {
            if (!acc.has(_)) {
                acc.set(_, new Module(_, [], []));
            }
            const mod = acc.get(_)!;
            mod.inputs.push(name);
        });

        return acc;
    }, new Map<string, Module>());


    const modules = new Map<string, Module>(Array.from(rawModules.entries()).map(([name, mod]) => {
        if (mod.type === 'broadcaster') {
            return [name, new Broadcast(...mod.constructorArgs)];
        }
        else if (mod.type === '%') {
            return [name, new FlipFlop(...mod.constructorArgs)];
        }
        else if (mod.type === '&') {
            return [name, new Conjunction(...mod.constructorArgs)];
        }
        return [name, mod];
    }));


    const pushButton = (modules: Map<string, Module>, targets: Set<string>): Set<string> => {
        const queue: Record[] = [{ from: 'button', to: 'broadcaster', signal: false }];

        const result = new Set<string>();
        while (queue.length > 0) {
            const sig = queue.pop()!;

            if (targets.has(sig.from) && sig.signal) {
                result.add(sig.from);
            }

            const mod = modules.get(sig.to)!;
            const next = mod.processInput(sig.from, sig.signal);
            queue.push(...next);
        }

        return result;
    };

    const rx = modules.get('rx');
    const before = rx?.inputs.map((_) => modules.get(_));
    const targets = new Set(before?.[0]?.inputs ?? []);
    const results = new Map([...targets.values()].map((_) => [_, { loop: -1, offset: 0, seenTwice: false }]));

    let idx = 0;
    while ([...results.values()].some((_) => !_.seenTwice)) {
        idx++;
        const found = pushButton(modules, targets);

        found.forEach((_) => {
            const r = results.get(_)!;
            if (r.loop < 0) {
                results.set(_, { ...r, loop: idx });
            }
            else if (!r.seenTwice) {
                r.seenTwice = true;
                const loop = idx - r.loop;
                const offset = r.loop - loop;
                results.set(_, { ...r, loop, offset });
            }
            console.log(idx, found, results.get(_));
        });
    }


    // 3, 5 => 15
    // 3o1
    // 4, 7, 10 => 10
    // 3o2 => 5
    // 304
    // 7, 10 => 10

    const values = [...results.values()];

    const gcd = AdvMath.gcd(values.map((_) => _.loop));
    const lcm = AdvMath.lcm(values.filter((_) => _.offset === 0).map((_) => _.loop));

    let value = lcm;
    console.log(value, values.map((_) => ({ ..._, current: value % _.loop })));
    while (!values.every((_) => value % _.loop === _.offset)) {
        value += lcm;
        console.log(value, values.map((_) => ({ ..._, current: value % _.loop })));
    }

    return { value: AdvMath.lcm([...results.values()].map((_) => _.loop)) };
});
