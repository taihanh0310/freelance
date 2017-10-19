import Header from 'app/Header';
import Footer from 'app/Footer';
import WarningNotifycation from '../modules/warningNotifycation/WarningNotifycation';

const {Translate, I18n} = ReactReduxI18n;

class Backend extends React.Component{
    render(){
		return (
           <div className="page-container-bg-solid">
  				<Header/>
                <WarningNotifycation />
  				<div className="page-container">
  					<div className="page-content-wrapper">
  						<div className="page-content">
  							<div className="container-fluid">
  								{this.props.children}
  							</div>
  						</div>
  					</div>
  				</div>
		        <Footer/>
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

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Backend);