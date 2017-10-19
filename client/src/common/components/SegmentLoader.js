const {Translate, I18n} = ReactReduxI18n;

class SegmentLoader extends React.Component{
	render(){
		return (
			<Dimmer theme={!this.props.loading ? 'inverted': 'active inverted'}>
				<Loader theme="text"><Translate value={this.props.title}/></Loader>
			</Dimmer>
		);
	};
};

module.exports = SegmentLoader;