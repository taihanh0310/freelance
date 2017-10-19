const {Translate, I18n} = ReactReduxI18n;
import * as QuanLyCongNoListActions from 'modules/quanLyCongNo/actions/list';

class ButtonList1 extends React.Component {
    _onPrintReview(){
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
                                <button type="button" className="btn green btn-customer-size display_none">
                                    <Translate value="application.button.review_and_print"/>
                                </button>
                                &nbsp;
                                <button type="button" className="btn green btn-customer-size display_none">
                                    Xuất file excel
                                </button>
                            </div>

                            <div className="col-md-2">

                            </div>

                            <div className="col-md-2 text-right">
                                Tổng công nợ: {Numeral(this.props.quanLyCongNos.list.total).format('0,0')}
                            </div>
                        </div>
                    </div>
                </div>
        );
    };
}

const mapStateToProps = ({
    quanLyCongNos
    }) => {
    return {
        quanLyCongNos
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
                ...QuanLyCongNoListActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ButtonList1);