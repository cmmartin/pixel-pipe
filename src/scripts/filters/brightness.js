// Adds adjustment to red, green and blue

export default function brightness(pixels, options = {value: 15}) {

	let d = pixels.data

	for (let i = 0; i < d.length; i += 4) {
		d[i + 0] += options.value
		d[i + 1] += options.value
		d[i + 2] += options.value
	}

	return pixels
}