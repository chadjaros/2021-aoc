export declare class Digit {
    readonly number: number;
    readonly panels: Set<string>;
    constructor(number: number, panels: Set<string>);
    get count(): number;
}
export declare const Digits: Map<number, Digit>;
export declare const input8: {
    input: string[];
    output: string[];
}[];
