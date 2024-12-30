import { Paper } from "@psicomante/paper";
import { createPaperUi } from "../common/paperUi";
import { declarePane } from "@psicomante/tweakpane-declarative";
import p5 from "p5";
import { createP5Sketch } from "../common/createSketch";

// @ts-ignore
let pinstance: p5 = undefined;

const paintAll = (p: p5, page: Paper, params: Record<string, any>) => {
	p.clear(0, 0, 0, 1);

	let seed = params["seed"];
	let size = params["size"];
	let margin = params["margin"];

	p.randomSeed(seed);
	const [w, h] = page.getViewSize();

	const stepX = (w - margin * 2) / (size - 1);
	const stepY = (h - margin * 2) / (size - 1);

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			let radius = p.random(0, 10);
			p.ellipse(margin + x * stepX, margin + y * stepY, radius, radius);
		}
	}
};

let ui = [
    {
        name: "seed",
        min: 0,
        max: 100000,
        step: 1,
        default: 1000
    },
    { name: "size", min: 2, max: 200, step: 2, default: 30 },
    { name: "margin", min: 0, max: 200, step: 5, default: 40 }
];

document.addEventListener("DOMContentLoaded", () => {
	const page = new Paper(document.body, {
		size: "A4",
		dpi: 72,
		orientation: "landscape",
		margin: 60
	});

	page.setup();

	const [w, h] = page.getViewSize();
	const p = new p5(createP5Sketch(w, h, (p: p5) => {
        pinstance = p;
    }), document.getElementById("sketch"));

	const drawSketch = () => {
		paintAll(pinstance, page, params);
	};

	const paperUi = createPaperUi(page, () => {
		if (pinstance === undefined) {
			return;
		}

		const [w, h] = page.getViewSize();

		pinstance.resizeCanvas(w, h);
		drawSketch();
	});

	ui = ui.concat(paperUi);

	let [pane, params] = declarePane(ui, {
		title: "Test Unicore.Plotter",
		expanded: true
	});

	pane.addButton({ title: "draw" }).on("click", () => {
		drawSketch();
	});
});
