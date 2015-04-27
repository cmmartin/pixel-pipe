import React from 'react'

class TriangulationUI extends React.Component {

	onChange(value, e) {
		this.props.mesh[value] = e.target.checked
		if (value === 'color') this.props.mesh.color = e.target.value
		this.props.onChange(this.props.mesh)
	}



	render() {
		return (
			<div className="section">
				<div className="section-content">
					<input type="color" defaultValue={this.props.mesh.color} onChange={this.onChange.bind(this, 'color')} />
					<div className="checkbox">
				        <label>
				          	<input type="checkbox" defaultChecked={this.props.mesh.showColor} onChange={this.onChange.bind(this, 'showColor')} /> color average 
				        </label>
				    </div>
					<div className="checkbox">
				        <label>
				         	<input type="checkbox" defaultChecked={this.props.mesh.showMesh} onChange={this.onChange.bind(this, 'showMesh')} /> triangulate 
				        </label>
				    </div>
				</div>
			</div>
		)
	}
}

export default TriangulationUI