import LoadCheckbox from 'common/load/checkbox';

class Checkbox extends React.Component{
	constructor(){
		super();
		this.state = {
			loaded: false
		};
	}
	componentWillUnmount(){
		this.state = {
			loaded: false
		};
	}
	componentDidUpdate(){
		if(this.props.isLoaded){
			if(!this.state.loaded){
				$(this.refs.root).checkbox({
					onChecked: () => {
						this.props.onChange(1);
					},
					onUnchecked: () => {
						this.props.onChange(0);
					}
				});
				this.setState({loaded: true});
			}
			if(this.props.value === 1)
				$(this.refs.root).checkbox('set checked');
			else
				$(this.refs.root).checkbox('set unchecked');
		}
	}
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} checkbox`} ref="root" id={this.props.id}>
					<input type="checkbox" className="hidden"/>
					&nbsp;
					<label style={{fontSize: '.8em', fontWeight: '600'}}>{this.props.label}</label>
				</div>
			);
		else return null;
	};
};

Checkbox.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadCheckbox)(Checkbox);