export class Factor {

    static factors(n: number): number[] {
        const results: number[] = [1];
        for (let r = 2; r < Math.sqrt(n); r++) {
            const potential = n / r;
            if (Number.isInteger(potential)) {
                results.push(r);
                results.push(potential);
            }
        }
        results.push(n);
        return results.sort((a, b) => a - b);
    }

    static greatestCommonFactor(nums: number[]): number {
        const factors = nums.map((_) => this.factors(_).reverse());
        return factors[0].find((x) => factors.every((y) => y.includes(x)))!;
    }

    static leastCommonMultiple(nums: number[]): number {
        return nums.reduce((acc, _) => acc * _ / this.greatestCommonFactor([acc, _]), 1);
    }

}