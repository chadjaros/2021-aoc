export class ALU {
    private inputs: number[];

    public vars = new Map<string, number>([
        ['w', 0],
        ['x', 0],
        ['y', 0],
        ['z', 0],
    ]);

    private count = 0;

    public operations = new Map<
        string,
        (a: string, b: string | number | undefined) => void
    >([
        ['inp', (a) => this.vars.set(a, this.getInput())],
        ['add', (a, b) => this.vars.set(a, this.getA(a) + this.getB(b))],
        ['mul', (a, b) => this.vars.set(a, this.getA(a) * this.getB(b))],
        [
            'div',
            (a, b) => {
                const bval = this.getB(b);
                if (bval === 0) throw new Error('div by zero');
                this.vars.set(a, Math.trunc(this.getA(a) / bval));
            },
        ],
        [
            'mod',
            (a, b) => {
                const aval = this.getA(a);
                if (aval < 0) throw new Error('mod of negative');
                const bval = this.getB(b);
                if (bval <= 0) throw new Error('mod by non-positive');
                this.vars.set(a, aval % bval);
            },
        ],
        [
            'eql',
            (a, b) => this.vars.set(a, this.getA(a) === this.getB(b) ? 1 : 0),
        ],
    ]);

    getA(v: string): number {
        return this.vars.get(v)!;
    }

    getB(value: string | number | undefined): number {
        if (typeof value === 'string') {
            return this.vars.get(value)!;
        }

        return value as number;
    }

    getInput(): number {
        const x = this.inputs.shift();
        if (!x) {
            throw new Error(`Invalid input '${x}'`);
        }
        return x;
    }

    reset(): void {
        this.vars.set('w', 0);
        this.vars.set('x', 0);
        this.vars.set('y', 0);
        this.vars.set('z', 0);
        this.count = 0;
    }

    run(
        v: number,
        instructions: [string, string, string | number | undefined][]
    ): boolean {
        this.inputs = `${v}`.split('').map((x) => parseInt(x));

        if (this.inputs.some((x) => x === 0)) {
            return false;
        }

        try {
            instructions.forEach((i) => {
                this.operations.get(i[0])!(i[1], i[2]);
                this.count++;
            });
        } catch (err) {
            return false;
        }

        return this.vars.get('z') === 0;
    }

    state() {
        return `w:${this.getA('w')} x:${this.getA('x')} y:${this.getA(
            'y'
        )} z:${this.getA('z')} c: ${this.count}`;
    }

    clone(): ALU {
        const x = new ALU();
        this.vars.forEach((value, key) => {
            x.vars.set(key, value);
        });
        x.count = this.count;
        return x;
    }
}
