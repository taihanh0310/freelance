const Auth = ComposedComponent => {
    class Authentication extends React.Component{
    	componentDidMount(){
    		this._checkBeforeGoRoute();
    	}
    	componentDidUpdate(){
            this._checkBeforeGoRoute();
    	}
        _checkBeforeGoRoute(){
            if(localStorage.getItem('token')){

            }else{
                setTimeout(() => {
                    this.props.push(Routes.login.view);
                }, 300);
            }
        }
		render(){
			return <ComposedComponent {...this.props}/>
		};
    };

    const mapStateToProps = ({userAuth}) => {
		return {userAuth};
	};

	const mapDispatchToProps = (dispatch) => {
		return Redux.bindActionCreators({
			...ReactRouterRedux.routerActions,
		}, dispatch);
	};

	return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Authentication);
};

export default Auth;