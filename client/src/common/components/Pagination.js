class Pagination extends React.Component{
	constructor(){
		super();
		this.state = {
			loaded: false
		};
	}
	componentWillUnmount(){
		$(this.refs.root).pagination('destroy');
		this.state = {
			loaded: false
		};
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.items > 0){
			if(!this.state.loaded){
				$(this.refs.root).pagination({
					prevText: '<',
					nextText: '>',
					items: nextProps.items,
					itemsOnPage: nextProps.itemsOnPage,
					onPageClick: (pageNumber, event) => {
						this.props.onChange(pageNumber);
					}
				});
				this.setState({loaded: true});
			}
		}
	}
	render(){
		return (
			<div id={this.props.id} ref="root"/>
		);
	};
};

module.exports = Pagination;