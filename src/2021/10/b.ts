import { Chunk, input10, input10mini, lookup10 } from './input';
import { Stack } from '../../ts-utils/stack';

function main() {
    const completionScores: number[] = [];

    for (const s of input10) {
        const stack = new Stack<Chunk>();

        let isCorrupt = false;
        for (const l of s) {
            const chunk = lookup10.get(l)!;

            if (l === chunk.start) {
                stack.push(chunk);
            } else if (l === chunk.end && l === stack.end.end) {
                stack.pop();
            } else if (l === chunk.end) {
                // corrupt
                // console.log('corrupt', l, 'expected', lookup10.get(stack.end)?.end, 'position', position);
                stack.pop();
                isCorrupt = true;
            }
        }

        if (!isCorrupt && stack.size > 0) {
            let sum = 0;
            while (stack.size > 0) {
                sum = sum * 5 + stack.pop()?.otherValue!;
            }
            completionScores.push(sum);
        }
    }

    completionScores.sort((a, b) => a - b);
    console.log(
        completionScores.length,
        Math.floor(completionScores.length / 2)
    );
    console.log(completionScores[Math.floor(completionScores.length / 2)]);
}

main();
