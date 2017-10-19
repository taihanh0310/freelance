class Column extends React.Component{
	render(){
		return (
			<div className={`${this.props.theme} column`}>
				{this.props.children}
			</div>
		);
	};
};

Column.defaultProps = {
	theme: ''
};

module.exports = Column;