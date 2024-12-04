import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {

    const safeCheck = (report: number[]): [boolean, number | undefined] => {
        const inc = report[0] - report[1] < 0;

        for (let idx = 0; idx < report.length - 1; idx++) {
            const diff = Math.abs(report[idx] - report[idx + 1]);
            if (diff === 0 || diff > 3) {
                return [false, idx];
            }
            else if (inc !== (report[idx] - report[idx + 1] < 0)) {
                return [false, idx];
            }
        }
        return [true, undefined];
    };


    const value = infile.lines.map((_) =>
        _.split(' ').map((v) => parseInt(v))
    ).filter((report) => {
        const natural = safeCheck(report);
        if (natural[0]) {
            return true;
        }

        const removeFirst = [...report];
        removeFirst.splice(natural[1]!, 1);
        const rfResult = safeCheck(removeFirst);
        if (rfResult[0]) {
            return true;
        }

        const removeSecond = [...report];
        removeSecond.splice(natural[1]! + 1, 1);
        const rsResult = safeCheck(removeSecond);
        if (rsResult[0]) {
            return true;
        }

        return safeCheck(report.slice(1))[0];
    }).length;

    return { value };
});
