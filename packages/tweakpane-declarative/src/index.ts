import { Pane } from "tweakpane";

export interface PaneConfig {
	/**
	 * The custom container element of the pane.
	 */
	container?: HTMLElement;
	/**
	 * The default expansion of the pane.
	 */
	expanded?: boolean;
	/**
	 * The pane title that can expand/collapse the entire pane.
	 */
	title?: string;
}

export interface Component {
	title?: string;
	label?: string;
	events?: Array<Function>;
	children?: Array<Component>,
	expanded?: boolean,
	type?: "folder" | "monitor" | "input" | "button" | "noop" | "separator";
	default?: any;
	name?: string;
}

export interface MonitorComponent extends Component {
	type: "monitor";
}

type Params = Record<string, any>;

function addMonitor(pane: Pane, component: Component, params: Params) {
	pane.addBinding(params, component.name, {...{
		readonly: true,
		interval: 1000
	}, ...component});
}

function addInput(pane: Pane, component: Component, params: Params) {
	const added = pane.addBinding(params, component.name, {...{
		
	}, ...component});

	let events = component.events;

	if (events !== undefined && Array.isArray(events)) {
		added.on("change", (ev) => {
			events.forEach(cb => {
				cb(ev);
			});
		});
	}
}

function addButton(pane: Pane, component: Component, params: Params) {
	const added = pane.addButton({
		title: component.title ?? component.name,
		label: component.label ?? component.name
	});

	let events = component.events;

	if (events !== undefined && Array.isArray(events)) {
		added.on("click", ev => {
			events.forEach(cb => {
				cb(ev, params);
			});
		});
	} else {
		console.warn("no events");
	}
}

function addSeparator(pane: Pane) {
	pane.addBlade({
		view: 'separator',
	});
}

function parseComponents(pane: Pane, params: Params, components: Array<Component>) {
	components.forEach(component => {
		if (component.type === "folder") {
			const folder = pane.addFolder({
				title: component.title ?? component.name ?? 'title',
				expanded: component.expanded ?? true
			});

			parseComponents(folder as Pane, params, component.children ?? []);
		}

		if ("default" in component) {
			params[component.name] = component.default;
		}

		if (component.type === "noop") {
			return;
		}

		if (component.type === "separator") {
			addSeparator(pane);
		}

		if (component.type === "monitor") {
			addMonitor(pane, component, params);
		}

		if (component.type === "button" || "action" in component) {
			addButton(pane, component, params);
		}

		if (component.type === undefined || component.type === "input") {
			addInput(pane, component, params);
		}
	});
}

export function declarePane(components: Array<Component>, opts?: PaneConfig) {
	const pane = new Pane(opts);
	// pane.registerPlugin(TemplateInputPlugin);

	let params: Params = {};

	parseComponents(pane, params, components);

	return [pane, params];
}
