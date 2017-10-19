import LoadGrid from 'common/load/grid';

class Grid extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} grid`}>
					{this.props.children}
				</div>
			);
		else return null;
	};
};

Grid.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadGrid)(Grid);