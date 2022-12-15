import { Matrix } from './matrix';
import { Point } from './point-2d';
import { Possible } from './util-types';

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

    manhattanDistance(v: Vector3): number {
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

    static fromKey(s: string): Point3 {
        return new Point3(JSON.parse(s) as number[]);
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

    get key(): string {
        return this.toString();
    }

    adjacents(diagonals = false): Point3[] {
        
        if (!diagonals) {
            return [
                new Point3([this.x-1, this.y, this.z]),
                new Point3([this.x+1, this.y, this.z]),
                new Point3([this.x, this.y-1, this.z]),
                new Point3([this.x, this.y+1, this.z]),
                new Point3([this.x, this.y, this.z-1]),
                new Point3([this.x, this.y, this.z+1]),
            ];
        }

        const result: Point3[] = [];
        
        for (const x of [-1, 0, 1]) {
            for (const y of [-1, 0, 1]) {
                for (const z of [-1, 0, 1]) {
                    if (!(x === 0 && y=== 0 && z === 0)) {
                        result.push(new Point3([this.x + x, this.y + y, this.z + z]));
                    }
                }
            }
        }
        return result;
    }
}

export class BoundingBox3 {
    public min: Vector3;
    public max: Vector3;

    constructor(one: Vector3, two: Vector3) {
        this.min = Vector3.fromCoordinates(Math.min(one.x, two.x), Math.min(one.y, two.y), Math.min(one.z, two.z));
        this.max = Vector3.fromCoordinates(Math.max(one.x, two.x), Math.max(one.y, two.y), Math.max(one.z, two.z));
    }

    static fromCoordinates(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): BoundingBox3 {
        return new BoundingBox3(
            Vector3.fromCoordinates(x1, y1, z1),
            Vector3.fromCoordinates(x2, y2, z2),
        );
    }

    intersects(bb: BoundingBox3): boolean {
        return ((Math.abs((this.min.x + (this.width * .5)) - (bb.min.x + bb.width * .5)) * 2) < (this.width + bb.width))
            && ((Math.abs((this.min.y + (this.height * .5)) - (bb.min.y + bb.height * .5)) * 2) < (this.height + bb.height))
            && ((Math.abs((this.min.z + (this.depth * .5)) - (bb.min.z + bb.depth * .5)) * 2) < (this.depth + bb.depth));
            
    }

    containsPoint(v: Vector3): boolean {
        return v.x >= this.min.x && v.x <= this.max.x &&
            v.y >= this.min.y && v.y <= this.max.y &&
            v.z >= this.min.z && v.z <= this.max.z;
    }

    get height(): number {
        return this.max.y - this.min.y;
    }

    get width(): number {
        return this.max.x - this.min.x;
    }

    get depth(): number {
        return this.max.z - this.min.z;
    }

    get volume(): number {
        return this.height * this.width * this.depth;
    }

    get lowLeftShallow(): Vector3 {
        return this.min.clone();
    }

    get lowLeftDeep(): Vector3 {
        return Vector3.fromCoordinates(this.min.x, this.min.y, this.max.z);
    }

    get lowRightShallow(): Vector3 {
        return Vector3.fromCoordinates(this.max.x, this.min.y, this.min.z);
    }

    get lowRightDeep(): Vector3 {
        return Vector3.fromCoordinates(this.max.x, this.min.y, this.max.z);
    }

    get highLeftShallow(): Vector3 {
        return Vector3.fromCoordinates(this.min.x, this.max.y, this.min.z);
    }

    get highLeftDeep(): Vector3 {
        return Vector3.fromCoordinates(this.min.x, this.max.y, this.max.z);
    }

    get highRightShallow(): Vector3 {
        return Vector3.fromCoordinates(this.max.x, this.max.y, this.min.z);
    }

    get highRightDeep(): Vector3 {
        return this.max.clone();
    }

    get corners(): Vector3[] {
        return [
            this.lowLeftShallow,
            this.lowLeftDeep,
            this.lowRightShallow,
            this.lowRightDeep,
            this.highLeftShallow,
            this.highLeftDeep,
            this.highRightShallow,
            this.highRightDeep,
        ];
    }

    /**
     * Finds the intersection between this bounding box and the pased in one, if any exists.
     * @param bb 
     * @returns 
     */
    intersection(bb: BoundingBox3): Possible<BoundingBox3> {
        if (!this.intersects(bb)) {
            return;
        }

        const min = Vector3.fromCoordinates(Math.max(this.min.x, bb.min.x), Math.max(this.min.y, bb.min.y), Math.max(this.min.z, bb.min.z));
        const max = Vector3.fromCoordinates(Math.min(this.max.x, bb.max.x), Math.min(this.max.y, bb.max.y), Math.min(this.max.z, bb.max.z));
        return new BoundingBox3(min, max);
    }

    /**
     * Finds the intersection between this and the passed in bounding box. Also finds a set of bounding boxes within the
     * passed in box that exclude the intersection.
     * @param bb 
     * @returns 
     */
    intersectionAndRemainder(bb: BoundingBox3): Possible<{segments: BoundingBox3[], intersection: BoundingBox3}> {
        const intersection = this.intersection(bb);
        if (intersection === undefined) {
            return;
        }

        const segments: BoundingBox3[] = [];

        if (intersection.max.y < bb.max.y) {
            // top hamburger bun
            segments.push(new BoundingBox3(Vector3.fromCoordinates(bb.min.x, intersection.max.y, bb.min.z), bb.max));
        }
        if (intersection.min.y > bb.min.y) {
            // bottom hamburger bun
            segments.push(new BoundingBox3(bb.min, Vector3.fromCoordinates(bb.max.x, intersection.min.y, bb.max.z)));
        }
        if (intersection.max.x < bb.max.x) {
            // right french fry
            segments.push(new BoundingBox3(Vector3.fromCoordinates(intersection.max.x, intersection.min.y, bb.min.z), Vector3.fromCoordinates(bb.max.x, intersection.max.y, bb.max.z)));
        }
        if (intersection.min.x > bb.min.x) {
            // left french fry
            segments.push(new BoundingBox3(Vector3.fromCoordinates(bb.min.x, intersection.min.y, bb.min.z), Vector3.fromCoordinates(intersection.min.x, intersection.max.y, bb.max.z)));
        }
        if (intersection.max.z < bb.max.z) {
            // back dot
            segments.push(new BoundingBox3(intersection.lowLeftDeep, Vector3.fromCoordinates(intersection.max.x, intersection.max.y, bb.max.z)));
        }
        if (intersection.min.z > bb.min.z) {
            // front dot
            segments.push(new BoundingBox3(Vector3.fromCoordinates(intersection.min.x, intersection.min.y, bb.min.z), intersection.highRightShallow));
        }

        return {
            intersection,
            segments
        };
    }

    descriptionString(): string {
        return `${this.width}x${this.height}x${this.depth}, ${this.min.toString()}, ${this.max.toString()}`;
    }

    equals(other: BoundingBox3): boolean {
        return this.min.equals(other.min) && this.max.equals(other.max);
    }
}