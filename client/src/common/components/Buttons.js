import LoadButton from 'common/load/button';

class Buttons extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} buttons`} style={this.props.style}>
					{this.props.children}
				</div>
			);
		else return null;
	};
};

Buttons.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadButton)(Buttons);