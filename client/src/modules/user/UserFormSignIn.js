const {Translate, I18n} = ReactReduxI18n;

class UserFormSignIn extends React.Component{
	componentWillMount(){
		$('body').addClass('login');
	}
	componentWillUnmount(){
		$('body').removeClass('login');
	}
	_onLogin(event){
		event.preventDefault();
    	const email = $('#email').val();
    	const password = $('#password').val();
    	axios.post(`${Config.DEFAULT_URL}auth/login`, {email, password})
    	.then((response) => {
      		localStorage.setItem('token', response.data.data.token);
      		axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
      		this.props.push(Routes.dashboard.view);
      		toatsr.error('');
    	})
    	.catch((response) => {
      		//toastr.error('Email hay pass sai');
    	})
  	}
	render(){
		return (
			<div className="content">
				<form className="login-form" onSubmit={this._onLogin.bind(this)}>
					<h3 className="form-title font-green"><Translate value="application.name"/></h3>
					<div className="form-group">
						<label className="control-label visible-ie8 visible-ie9"><Translate value="application.field.email"/></label>
						<input type="email" className="form-control form-control-solid placeholder-no-fix" placeholder={I18n.t('application.field.email')} id="email"/>
					</div>
					<div className="form-group">
						<label className="control-label visible-ie8 visible-ie9"><Translate value="application.field.password"/></label>
						<input type="password" className="form-control form-control-solid placeholder-no-fix" placeholder={I18n.t('application.field.password')} id="password"/>
					</div>
					<div className="form-actions">
						<button type="submit" className="btn green uppercase btn-customer-size"><Translate value="signIn.button"/></button>
					</div>
				</form>
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

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(UserFormSignIn);