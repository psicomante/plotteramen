import { Paper, PaperOptions } from "@psicomante/paper";
import { makeP5 } from "@psicomante/sketch.p5";
import { createPaperUi } from "@psicomante/sketch.ui";
import { getTimeNow } from "@psicomante/sketch.utils";
import { Component, declarePane } from "@psicomante/tweakpane-declarative";
import p5 from "p5";

export function makeP5Sketch(
	name: string,
	options: PaperOptions & {
		margin: number;
	},
	drawSketch: (p: p5, paper: Paper, params: Record<string, any>) => void,
	uiComponents: Component[]
) {
	const page = new Paper(document.body, options);
	const container = page.setup();

	const [w, h] = page.getViewSize();
	let pinstance: p5;

	const p = new p5(
		makeP5(w, h, (p: p5) => {
			pinstance = p;

			let pane, params: any;

			const onUpdateFun = () => {
				const [w, h] = page.getViewSize();
				p.resizeCanvas(w, h);

				if (pinstance && params) {
					drawSketch(pinstance, page, params);
				}
			};

			const paperUi = createPaperUi(page, onUpdateFun);

			uiComponents.forEach(it => {
				if ("events" in it && it.events !== undefined) {
					let events = it.events;

					if (!Array.isArray(events)) {
						events = [events];
					}

					let newEvents: any[] = [];

					events.forEach(f => {
						newEvents.push(() => {
							f(pinstance, page, params);
						});
					});

					it.events = newEvents;
				}
			});

			uiComponents = uiComponents.concat(paperUi);

			[pane, params] = declarePane(uiComponents, {
				title: "Test Unicore.Plotter",
				expanded: true
			});

			drawSketch(pinstance, page, params);

			pane.addButton({ title: "draw" }).on("click", () => {
				drawSketch(pinstance, page, params);
			});

			pane.addButton({ title: "save svg" }).on("click", () => {
				p.save(`${name}_${getTimeNow()}.svg`);
			});
		}), container
	);
}
