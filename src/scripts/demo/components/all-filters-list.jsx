import React from 'react'

class AllFiltersList extends React.Component {

	constructor() {
		super()
	}

	addFilter(i) {
		this.props.onAddFilter(this.props.filters[i])
	}

	removeFilter(i) {
		this.props.onRemoveFilter(i)
	}

	updateFilters(filters) {
		this.props.onUpdateFilters(filters)
	}

	drag(i, event) {
		event.dataTransfer.setData('filter_idx', i)
	}

	renderAllFiltersList(filter, i) {
		return (
			<li key={i}>
				<div draggable="true" onDragStart={this.drag.bind(this, i)}  className="section-content">
					{filter.name}
				</div>
			</li>
		)
	}

	render() {
		return (
			<div className="section">
		   		<h3 className="section-title">pixel pipe</h3>
		   		<ul>{this.props.filters.map(this.renderAllFiltersList.bind(this))}</ul>
		   </div>
		)
	}
}

export default AllFiltersList