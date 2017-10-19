import LoadDropdown from 'common/load/dropdown';

class Select extends React.Component{
	componentDidUpdate(){
		if(this.props.isLoaded){
			$(this.refs.root).dropdown({
				onChange: (value, text, $choice) => {
					this.props.onChange(value);
					if(typeof this.props.onChangeText !== 'undefined')
						this.props.onChangeText(text);
				}
			});

			$(this.refs.root).dropdown('set selected', this.props.value);
		}
	}
	render(){
		if(this.props.isLoaded)
			return (
				<div className={`ui ${this.props.theme} selection dropdown`} ref="root" id={this.props.id}>
					<input type="hidden"/>
					<Icon theme="dropdown"/>
					<div className="default text"></div>
					<div className="menu">
						<div className="item" data-value=""></div>
						{
							this.props.list.map((l, key) => {
								return (
									<div key={key} className="item" data-value={l[this.props.code]}>{l[this.props.display]}</div>
								);
							})
						}
					</div>
				</div>
			);
		else return null;
	};
};

Select.defaultProps = {
	theme: ''
};

module.exports = ScriptHOC(LoadDropdown)(Select);