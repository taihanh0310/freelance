class Fields extends React.Component{
	render(){
		return (
			<div className={`${this.props.theme} fields`}>
				{this.props.children}
			</div>
		);
	};
};

Fields.defaultProps = {
	theme: ''
};

module.exports = Fields;