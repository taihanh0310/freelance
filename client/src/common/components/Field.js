class Field extends React.Component{
	render(){
		return (
			<div className={`${this.props.theme} field`} style={this.props.style}>
				{this.props.children}
			</div>
		);
	};
};

Field.defaultProps = {
	theme: ''
};

module.exports = Field;