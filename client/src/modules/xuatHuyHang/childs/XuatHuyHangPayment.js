const {Translate, I18n} = ReactReduxI18n;
import * as XuatHuyHangListActions from 'modules/xuatHuyHang/actions/list';
import * as XuatHuyHangFormActions from 'modules/xuatHuyHang/actions/form';

class XuatHuyHangPayment extends React.Component{
    _onChangeField(field, value){
        this.props.formChange(field, value);
    }

	render(){
        const form = this.props.xuatHuyHangForm.values;
		return (
			<div className="portlet box green" id="thanh_tien">
                <div className="portlet-title">
                        <div className="caption">
                                Thông tin thanh toán
                        </div>
                </div>
                <div className="portlet-body form">
                    <div className="form-horizontal">
                        <div className="form-body">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label className="control-label col-md-4">Tiền ĐH</label>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control text-right" ref="total_money_before_discount" readOnly value ={Numeral(form.total_money_before_discount).format('0,0')}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label className="control-label col-md-4">Tổng VAT</label>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control text-right" ref="total_vat_money" readOnly value ={Numeral(form.total_vat_money).format('0,0')}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label className="control-label col-md-4">Tổng tiền</label>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control text-right" ref="delivery_total_money" readOnly value ={Numeral(form.delivery_total_money).format('0,0')}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	};
}


const mapStateToProps = ({
        xuatHuyHangs,
        xuatHuyHangForm
    }) => {
    return {
        xuatHuyHangs,
        xuatHuyHangForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...XuatHuyHangListActions,
        ...XuatHuyHangFormActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(XuatHuyHangPayment);
