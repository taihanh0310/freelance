import LoadLabel from 'common/load/label';

class Labels extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} labels`}>
					{this.props.children}
				</div>
			);
		else return null;
	};
};

Labels.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadLabel)(Labels);