import LoadList from 'common/load/list';

class List extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} list`}>
					{this.props.children}
				</div>
			);
		else return null;
	};
};

List.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadList)(List);