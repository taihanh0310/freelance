const {Translate, I18n} = ReactReduxI18n;

class Footer extends React.Component{
  	render(){
  		return (
  			<div className="page-footer">
  				<div className="container-fluid">
  					<p><Translate value="application.copyright"/></p>
  				</div>
  			</div>
  		);
  	};
};

const mapStateToProps = ({userAuth}) => {
	return {userAuth};
};

const mapDispatchToProps = dispatch => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Footer);