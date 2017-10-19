import LoadDropdown from 'common/load/dropdown';

class Dropdown extends React.Component{
	componentDidUpdate(){
		if(this.props.isLoaded){
			$(this.refs.root).dropdown();
		}
	}
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} dropdown`} ref="root">
					{this.props.children}
				</div>
			);
		else return null;
	};
};

Dropdown.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadDropdown)(Dropdown);