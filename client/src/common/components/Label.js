import LoadLabel from 'common/load/label';

class Label extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<a className={`ui ${this.props.theme} label`} style={this.props.style}>
					{this.props.children}
				</a>
			);
		else return null;
	};
};

Label.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadLabel)(Label);