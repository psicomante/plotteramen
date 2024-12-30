export type PaperType = keyof typeof paperFormats;

export const paperFormats = {
	// A Series
	A0: [841, 1189, "mm"],
	A1: [594, 841, "mm"],
	A2: [420, 594, "mm"],
	A3: [297, 420, "mm"],
	A4: [210, 297, "mm"],
	A5: [148, 210, "mm"],
	A6: [105, 148, "mm"],
	A7: [74, 105, "mm"],
	A8: [52, 74, "mm"],
	A9: [37, 52, "mm"],
	A10: [26, 37, "mm"],

	// B Series
	B0: [1000, 1414, "mm"],
	B1: [707, 1000, "mm"],
	B2: [500, 707, "mm"],
	B3: [353, 500, "mm"],
	B4: [250, 353, "mm"],
	B5: [176, 250, "mm"],
	B6: [125, 176, "mm"],
	B7: [88, 125, "mm"],
	B8: [62, 88, "mm"],
	B9: [44, 62, "mm"],
	B10: [31, 44, "mm"],

	// C Series
	C0: [917, 1297, "mm"],
	C1: [648, 917, "mm"],
	C2: [458, 648, "mm"],
	C3: [324, 458, "mm"],
	C4: [229, 324, "mm"],
	C5: [162, 229, "mm"],
	C6: [114, 162, "mm"],
	C7: [81, 114, "mm"],
	C8: [57, 81, "mm"],
	C9: [40, 57, "mm"],
	C10: [28, 40, "mm"],

	"postcard-us": [4, 6, "in"], // 101.6, 152.4
	"poster-small": [280, 430, "mm"],
	poster: [460, 610, "mm"],
	"poster-large": [610, 910, "mm"],
	"business-card-us": [2, 3.5, "in"], // 50.8, 88.9
	"business-card-eu": [55, 85, "mm"],

	"axidrawminikitv2-safearea-mm": [100, 150, "mm"],
	"axidrawminikitv2-safearea-in": [4, 6, "in"],
	
};
