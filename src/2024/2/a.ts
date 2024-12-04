import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    const value = infile.lines.map((_) =>
        _.split(' ').map((v) => parseInt(v))
    ).filter((report) => {
        const inc = report[0] - report[1] < 0;
        return report.every((_, idx) => {
            if (idx === 0) {
                return true;
            }
            const diff = Math.abs(report[idx] - report[idx - 1]);
            if (diff === 0 || diff > 3) {
                return false;
            }
            return inc === (report[idx - 1] - report[idx] < 0);
        });
    }).length;

    return { value };
});
