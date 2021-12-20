export type MatrixConstructor<T extends Matrix> = new (m: number[][]) => T;

export class Matrix {

    public readonly matrix: number[][];

    constructor(m: number[][]) {
        this.matrix = [];
        m.forEach((row) => {
            const r: number[] = [];
            this.matrix.push(r);
            row.forEach((v) => {
                r.push(v);
            });
        });
    }

    get height(): number {
        return this.matrix.length;
    }

    get width(): number {
        return this.matrix[0].length;
    }

    getValue(x: number, y: number): number {
        return this.matrix[y][x];
    }

    dot(other: Matrix): Matrix {
        if (this.width != other.height) {
            throw new Error(`Mismatch matrix sizes ${this.width}x${this.height}, ${other.width}x${other.height}`);
        }

        const m: number[][] = [];

        for (let i = 0; i < this.height; i++) {
            const n: number[] = [];
            m.push(n);
            for (let j = 0; j < other.width; j++) {
                n.push(0);
                for (let x = 0; x < this.width; x++) {
                    n[j] += this.matrix[i][x] * other.matrix[x][j];
                }
            }
        }

        return new Matrix(m);
    }

    transpose(): Matrix {
        const m: number[][] = [];

        for (let x = 0; x < this.width; x++) {
            const n: number[] = [];
            m.push(n);
            for (let y = 0; y < this.height; y++) {
                n.push(this.matrix[y][x]);
            }
        }

        return new Matrix(m);
    }

    toString(): string {
        return JSON.stringify(this.matrix);
    }

    times(v: number): this {

        const m: number[][] = [];

        for (let y = 0; y < this.height; y++) {
            const n: number[] = [];
            m.push(n);
            for (let x = 0; x < this.width; x++) {
                n.push(this.matrix[y][x] * v);
            }
        }

        return new (this.constructor as MatrixConstructor<this>)(m);
    }

    minus(v: this): this {
        if (this.width !== v.width || this.height !== v.height) {
            throw new Error('Invalid matrix size, must be ${this.height}x${this.width}');
        }

        const m: number[][] = [];

        for (let y = 0; y < this.height; y++) {
            const n: number[] = [];
            m.push(n);
            for (let x = 0; x < this.width; x++) {
                n.push(this.matrix[y][x] - v.matrix[y][x]);
            }
        }

        return new (this.constructor as MatrixConstructor<this>)(m);
    }

    plus(v: this): this {
        if (this.width !== v.width || this.height !== v.height) {
            throw new Error('Invalid matrix size, must be ${this.height}x${this.width}');
        }

        const m: number[][] = [];

        for (let y = 0; y < this.height; y++) {
            const n: number[] = [];
            m.push(n);
            for (let x = 0; x < this.width; x++) {
                n.push(this.matrix[y][x] + v.matrix[y][x]);
            }
        }

        return new (this.constructor as MatrixConstructor<this>)(m);
    }

    equals(other: Matrix): boolean {
        if (this.width !== other.width || this.height !== other.height) {
            return false;
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.matrix[y][x] !== other.matrix[y][x]) {
                    return false;
                }
            }
        }

        return true;
    }
}