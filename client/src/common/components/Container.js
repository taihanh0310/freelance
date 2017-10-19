import LoadContainer from 'common/load/container';

class Container extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} container`} style={{minHeight: this.props.minHeight}}
					id={this.props.id}>
					{this.props.children}
				</div>
			);
		else return null;
	};
};

Container.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadContainer)(Container);