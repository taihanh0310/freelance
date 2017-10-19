const {Translate, I18n} = ReactReduxI18n;

class ButtonList2 extends React.Component {
    
    _onExit(){
        this.props.push(Routes.dashboard.view);
    }
    
    render(){
        return (
                <div className="portlet box">
                    <div className="portlet-body">
                        <div className="row">
                            <div className="col-md-8">
                                <button type="button" className="btn green btn-customer-size display_none">
                                    In Chi Tiết
                                </button>
                            </div>

                            <div className="col-md-3 text-right">

                            </div>

                            <div className="col-md-1">
                                <button type="button" className="btn green pull-right btn-customer-size">
                                    <Translate value="application.button.exit"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    };
}

const mapStateToProps = ({
    }) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ButtonList2);