const {Translate, I18n} = ReactReduxI18n;
import * as ProductInputListActions from 'modules/productInput/actions/list';
import * as ProductInputFormActions from 'modules/productInput/actions/form';

import ProductInputChildSearchResult from 'modules/productInput/childs/ProductInputChildSearchResult';

class ProductInputPayment extends React.Component{
    _onChangeField(field, value){
        this.props.formChange(field, value);
        if(field === 'discount_rate'){
            var total_money_before_discount = this.props.productInputForm.values.total_money_before_discount;
            var product_total_money = this.props.productInputForm.values.product_total_money;

            const total_discount_money_added = Helper.calcDiscount(value, total_money_before_discount);
            var product_total_money_added = parseFloat(total_money_before_discount) - parseFloat(total_discount_money_added);
            
            // cap nhat so tien discount
            this.props.formChange('total_discount_money', total_discount_money_added);
            // cap nhat so du
            this.props.formChange('product_total_money', product_total_money_added);
        }
    }

	render(){
        const form = this.props.productInputForm.values;
		return (
			<div className="portlet box green" id="thanh_tien">
                <div className="portlet-title">
                        <div className="caption">
                                Thông tin thanh toán
                        </div>
                </div>
                <div className="portlet-body form">
                            <div className="form-body">
                            		<div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <label className="control-label">Tổng VAT</label>
                                                <div>
                                                    <input type="text" className="form-control text-right" ref="total_vat_money" readOnly value = {Numeral(form.total_vat_money).format('0,0')}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <label className="control-label">Tiền đơn hàng</label>
                                                <div>
                                                    <input type="text" className="form-control text-right" ref="total_money_before_discount" readOnly value = {Numeral(form.total_money_before_discount).format('0,0')}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <label className="control-label">Chiết khấu [%]</label>
                                                <div className="input-group">
                                                    <input type="number" className="form-control text-right" min="0" max="100" ref="discount_rate" value = {form.discount_rate} onChange={event => this._onChangeField('discount_rate', event.target.value)}/>
                                                    <span className="input-group-btn"><i className="fa fa-angle-double-right"></i></span>
                                                    <input type="text" className="text-right form-control" ref="total_discount_money" readOnly value = {Numeral(form.total_discount_money).format('0,0')}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <label className="control-label">Tổng tiền</label>
                                                <div>
                                                    <input type="text" className="form-control text-right" ref="product_total_money" readOnly value = {Numeral(form.product_total_money).format('0,0')}/>
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
        productInputs,
        productInputForm
    }) => {
    return {
        productInputs,
        productInputForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...ProductInputListActions,
        ...ProductInputFormActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ProductInputPayment);
