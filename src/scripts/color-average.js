import {Log} from './utils'

export default class ColorAverage {

	static run(pixels, triangles) {
		this.width = pixels.width
		this.height = pixels.height

		this.boundingBox = {
			minX: 0,
			maxX: this.width,
			minY: 0,
			maxY: this.height
		}
		this.calculateBoundingBox(triangles)
		let everyPixelInEachTriangle = this.createListOfPixelsInEachTriangle(triangles)
		let averageColorForEachTriangle = []

		everyPixelInEachTriangle.forEach((pixelsInTriangle, triangleIdx) => {
			averageColorForEachTriangle[triangleIdx] = this.averageColorValues(pixels, pixelsInTriangle)
		})

		return this.applyAverageColorToPoints(pixels, averageColorForEachTriangle, everyPixelInEachTriangle)		
	}

	static calculateBoundingBox(triangles) {
		let x = [], y = []
		triangles.forEach((points) => {
			points.forEach((point) => {
				x.push(point[0])
				y.push(point[1])
			})
		})

		let getExtreme = (type, values) => Math[type].apply(Math[type], values)

		this.boundingBox = {
			minX: getExtreme('min', x),
			maxX: getExtreme('max', x),
			minY: getExtreme('min', y),
			maxY: getExtreme('max', y)
		}
	}

	static createListOfPixelsInEachTriangle(verticesOfTriangles) {
		let everyPixelInEachTriangle = []
		for (var x = this.boundingBox.minX; x < this.boundingBox.maxX; ++x) {
			for (var y = this.boundingBox.minY; y < this.boundingBox.maxY; ++y) {
				verticesOfTriangles.forEach((triangle, idx) => {
					if (this.isPointInTriangle(triangle, [x, y])) {
						if (everyPixelInEachTriangle[idx] == null) everyPixelInEachTriangle[idx] = [];
						everyPixelInEachTriangle[idx].push([x, y])
					}
				})
			}
		}
		return everyPixelInEachTriangle
	}

	static applyAverageColorToPoints(pixels, averageColorForEachTriangle, everyPixelInEachTriangle) {
		let d = pixels.data
		averageColorForEachTriangle.forEach((colors, triangleIdx) => {
			everyPixelInEachTriangle[triangleIdx].forEach((point) => {
				let redIndex = this.indexForPoint(point)
				d[redIndex + 0] = colors[0]
				d[redIndex + 1] = colors[1]
				d[redIndex + 2] = colors[2]
				d[redIndex + 3] = colors[3]
			})
		})
		return pixels
	}

	static indexForPoint([col, row]) {
		return ((this.width * 4) * row) + (col * 4)
	}

	static averageColorValues(pixels, points) {
		let r = 0, 
			g = 0, 
			b = 0, 
			a = 0

		points.forEach((point) => {
			var pixelRedIndex = this.indexForPoint(point)
			r += pixels.data[pixelRedIndex + 0]
			g += pixels.data[pixelRedIndex + 1]
			b += pixels.data[pixelRedIndex + 2]
			a += pixels.data[pixelRedIndex + 3]
		})
		return [r, g, b, a].map(value => value / points.length)
	}

	static isPointInTriangle(triangle, point) {
    	for (var c = false, i = -1, l = triangle.length, j = l - 1; ++i < l; j = i)
        ((triangle[i][1] <= point[1] && point[1] < triangle[j][1]) || (triangle[j][1] <= point[1] && point[1] < triangle[i][1]))
        && (point[0] < (triangle[j][0] - triangle[i][0]) * (point[1] - triangle[i][1]) / (triangle[j][1] - triangle[i][1]) + triangle[i][0])
        && (c = !c);
    	return c
	}
}