import { Matrix } from './matrix';

export class Vector3 extends Matrix {

    constructor(m: number[][]) {
        if (m.length !== 3 || m[0].length !== 1) {
            throw new Error('Invalid matrix size, must be 3x1');
        }
        super(m);
    }

    static fromCoordinates(x: number, y: number,z: number): Vector3 {
        return new Vector3([[x],[y],[z]]);
    }

    static fromMatrix(m: Matrix): Vector3 {
        return new Vector3(m.matrix);
    }

    get x(): number {
        return this.matrix[0][0];
    }

    get y(): number {
        return this.matrix[1][0];
    }

    get z(): number {
        return this.matrix[2][0];
    }

    get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    unit(): Vector3 {
        const mag = 1 / this.magnitude;
        return Vector3.fromCoordinates(this.x * mag, this.y * mag, this.z * mag);
    }

    manhattan(v: Vector3): number {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
    }
}

export class Point3 {

    protected array: number[];

    constructor(m: number[]) {
        if (m.length !== 3 ) {
            throw new Error('Array must be length 3');
        }
    }

    static fromCoordinates(x: number, y: number,z: number): Point3 {
        return new Point3([x,y,z]);
    }

    static parse(s: string): Point3 {
        const x = JSON.parse(s) as number[];
        return new Point3(x);
    }

    get x(): number {
        return this.array[0];
    }

    get y(): number {
        return this.array[1];
    }

    get z(): number {
        return this.array[2];
    }

    vectorTo(p: Point3): Vector3 {
        return Vector3.fromCoordinates(this.x - p.x, this.y - p.y, this.z - p.z);
    }

    get sum(): number {
        return this.x + this.y + this.z;
    }

    toString(): string {
        return JSON.stringify(this.array);
    }
}
