import { absMax, normalize, roundToDecimals } from "@polymole/unicore.math";
import { convert } from "./convert";
import { paperFormats, PaperType } from "./paper-formats";


export interface PaperOptions {
    size: PaperType | [number, number],
	dpi: number,
	orientation: "portrait" | "landscape",
	squared?: "max" | "min"
}

export function getPaperSize({size, dpi, orientation, squared}: PaperOptions): [number, number] {
    let pixelSize: [number, number] = [0, 0];

	if (typeof size === "string") {
		const paperSize = paperFormats[size];

		if (!paperSize) {
			throw new Error(`${size} is not a valid paper size format`);
		}

		let item = paperSize as [number, number, "mm" | "in"];

		if (squared) {
			const maxSide = Math.max(item[0], item[1]);

			if (squared == "max") {
				item = [maxSide, maxSide, item[2]];
			} else {
				const minSide = item[0] === maxSide ? maxSide : item[1];
				item = [minSide, minSide, item[2]];
			}
		}

		let w = convert(item[0], item[2], "px", {
			dpi,
			roundToPixel: true,
			precision: 0,
		});
		let h = convert(item[1], item[2], "px", {
			dpi,
			roundToPixel: true,
			precision: 0,
		});

		pixelSize = [w, h];
	} else if (Array.isArray(size)) {
		pixelSize = [size[0], size[1]];
	}

	return orientation == "portrait"
		? pixelSize
		: [pixelSize[1], pixelSize[0]];
}

export class Paper {
	protected container?: HTMLElement;

	/** real page size, in pixels */
	protected pageSize?: [number, number];

	/** resized page, for visualization purposes, in pixels */
	protected viewSize?: [number, number];

    constructor(protected parent: HTMLElement, protected options: PaperOptions & {margin: number}) {

    }

	setup() {
		const container = document.createElement('div')
		container.classList.add('page', 'page-border', 'page-shadow');
		container.id = "sketch";
		
		this.parent.appendChild(container);
		this.container = container;

		this.resize();
	}

	updatePageSize() {
		if (!this.container) {
			throw new Error("run setup");
		}

		const {size, dpi, orientation, squared} = this.options;
		const pageSize = getPaperSize({size, dpi, orientation, squared});

		this.pageSize = pageSize;
	}

	updateViewSize() {
		if (!this.container || !this.pageSize) {
			throw new Error("run setup");
		}

		const container = this.container;
		const margin = this.options.margin || 60;

		let viewHeight = window.innerHeight - (margin * 2);
		const pageAspectRatio = this.pageSize[0] / this.pageSize[1];
		let viewWidth = roundToDecimals(viewHeight * pageAspectRatio, 2);

		if (viewWidth > (window.innerWidth - (margin * 2))) {
			viewWidth = window.innerWidth - (margin * 2);
			viewHeight = roundToDecimals(viewWidth * 1/pageAspectRatio, 2);
		}
		
		this.viewSize = [viewWidth, viewHeight];

		container.style.width = `${viewWidth}px`;
		container.style.height = `${viewHeight}px`;
	}

	resize() {
		this.updatePageSize();
		this.updateViewSize();
	}

	setPaperSize(newSize: PaperType) {
		this.options.size = newSize;
	}

	setOptions(newOptions: Partial<PaperOptions & {margin: number}>) {
		this.options = {...this.options, ...newOptions};

		this.updatePageSize();
		this.updateViewSize();
	}

	getViewSize() {
		if (this.viewSize === undefined) {
			throw new Error("run setup first")
		}

		return this.viewSize;
	}

	getStats() {
		return {
			pageSize: this.pageSize,
			viewSize: this.viewSize,
			dpi: this.options.dpi,
			paperSize: this.options.size,
			margin: this.options.margin,
			orientation: this.options.orientation
		}
	}
}