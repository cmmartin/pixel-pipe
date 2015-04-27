let Delaunay = require('delaunay-fast/delaunay')

import PixelPipe from './pixel-pipe.jsx'
import ColorAverage from './../../color-average'

class Triangulator extends PixelPipe {

	constructor() {
		super()
	}

	onMouseDown(e) {
		this.props.onMouseDown(e)
	}

	triangulate() {
		return Delaunay.triangulate(Array.from(this.props.points))
	}

	getAllPointsInTriangles(triangles, points) {
		return triangles.
			map(idx => points[idx]).
			reduce((memo, point, idx) => {
				let triangleIdx = Math.floor(idx / 3)
				if (memo[triangleIdx] == null) memo[triangleIdx] = []
				memo[triangleIdx].push(point)
				return memo
			}, [])
	}

	render() {
    	let template = super.render()
    	if (this.props.mesh.showMesh) this.props.points.forEach(this.renderPoint.bind(this))
    	if (this.props.points.size >= 3) {
    		let triangles
    		if (this.props.mesh.showColor || this.props.mesh.showMesh) triangles = this.triangulate()
    		if (this.props.mesh.showColor) this.setData(ColorAverage.run(this.getData(), this.getAllPointsInTriangles(triangles, Array.from(this.props.points))))
    		if (this.props.mesh.showMesh) this.renderMesh(triangles)
    	}
    	return template
  	}

  	renderPoint([x, y]) {
		this.ctx.beginPath()
		this.ctx.arc(x, y, this.props.mesh.pointRadius, 0, 2 * Math.PI, false)
		this.ctx.fillStyle = this.props.mesh.color
		this.ctx.fill()
	}

  	renderMesh(triangles) {
		let verticesArray = Array.from(this.props.points)
		for (var i = triangles.length; i; ) {
	        this.ctx.beginPath()
	        --i; this.ctx.moveTo(verticesArray[triangles[i]][0], verticesArray[triangles[i]][1])
	        --i; this.ctx.lineTo(verticesArray[triangles[i]][0], verticesArray[triangles[i]][1])
	        --i; this.ctx.lineTo(verticesArray[triangles[i]][0], verticesArray[triangles[i]][1])
	        this.ctx.closePath()
	        this.ctx.strokeStyle = this.props.mesh.color
	        this.ctx.stroke()
	    }
	}
}

export default Triangulator