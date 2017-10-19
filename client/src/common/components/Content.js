class Content extends React.Component{
	render(){
		return (
			<div className={`${this.props.theme} content`}>
				{this.props.children}
			</div>
		);
	};
};

Content.defaultProps = {
	theme: ''
};

module.exports = Content;