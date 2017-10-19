import LoadTable from 'common/load/table';

class Table extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<table className={`ui ${this.props.theme} table`} id={this.props.id} style={this.props.style}>
					{this.props.children}
				</table>
			);
		else return null;
	};
};

Table.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadTable)(Table);