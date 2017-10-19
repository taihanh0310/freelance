class Row extends React.Component{
	render(){
		return (
			<div className={`${this.props.theme} row`}>
				{this.props.children}
			</div>
		);
	};
};

Row.defaultProps = {
	theme: ''
};

module.exports = Row;