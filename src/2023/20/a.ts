import { aoc } from '../../ts-utils/aoc';
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


    const pushButton = (modules: Map<string, Module>): { high: number, low: number; } => {
        const queue: Record[] = [{ from: 'button', to: 'broadcaster', signal: false }];

        const result = { high: 0, low: 0 };
        while (queue.length > 0) {
            const sig = queue.pop()!;

            if (sig.signal) {
                result.high++;
            }
            else {
                result.low++;
            }

            const mod = modules.get(sig.to)!;
            const next = mod.processInput(sig.from, sig.signal);
            queue.push(...next);
        }

        return result;
    };


    const result = Array.from(Series.to(1, 1000)).reduce<{ low: number, high: number; }>((acc) => {
        const pushResult = pushButton(modules);
        return { low: acc.low + pushResult.low, high: acc.high + pushResult.high };
    }, { low: 0, high: 0 });


    return { value: result.low * result.high };
});
