import React from 'react'

class ConvoluteMaxtrix extends React.Component {

	onChange(i, e) {
		let dom = this.refs[`item${i}`].getDOMNode()
		this.props.options.weights[i] = dom.value
		this.props.onChange(this.props.options)
		// pass up
	}

	renderTextInput(weight, idx) {
		return (
			<div key={idx} className="col-xs-4">
				<div className="filter-input">
					<input onChange={this.onChange.bind(this, idx)} defaultValue={weight} type="number" step={weight % 1 === 0 ? 1 : 0.1} ref={`item${idx}`}/>
				</div>
			</div>
		)
	}

	render() {
		return (
			<div className="row">
				{ this.props.options.weights.map(this.renderTextInput.bind(this))}
			</div>
		)
	}
}

export default ConvoluteMaxtrix