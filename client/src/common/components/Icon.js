import LoadIcon from 'common/load/icon';

class Icon extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<i className={`${this.props.theme} icon`} style={this.props.style}/>
			);
		else return null;
	};
};

Icon.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadIcon)(Icon);