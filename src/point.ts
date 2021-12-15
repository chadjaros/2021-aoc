export class Point {
    constructor(
        public x: number,
        public y: number
    ) {
    }

    adjacents(diagonals: boolean = false): Point[] {
        return []
    }
}
