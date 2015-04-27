import React from 'react'

class Slider extends React.Component {

	componentDidMount() {
		this.DOM = this.refs.slider.getDOMNode()
	}

	onChange() {
		this.props.options.value = +this.DOM.value
		this.props.onChange(this.props.options)
	}

	render() {
		return <input type="range" onMouseUp={this.onChange.bind(this)} defaultValue={this.props.options.value} min={this.props.options.min} max={this.props.options.max} step={this.props.options.step || 1} ref="slider" />
	}
}

export default Slider