import LoadForm from 'common/load/form';

class Form extends React.Component{
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} form`} id={this.props.id}>
					{this.props.children}
				</div>
			);
		else return null;
	};
};

Form.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadForm)(Form);