import LoadHeader from 'common/load/header';

class Header extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} header`} tabIndex={this.props.tabIndex}>
					{this.props.children}
				</div>
			);
		else return null;
	};
};

Header.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadHeader)(Header);