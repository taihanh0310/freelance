import LoadImage from 'common/load/image';

class Images extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} images`}>
					{this.props.children}
				</div>
			);
		else return null;
	};
};

Images.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadImage)(Images);