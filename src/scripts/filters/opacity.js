export default function opacity(pixels, options = {value: 0.5}) {

	let d = pixels.data
	for (let i = 0; i < d.length; i += 4) {
		d[i + 3] = 255 * options.value
	}

	return pixels
}