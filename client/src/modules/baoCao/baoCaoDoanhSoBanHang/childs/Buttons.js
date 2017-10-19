const {Translate, I18n} = ReactReduxI18n;

import * as BaoCaoDoanhSoBanHangListAction from 'modules/baoCao/baoCaoDoanhSoBanHang/actions/list';

class Buttons extends React.Component{
    
    constructor(){
        super();
    }
    
    _onExit(){
        this.props.push(Routes.dashboard.view);
    }
    
    render(){
        return (
            <div className="portlet box">
                <div className="portlet-body">
                    <div className="row">
                        <div className="col-md-8">
                            
                        </div>

                        <div className="col-md-3 text-right">

                        </div>

                        <div className="col-md-1">
                            <button type="button" className="btn green pull-right btn-customer-size" onClick={this._onExit.bind(this)}>
                                <Translate value="application.button.exit"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            );
    };
};

const mapStateToProps = ({
        baoCaoDoanhSoBanHangs
    }) => {
    return {
        baoCaoDoanhSoBanHangs
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...BaoCaoDoanhSoBanHangListAction,
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Buttons);
