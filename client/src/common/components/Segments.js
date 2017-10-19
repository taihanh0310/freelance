import LoadSegment from 'common/load/segment';

class Segments extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} segments`}>
					{this.props.children}
				</div>
			);
		else return null;
	};
};

Segments.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadSegment)(Segments);