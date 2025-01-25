import { vec2 } from "./types";

export function cross(a: vec2, b: vec2) {
	return a[0] * b[1] - a[1] * b[0];
}
