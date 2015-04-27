export default function sepia(pixels) {
  	let d = pixels.data
	for (let i = 0; i < d.length; i += 4) {
	    let r = d[i]
	    let g = d[i + 1]
	    let b = d[i + 2]

	    let avg = 0.3  * r + 0.59 * g + 0.11 * b
	    d[i + 0] = avg + 100
	    d[i + 1] = avg + 50
	    d[i + 2] = avg
	}
  return pixels;
}