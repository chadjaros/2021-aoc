import { input10, input10mini, lookup10 } from './input';
import { Stack } from '../../ts-utils/stack';

function main() {
    let sum = 0;

    for (const s of input10) {
        const stack = new Stack<string>();

        console.log(s);
        let position = 0;
        for (const l of s) {
            const chunk = lookup10.get(l)!;

            if (l === chunk.start) {
                stack.push(chunk.start);
            } else if (l === chunk.end && l === lookup10.get(stack.end)?.end) {
                stack.pop();
            } else if (l === chunk.end) {
                // corrupt
                console.log(
                    'corrupt',
                    l,
                    'expected',
                    lookup10.get(stack.end)?.end,
                    'position',
                    position
                );
                stack.pop();
                sum += chunk.value;
            }

            position++;
        }
    }

    console.log(sum);
}

main();
