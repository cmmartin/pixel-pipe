import React from 'react'
import {Log} from '../../utils'
 
export default class PixelPipe extends React.Component {

	componentDidMount() {
		let canvas = React.findDOMNode(this.refs.canvas)
		let ctx = canvas.getContext('2d')
		let image = new Image()

		Object.assign(image, {
			src: this.props.src,
			onload: () => {
				canvas.width = image.width
				canvas.height = image.height
				ctx.drawImage(image, 0, 0, image.width, image.height)
				this.original = this.getData()
				this.render()
			}
		})

		Object.assign(this, {ctx, image})
	}

	run(filters) {
		this.reset()
		let data = this.getData()
		filters.forEach((filter) => {
			Log.time(filter.name, () => { data = filter.transform.call(filter.transform, data, filter.options) })
		})
		this.setData(data)
	}

	getData() {
	  	return this.ctx.getImageData(0, 0, this.image.width, this.image.height)
	}

	setData(data) {
	  	return this.ctx.putImageData(data, 0, 0)
	}

	reset() {
	  	this.setData(this.original)
	}

	onMouseDown(e) {} // override stub

	onDrop(e) {
		e.preventDefault()
    	let i = e.dataTransfer.getData('filter_idx')
    	this.props.onAddFilter(this.props.filters[i])
	}

	allowDrop(e) {
		e.preventDefault()
	}

  	render() {
  		if (this.original && this.props.filters) this.run(this.props.activeFilters)
    	return <canvas ref="canvas" onMouseDown={this.onMouseDown.bind(this)} onDrop={this.onDrop.bind(this)} onDragOver={this.allowDrop.bind(this)} ></canvas>
  	}
}