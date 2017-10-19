import LoadIcon from 'common/load/icon';

class Icons extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<i className={`${this.props.theme} icons`}>
					{this.props.children}
				</i>
			);
		else return null;
	};
};

Icons.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadIcon)(Icons);