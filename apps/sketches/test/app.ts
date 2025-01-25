import { Paper } from "@psicomante/paper";
import p5 from "p5";
import { convert } from "@psicomante/paper/src/convert";
import { makeP5Sketch } from "@psicomante/sketch.p5";

const paintAll = (p: p5, page: Paper, params: Record<string, any>) => {
	p.clear(0, 0, 0, 1);

	let seed = params["seed"];
	let size = params["size"];
	let margin = params["margin"];

	p.randomSeed(seed);
	// p.strokeWeight(CONSTANT1);
	const [w, h] = page.getViewSize();
	const stas = page.getStats();
	console.log(stas);

	let sizeInpxl = convert(2.2, "mm", "px", {
		dpi: 150,
		roundToPixel: true,
		precision: 0
	});

	const ratio = stas.pageSize![0] / w;

	const sizedd = sizeInpxl/ratio;
	console.log(sizeInpxl, ratio, sizedd, Math.round(sizedd));

	p.strokeWeight(Math.round(sizedd));
	p.noFill();
	// p.strokeWeight(8);
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
		default: 1000,
		events: [paintAll]
	},
	{ name: "size", min: 2, max: 200, step: 2, default: 30 },
	{ name: "margin", min: 0, max: 200, step: 5, default: 40 }
];

document.addEventListener("DOMContentLoaded", () => {
	makeP5Sketch(
		"test-p5",
		{
			size: "A4",
			dpi: 96,
			orientation: "landscape",
			margin: 60
		},
		paintAll,
		ui
	);
});
