class Item extends React.Component{
	render(){
		return (
			<a className={`${this.props.theme} item`} onClick={this.props.onClick} tabIndex={this.props.tabIndex}>
				{this.props.children}
			</a>
		);
	};
};

Item.defaultProps = {
	theme: ''
};

module.exports = Item;