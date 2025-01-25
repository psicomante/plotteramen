import { number } from "@polymole/unicore.math";
const { roundToDecimals } = number;

export type ConvertOpts = {
	dpi: number;
	roundToPixel: boolean;
	precision?: number;
};

const INCH2MMF = 2.54 * 10;
const MM2INCHF = 1 / INCH2MMF;

export function convert(value: number, from: "mm" | "px" | "in", to: "mm" | "px", opts: ConvertOpts) {
	if (value < 0) {
		throw new Error("Value must be 0 or positive");
	}

	let converted = value;
	let isToPixel = false;

	// convert source to inch
	switch (from) {
		case "mm":
			//
			converted = value * MM2INCHF;
			break;
		case "in":
			converted = value;
			break;
		case "px":
			converted = value * INCH2MMF;
			break;
	}

	// convert to target
	switch (to) {
		case "mm":
			converted = converted * INCH2MMF;
			break;
		case "px":
			converted = converted * opts.dpi;
			isToPixel = true;
			break;
	}

	if (isToPixel && opts.roundToPixel) {
		converted = Math.round(converted);
	} else if (typeof opts.precision === "number" && isFinite(opts.precision)) {
		converted = roundToDecimals(converted, opts.precision);
	}

	return converted;
}
