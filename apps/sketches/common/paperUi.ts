import { Paper, paperFormats, PaperType } from "@psicomante/paper";

export function createPaperUi(page: Paper, refreshFn: Function): Array<any> {
	function refreshStats(params: any) {
		const { pageSize, viewSize, paperSize, dpi, orientation, margin } = page.getStats();

		if (!pageSize || !viewSize) {
			throw new Error("page erro");
		}

		params.paperSize = paperSize;
		params.pageSize = `${pageSize[0]},${pageSize[1]}`;
		params.viewSize = `${viewSize[0]},${viewSize[1]}`;
        params.orientation = orientation;

		let options: Record<string, string> = {};
		Object.keys(paperFormats).forEach(v => {
			options[v] = v;
		});
		params.paperSizeSelector = options;

		refreshFn();
	}

	let params: Partial<{ orientation: string; pageSize: string; viewSize: string; paperSize: string }> = {};
	refreshStats(params);

	const ui = {
		type: "folder",
		title: "Paper",
		children: [
			{
				name: "pageSize",
				type: "monitor",
				default: params.pageSize
			},
			{
				name: "viewSize",
				type: "monitor",
				default: params.viewSize
			},
			{
				name: "paperSize",
				type: "input",
				default: params.paperSize,
				options: params.paperSizeSelector
			},
			{
				name: "orientation",
				type: "input",
				default: params.orientation,
				options: Object.fromEntries(["portrait", "landscape"].map(orientation => [orientation, orientation]))
			},
			{
				name: "changePaper",
				type: "button",
				title: "Update Paper",
				label: "change",
				events: [
					(ev: MouseEvent, params: Record<string, any>) => {
						page.setOptions({
							size: params.paperSize as PaperType,
							orientation: params.orientation as "portrait" | "landscape"
						});
						refreshStats(params);
					}
				]
			}
		]
	};

	return [ui];
}
