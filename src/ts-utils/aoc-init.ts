import { dirname, join } from 'path';
import { fetchInputFile } from './aoc';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const init = async (): Promise<void> => {

    const file =
        `import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    const input = infile.lines;

    const value = 0;
    return { value };
});
`;

    const path = process.argv[2];
    if (!path.match(/^\d+\/\d+$/)) {
        throw new Error(`Invalid file path provided '${path}'`);
    }

    const dir = join(dirname(__dirname), path);

    if (!existsSync(dir)) {
        console.log(`Creating directory: ${dir}`);
        mkdirSync(dir);
    }

    const aFile = join(dir, 'a.ts');
    if (!existsSync(aFile)) {
        console.log(`Writing file: ${aFile}`);
        writeFileSync(aFile, file);
    }

    const bFile = join(dir, 'b.ts');
    if (!existsSync(bFile)) {
        console.log(`Writing file: ${bFile}`);
        writeFileSync(bFile, file);
    }

    await fetchInputFile(join(dir, 'input.txt'));
};

init();



