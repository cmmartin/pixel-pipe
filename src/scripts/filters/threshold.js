export default function threshold(pixels, options = {value: 150}) {
	let d = pixels.data;
  	for (let i=0; i < d.length; i += 4) {
		let r = d[i]
		let g = d[i + 1]
		let b = d[i + 2]
		let v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= options.value) ? 255 : 0
		d[i] = d[i + 1] = d[i + 2] = v
  	}
  	return pixels
}