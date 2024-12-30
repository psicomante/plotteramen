import init, { p5SVG } from "p5.js-svg";
import p5 from "p5";

export function createP5Sketch(w: number, h: number, onSetup: (p: p5) => void) {
    const sketch = (p: p5) => {
        p.setup = () => {
            init(p5);
            const psvg: p5SVG = p as p5SVG;
            psvg.createCanvas(w, h, psvg.SVG) as unknown as p5.Renderer;
            p.noLoop();

            onSetup(p)
        };
    };

    return sketch;
};