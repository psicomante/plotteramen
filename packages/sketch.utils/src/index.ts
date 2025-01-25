import saveAs from "file-saver";

export function getTimeNow() {
	const t = new Date();
	const y = t.getFullYear();
	const m = ("0" + (t.getMonth() + 1)).slice(-2);
	const d = ("0" + t.getDate()).slice(-2);
	const h = t.getHours();
	const min = t.getMinutes();
	const ss = t.getSeconds();
	const timestamp = `${y}-${m}-${d}T${h}${min}${ss}Z`;
	return timestamp;
}

export function saveSVGElement(containerElement: HTMLElement, name: string) {
	const elements = containerElement.querySelectorAll("svg");
	const serializer = new XMLSerializer();

	for (let el of elements) {
		let source = serializer.serializeToString(el);
		source = source.replace(/(\w+)?:?xlink=/g, "xmlns:xlink="); // Fix root xlink without namespace
		source = source.replace(/ns\d+:href/g, "xlink:href"); // Safari NS namespace fix.

		if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
			source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
		}
		if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
			source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
		}

		const preface = '<?xml version="1.0" standalone="no"?>\r\n';
		const svgBlob = new Blob([preface, source], { type: "image/svg+xml;charset=utf-8" });
		saveAs(svgBlob, name + ".svg");
	}
}
