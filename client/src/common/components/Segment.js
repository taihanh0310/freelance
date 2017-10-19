import LoadSegment from 'common/load/segment';

class Segment extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} segment`} id={this.props.id}
					style={{minHeight: this.props.minHeight}}
					onClick={this.props.onClick}>
					{this.props.children}
				</div>
			);
		else return null;
	};
};

Segment.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadSegment)(Segment);