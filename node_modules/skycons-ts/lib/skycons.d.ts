import { DrawFunction } from "./DrawFunction";
import { IconKey } from "./icons";
export interface IConstructorOptions {
    color: string;
    resizeClear: boolean;
}
export interface IIconElement {
    element: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    drawing: DrawFunction;
}
export declare class Skycons {
    private interval;
    private readonly list;
    private readonly opts;
    constructor(opts?: IConstructorOptions);
    add(elementOrId: string | HTMLCanvasElement, draw: IconKey): void;
    set(elementOrId: string | HTMLCanvasElement, draw: IconKey): void;
    remove(elementOrId: string | HTMLCanvasElement): void;
    draw(obj: IIconElement, time: number): void;
    play(): void;
    pause(): void;
    private getCanvas;
}
