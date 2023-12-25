import { ArrayUtils } from './array-utils';

interface Phase {
    period: number;
    offset?: number;
}

export class AdvMath {

    static alignPhase(phases: Phase[]): Phase {

        let current: Phase = phases[0];

        for (const p of ArrayUtils.tail(phases)) {

            const offset = p.offset ?? 0;

            if (offset !== 0) {
                const periodDiff = this.gcd([current.period, p.period]);
                const offsetDiff = offset - (current.offset ?? 0);
                const periodsToAlgin = periodDiff / offsetDiff;
                const alignPeriodFit = periodDiff % offsetDiff;
                console.log(periodDiff, offsetDiff);
                if (alignPeriodFit !== 0) {
                    throw new Error(
                        'No solution'
                    );
                }
            }
            else {
                current = { period: this.lcm([p.period, current.period]) };
            }
        }

        return current;
    }

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

    static gcd(nums: number[]): number {
        const factors = nums.map((_) => this.factors(_).reverse());
        return factors[0].find((x) => factors.every((y) => y.includes(x)))!;
    }

    static lcm(nums: number[]): number {
        return nums.reduce((acc, _) => acc * _ / this.gcd([acc, _]), 1);
    }

}