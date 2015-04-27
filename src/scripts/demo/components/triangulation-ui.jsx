import React from 'react'

class TriangulationUI extends React.Component {

	onColorChange(e) {
		console.log(this.props)
		this.props.mesh.color = e.target.value
		this.props.onChange(this.props.mesh)
	}

	render() {
		return (
			<div className="section">
				<div className="section-content">
					<input type="color" defaultValue={this.props.mesh.color} onChange={this.onColorChange.bind(this)} />
					<div className="checkbox">
				        <label>
				          	<input type="checkbox" defaultChecked={this.props.mesh.showColor} /> color average 
				        </label>
				    </div>
					<div className="checkbox">
				        <label>
				         	<input type="checkbox" defaultChecked={this.props.mesh.showMesh} /> triangulate 
				        </label>
				    </div>
				</div>
			</div>
		)
	}
}

export default TriangulationUI