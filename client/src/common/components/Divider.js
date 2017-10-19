import LoadDivider from 'common/load/divider';

class Divider extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} divider`}>
					{this.props.children}
				</div>
			);
		else return null;
	};
};

Divider.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadDivider)(Divider);