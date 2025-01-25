import init, { p5SVG } from "p5.js-svg";
import p5 from "p5";
import { PathsGroup } from "@psicomante/tstudo";

export { makeP5Sketch } from "./makeSketch";

export function makeP5(w: number, h: number, onSetup: (p: p5) => void) {
	const sketch = (p: p5) => {
		p.setup = () => {
			init(p5);
			const psvg: p5SVG = p as p5SVG;
			psvg.createCanvas(w, h, psvg.SVG) as unknown as p5.Renderer;
			p.noLoop();

			onSetup(p);
		};
	};

	return sketch;
}

export function addLayer(p: p5, name: string = "layer") {
	let ctx = ((p as any)._renderer as any).drawingContext;
	let rootGroup = ctx.__root.childNodes[1];

	let g = (p5 as any).SVGElement.create("g");
	// (g.elt as SVGElement).setAttribute(":inskacape:label", name);
	// (g.elt as SVGElement).setAttribute(":inskacape:groupmode", 'label');
	rootGroup.appendChild(g.elt);

	ctx.__currentElement = g.elt;
}


export function p5lineRenderer(groups: Array<PathsGroup>, p: p5) {
	groups.forEach((group, groupIdx) => {
        addLayer(p, `layer-${groupIdx + 1}`);

		group.forEach(path => {
            p.beginShape();

			path.forEach(segment => {
				const [x, y] = segment;				
				p.vertex(x, y);
			});

            p.endShape();
		});
	});
}