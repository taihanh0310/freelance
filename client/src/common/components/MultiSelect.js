class MultiSelect extends React.Component{
	constructor(){
		super();
		this.state = {
			list: [],
			value: [],
			defaultValue: [],
			initStep: 0
		};
		this.root = null;
	}
	componentWillUnmount(){
		this.root = null;
		this.state = {
			defaultValue: [],
			value: [],
			list: [],
			initStep: 0
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.list.length != this.state.list.length){
			if(this.root !== null)
				this.root[0].selectize.destroy();
			this.setState({list: nextProps.list}, () => {
				this.root = $(this.refs.root).selectize({
					onChange: value => {
						if(!value)
							value = [];
						if(JSON.stringify(value) !== JSON.stringify(this.state.value)){
							if(!value) this.props.onChange([]);
							else{
								this.props.onChange(value);
							}
						}
					}
				});
			});
		}

		if(typeof nextProps.defaultValue !== 'undefined' && typeof this.state.defaultValue !== 'undefined'){
			if(JSON.stringify(this.state.defaultValue) !== JSON.stringify(nextProps.defaultValue)){
				const values = [];
				nextProps.defaultValue.map(v => {
					if(typeof v[this.props.code] !== 'undefined')
						values.push(v[this.props.code]);
				});

				setTimeout(() => {
					this.setState({defaultValue: nextProps.defaultValue}, () => {
						this.root[0].selectize.setValue(values);
					});
				}, 500)
			}
		}

		if(typeof nextProps.value !== 'undefined' && typeof this.state.value !== 'undefined'){
			if(JSON.stringify(this.state.value) !== JSON.stringify(nextProps.value)){
				const nextPropsLength = nextProps.value.length-1;
				if(typeof nextProps.value[nextPropsLength] === 'number'){
					this.setState({value: nextProps.value}, () => {
						this.root[0].selectize.setValue(nextProps.value);
					});
				}
			}
		}
	}
	render(){
		return (
			<select className="form-control" multiple ref="root">
				{
					this.state.list.map((l, key) => {
						return (
							<option key={key} value={l[this.props.code]}>{l[this.props.display]}</option>
						);
					})
				}
			</select>
		);
	}
};

module.exports = MultiSelect;