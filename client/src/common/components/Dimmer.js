import LoadDimmer from 'common/load/dimmer';

class Dimmer extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} dimmer`}>
					{this.props.children}
				</div>
			);
		else return null;
	};
};

Dimmer.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadDimmer)(Dimmer);