/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param value The number to be rounded.
 * @param decimals The number of decimal places to round to.
 * @returns The rounded number.
 */
export function roundToDecimals(value: number, decimals: number): number {
	const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}

/**
 * @param value
 * @param lowerLimit
 * @param upperLimit
 * @return value clamped within `lowerLimit - upperLimit`
 */
export function clamp(value: number, lowerLimit: number, upperLimit: number): number {
	return Math.max(lowerLimit, Math.min(upperLimit, value));
}

/**
 * @param edge
 * @param value
 * @return 0 if value is less than edge, otherwise 1
 */
export const step = (edge: number, value: number): number => {
	return value < edge ? 0 : 1;
};

/**
 * @param value
 * @returns value clamped between `0 - 1`
 */
export function clampNormal(value: number): number {
	return clamp(value, 0, 1);
}


/**
 * Returns the maximum of two numbers after converting them to absolute values.
 *
 * @param a The first number.
 * @param b The second number.
 * @returns The maximum of the two numbers after converting them to absolute values.
 */
export function absMax(a: number, b: number): number {
  return Math.max(Math.abs(a), Math.abs(b));
}

/**
 * Normalize a value within a specified range.
 * Converts a number to a proportion relative to the given range.
 *
 * @param value The value to normalize.
 * @param [min=0] The minimum value of the range (default is 0).
 * @param [max=1] The maximum value of the range (default is 1).
 * @returns The normalized value within the range [0, 1].
 *
 */
export function normalize(value: number, min: number = 0, max: number = 1): number {
    return (value - min) / (max - min);
}