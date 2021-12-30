export class Timer {
    
    private _start = 0;
    private _end = 0;

    start(): this {
        this._start = Date.now();
        return this;
    }

    stop(): this {
        this._end = Date.now();
        return this;
    }

    get time() {
        return this._end - this._start;
    }

    reset(): this {
        this._end = 0;
        this._start = 0;
        return this;
    }
}