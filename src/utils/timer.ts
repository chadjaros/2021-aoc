import { performance } from 'perf_hooks';

export class Timer {
    
    private _start = 0;
    private _end = 0;

    start(): this {
        this._start = performance.now();
        return this;
    }

    stop(): this {
        this._end = performance.now();
        return this;
    }

    get time(): number {
        return this._end - this._start;
    }

    reset(): this {
        this._end = 0;
        this._start = 0;
        return this;
    }
}