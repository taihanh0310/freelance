const {Translate, I18n} = ReactReduxI18n;

class App extends React.Component{
	componentDidMount(){
		Helper.DisableWebKeyboard();
	}
  	render(){
  		return (
  			<div>
  				{this.props.children}
  			</div>
  		);
  	}
};

const mapStateToProps = ({userAuth}) => {
	return {userAuth};
};

const mapDispatchToProps = dispatch => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);