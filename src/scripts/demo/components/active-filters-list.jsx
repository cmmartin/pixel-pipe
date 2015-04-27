import React from 'react'
import Slider from './slider.jsx'
import ConvoluteMaxtrix from './convolute-matrix.jsx'

class ActiveFiltersList extends React.Component {

	onRemoveHandler(i) {
		this.props.onRemoveFilter(i)
	}

	onDrop(e) {
		e.preventDefault()
    	let i = e.dataTransfer.getData('filter_idx')
    	this.props.onAddFilter(this.props.filters[i])
	}

	allowDrop(e) {
		e.preventDefault()
	}

	onFilterOptionsChange(filter, options) {
		filter.options = options
		this.props.updateFilters(this.props.filters)
	}

	renderListItem(filter, i) {
		let uiComponent = ''
		if (filter.ui === 'Slider') uiComponent = <div className="ui-component"><Slider options={filter.options} onChange={this.onFilterOptionsChange.bind(this, filter)} /></div>
		if (filter.ui === 'Matrix') uiComponent = <div className="ui-component"><ConvoluteMaxtrix options={filter.options} onChange={this.onFilterOptionsChange.bind(this, filter)} /></div>
		
		return (
			<li key={i}>
				<div className="section-content">
					{filter.name} 
					<a className="close" onClick={this.onRemoveHandler.bind(this, i)}>x</a>
					{ uiComponent }
				</div>
			</li>
		)
	}

	render() {
		return (
			<div onDrop={this.onDrop.bind(this)} onDragOver={this.allowDrop.bind(this)} className="section">
				<h5 className="section-title">filters <span className="badge">{this.props.activeFilters.length}</span></h5>
				<ul>{Array.from(this.props.activeFilters).map(this.renderListItem.bind(this))}</ul>
			</div>
		)
	}
}

export default ActiveFiltersList