import LoadLoader from 'common/load/loader';

class Loader extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} loader`}>
					{this.props.children}
				</div>
			);
		else return null;
	};
};

Loader.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadLoader)(Loader);