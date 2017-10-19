import LoadFlag from 'common/load/flag';

class Flag extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<i className={`${this.props.theme} flag`}/>
			);
		else return null;
	};
};

Flag.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadFlag)(Flag);