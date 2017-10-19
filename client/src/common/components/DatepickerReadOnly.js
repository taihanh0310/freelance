class DatepickerReadOnly extends React.Component{
	constructor(){
		super();
		this.state = {
			value: '',
		};
	}
	componentWillReceiveProps(nextProps){
                $(this.refs.root).datepicker("update", moment(nextProps.value).toDate());
	}
	componentDidMount(){
		$(this.refs.root).datepicker({
			clearBtn: true,
		    orientation: "bottom auto",
		    autoclose: true,
		    todayHighlight: true,
		    toggleActive: true,
		    language: "vi",
		    format: 'dd-mm-yyyy'
		})
		.on('changeDate', (event) => {
			var d = moment(event.date).add(7, 'hours').toDate();
                    this.props.onChange(d);
		})
		if(typeof this.props.value !== 'undefined')
			this.setState({value: this.props.value}, () => {
				$(this.refs.root).datepicker("update", moment(this.props.value).toDate());
			});
	}
	render(){
		return (
			<input className="form-control" type="text" ref="root" readOnly/>
		);
	};
};

module.exports = DatepickerReadOnly;