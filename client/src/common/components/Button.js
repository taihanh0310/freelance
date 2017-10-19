import LoadButton from 'common/load/button';

class Button extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<button className={`ui ${this.props.theme} button`} onClick={this.props.onClick}
					disabled={this.props.disabled}
					style={this.props.style}>
					{this.props.children}
				</button>
			);
		else return null;
	};
};

Button.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadButton)(Button);