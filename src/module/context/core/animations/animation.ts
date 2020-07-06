import {IRectangle} from "../gameObjects/gameObject";

export default class Animation{
    private _name: string;
    private _begin: number;
    private _end: number;
    private _delay: number;

    constructor(name: string, begin: number, end: number, delay: number) {
        this._name = name;
        this._begin = begin;
        this._end = end;
        this._delay = delay;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get begin(): number {
        return this._begin;
    }

    set begin(value: number) {
        this._begin = value;
    }

    get end(): number {
        return this._end;
    }

    set end(value: number) {
        this._end = value;
    }

    get delay(): number {
        return this._delay;
    }

    set delay(value: number) {
        this._delay = value;
    }

}