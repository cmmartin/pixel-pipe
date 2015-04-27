require('babelify/polyfill')

import React from 'react'
import Triangulator from './components/pixel-pipe-triangulator.jsx'
import AllFiltersList from './components/all-filters-list.jsx'
import ActiveFiltersList from './components/active-filters-list.jsx'
import TriangulationUI from './components/triangulation-ui.jsx'

import {
	brightness, 
	threshold, 
	greyscale, 
	sepia,
	invert, 
	convolute,
	opacity
} from './../filters'

const imageUrl = "images/charlie.png"

let filters = [
	{
		name: 'Brightness',
		transform: brightness,
		options: {
			value: 100,
			min: 0,
			max: 255
		},
		ui: 'Slider'
	},
	{
		name: 'Threshold',
		transform: threshold,
		options: {
			value: 150,
			min: 0,
			max: 255
		},
		ui: 'Slider'
	},
	{
		name: 'Greyscale',
		transform: greyscale,
		options: {}
	},
	{
		name: 'Invert',
		transform: invert,
		options: {}
	},
	{
		name: 'Sharpen',
		transform: convolute,
		options: {
			weights: [  
				0,  -1,   0,
			   -1,   5,  -1,
				0,  -1,   0 
			],
			opaque: 1
		},
		ui: 'Matrix'
	},
	{
		name: 'Blur',
		transform: convolute,
		options: {
			weights: [  
				1/9,  1/9,  1/9,
				1/9,  1/9,  1/9,
				1/9,  1/9,  1/9 
			],
			opaque: 1
		},
		ui: 'Matrix'
	},
	{
		name: 'Sepia',
		transform: sepia,
		options: {}
	},
	{
		name: 'Opacity',
		transform: opacity,
		options: {
			value: 0.5,
			min: 0,
			max: 1,
			step: 0.01
		},
		ui: 'Slider'
	}
]

let triangulatorOptions = {
	pointRadius: 5,
	color: '#7CFC00',
	showMesh: true,
	showColor: true
}

class PixelPipeDemo extends React.Component {

	constructor() {
		super()
		this.state = {
			points: new Set(), // points should be unique
			activeFilters: [],
			filters: filters,
			mesh: triangulatorOptions
		}
	}

	addFilter(filter) {
		this.state.activeFilters.push(filter)
		this.setState(this.state)
	}

	removeFilter(i) {
		this.state.activeFilters.splice(i, 1)
		this.setState(this.state)
	}

	updateFilters(filters) {
		this.state.filters = filters
		this.setState(this.state)
	}

	updateMesh(mesh) {
		this.state.mesh = mesh
		this.setState(this.state)
	}

	onCanvasMouseDown(e) {
		let canvasParent = this.refs.canvasWrap.getDOMNode()
		let point = [e.pageX - canvasParent.offsetLeft, e.pageY + canvasParent.offsetTop].map(coordinate => coordinate - 10)
		if (e.shiftKey) this.state.points.forEach(this.removePointIfClicked.bind(this, point))
		else this.state.points.add(point)
		this.setState(this.state)
	}

	removePointIfClicked([x, y], point) {
  		let r = this.refs.triangulator.options.pointRadius
		if (this.withinRadius([x, y], point), r) this.state.points.delete(point)
	}

	withinRadius([x1, y1], [x2, y2], radius) {
		return x1 > (x2 - radius) && 
			   x1 < (x2 + radius) && 
			   y1 > (y2 - radius) &&
			   y1 < (y2 + radius)
	}

  	render() {
    	return  (
    		<div className="row">
    			<div className="col-md-1">
    				<AllFiltersList 
						filters={this.state.filters} 
						activeFilters={this.state.activeFilters} 
						onAddFilter={this.addFilter.bind(this)} 
						onRemoveFilter={this.removeFilter.bind(this)} 
						onUpdateFilters={this.updateFilters.bind(this)} />
    			</div>
				<div className="col-md-8" ref="canvasWrap">
					<Triangulator 
						src={imageUrl} 
						filters={this.state.filters} 
						activeFilters={this.state.activeFilters} 
						points={this.state.points}
						mesh={this.state.mesh}
						onAddFilter={this.addFilter.bind(this)} 
						onMouseDown={this.onCanvasMouseDown.bind(this)}
						ref="triangulator" />
				</div>
				<div className="col-md-3">
					<ActiveFiltersList activeFilters={this.state.activeFilters} 
						filters={this.state.filters} 
						onAddFilter={this.addFilter.bind(this)} 
						onRemoveFilter={this.removeFilter.bind(this)} 
						updateFilters={this.updateFilters.bind(this)} />
					<TriangulationUI mesh={this.state.mesh} onChange={this.updateMesh.bind(this)} />
				</div>
			</div>
		)
  	}
}

export default PixelPipeDemo

React.render(<PixelPipeDemo />, document.body)
