import LoadInput from 'common/load/input';

class Input extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} input`}>
					{this.props.children}
				</div>
			);
		else return null;
	};
};

Input.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadInput)(Input);