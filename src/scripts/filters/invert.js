export default function invert(pixels) {
	let d = pixels.data
	for (let i = 0; i < d.length; i += 4) {
	    let r = d[i]
	    let g = d[i + 1]
	    let b = d[i + 2]

	    d[i] = 255 - r
	    d[i + 1] = 255 - g
	    d[i + 2] = 255 - b
	}
	return pixels
}