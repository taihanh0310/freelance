import LoadMenu from 'common/load/menu';

class Menu extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} menu`} id={this.props.id}>
					{this.props.children}
				</div>
			);
		else return null;
	};
};

Menu.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadMenu)(Menu);