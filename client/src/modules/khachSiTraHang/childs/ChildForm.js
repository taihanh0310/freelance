const {Translate, I18n} = ReactReduxI18n;
import DatepickerReadOnly from 'common/components/DatepickerReadOnly';

import * as KhachSiTraHangListActions from 'modules/khachSiTraHang/actions/list';
import * as KhachSiTraHangFormChildActions from 'modules/khachSiTraHang/actions/formChild';
import {formChange as khachSiTraHangFormChange} from 'modules/khachSiTraHang/actions/form';
import {loadList as valueAddedTaxLoadList} from 'modules/valueAddedTax/actions/list'; // Hinh thuc nhap

class ChildForm extends React.Component{
    constructor(){
        super();
        this.state = {
            shipments: [],
            keyRowSelected: 0,
            returnMedicineCount: 0
        };
    }

    componentDidMount(){
        this.props.valueAddedTaxLoadList();
        Helper.CheckPageHeight(200);
    }

    _onClickListChild(child, key){
        this.props.chooseListChildSelectedDetail(child);
        this.props.formChangeMode('edit');
        this.setState({keyRowSelected: key});
        
        axios.get(`${Config.API_URL}khach-si-tra-hang/code/${this.props.khachSiTraHangForm.values.code}/medicine/${child.medicine_id}/shipment_no/${child.shipment_no}`)
        .then(response => {
                let count = response.data.data;
                this.setState({returnMedicineCount: count});
                var so_luong_con_lai = parseInt(child.quantity) - parseInt(count);
                this.props.formChange('so_luong_con_lai', so_luong_con_lai);
        });
    }
    
    // Ghi nhan
    _bindAccept(){
        if(this.props.khachSiTraHangFormChild.mode === 'add'){
            this._onValidationSubmit()
            .then(valid => {
                    if(valid){

                        const selectedDetail = this.props.khachSiTraHangFormChild.values;
                        const listChild = this.props.khachSiTraHangs.listChild.list;
                        let value = Helper.hasDuplicate(listChild, selectedDetail, 'medicine_id', 'shipment_no');
                        if(value == true){
                            selectedDetail.id = new Date().toISOString();
                            listChild.push(selectedDetail);
                            this.props.changeListChild(listChild);
                            this.props.formClear();
                            // Tinh lai so tien sau khi add them item vao detail
                            this._calculatorMoneyParentForm(selectedDetail.total_price, 'add', selectedDetail.vat_tax_money);
                        }
                        else{
                            toastr.error(I18n.t('errors.add.message'), I18n.t('errors.add.title'), {
                                onclick: function() {
                                        resolve();
                                }
                            });
                        }
                    }
            });
        }
        else if(this.props.khachSiTraHangFormChild.mode === 'edit'){
            // const total_money_before_discount = this.props.internalStockDeliveries.selectedDetail.total_money_before_discount;
            const removeObj = this.props.khachSiTraHangs.listChild.list[this.state.keyRowSelected];
            const discount_remove = 0;//removeObj.thanh_tien_tra;
            const vat_tax_money_remove = 0;//removeObj.vat_tax_money;

            const list_remain = this._removeByKey(this.props.khachSiTraHangs.listChild.list, this.state.keyRowSelected);

            setTimeout(() => {
                this.props.changeListChild(list_remain);
//                this.props.clearListChildSelectedDetail();
                this._calculatorMoneyParentForm(discount_remove, 'delete', vat_tax_money_remove);
//                this.props.formClear();
                    const selectedDetail = this.props.khachSiTraHangFormChild.values;
                    const listChild = this.props.khachSiTraHangs.listChild.list;
                    
                    let value = Helper.hasDuplicate(listChild, selectedDetail, 'medicine_id', 'shipment_no');
                    if(value == true){
                        selectedDetail.id = new Date().toISOString();
                        listChild.push(selectedDetail);
                        this.props.changeListChild(listChild);
                        this.props.formClear();
                        // tinh toan lai so luong va VAT/ Chiet khau
                        this._calculatorMoneyParentForm(selectedDetail.thanh_tien_tra, 'add', selectedDetail.vat_tax_money);
                    }
                    else{
                        toastr.error(I18n.t('errors.update.message'), I18n.t('errors.update.title'), {
                            onclick: function() {
                                    resolve();
                            }
                        });
                    }
            }, 0);
            // sau khi remove thi clear form
        }
    }

    // Tinh toan loai du lieu nhu form cha truoc sau khi thay doi form child
    _calculatorMoneyParentForm(money_add, mode, vat_money_add){
        var total_money_before_discount = this.props.khachSiTraHangForm.values.total_money_before_discount ? this.props.khachSiTraHangForm.values.total_money_before_discount : 0;
        var delivery_total_money = this.props.khachSiTraHangForm.values.delivery_total_money ? this.props.khachSiTraHangForm.values.delivery_total_money : 0;
        var total_discount_money = this.props.khachSiTraHangForm.values.total_discount_money ? this.props.khachSiTraHangForm.values.total_discount_money : 0;
        var discount_rate = this.props.khachSiTraHangForm.values.discount_rate ? this.props.khachSiTraHangForm.values.discount_rate : 0;
        var total_vat_money = this.props.khachSiTraHangForm.values.total_vat_money ? this.props.khachSiTraHangForm.values.total_vat_money : 0; // total vat

        var total_money_before_discount_added = 0;
        var delivery_total_money_added = 0;
        var total_discount_money_added = 0;
        var total_vat_money_added = 0;
        switch(mode){
            // mode add
            case 'add': {
                //total_money_before_discount_added = parseFloat(money_add) + parseFloat(total_money_before_discount) + parseFloat(vat_money_add);
                total_money_before_discount_added = parseFloat(money_add) + parseFloat(total_money_before_discount);
                total_discount_money_added = Helper.calcDiscount(discount_rate, total_money_before_discount_added);
                total_vat_money_added = parseFloat(total_vat_money) + parseFloat(vat_money_add);
                break;
            }
            // mode remove
            case 'delete': {
                //total_money_before_discount_added = parseFloat(total_money_before_discount) - parseFloat(money_add) - parseFloat(vat_money_add);
                total_money_before_discount_added = parseFloat(total_money_before_discount) - parseFloat(money_add);
                total_discount_money_added = Helper.calcDiscount(discount_rate, total_money_before_discount_added);
                total_vat_money_added = parseFloat(total_vat_money) - parseFloat(vat_money_add);
                break;
            }
        }

        // Tinh tong tien
        delivery_total_money_added = parseFloat(total_money_before_discount_added) - parseFloat(total_discount_money_added);

        // cập nhật giá trị của form parent
        this.props.khachSiTraHangFormChange('total_money_before_discount', total_money_before_discount_added);
        this.props.khachSiTraHangFormChange('delivery_total_money', delivery_total_money_added);
        this.props.khachSiTraHangFormChange('total_discount_money', total_discount_money_added);
        this.props.khachSiTraHangFormChange('total_vat_money', total_vat_money_added);
    }

    _removeByKey(array, key){
        array.some(function(item, index) {
            if(key == index){
                // found it!
                array.splice(index, 1);
                return true; // stops the loop
            }
            return false;
        });
        return array;
    }
        
    _onChangeChildField(field, value){
        this.props.formChange(field, value);
        let error = '';
        switch(field){
            case 'so_luong_tra': {              
                if(Check.CheckEmpty(value) || parseInt(value) < 1){
                    error = 'application.validation.spaceErrors';
                    Helper.warningAlert('Bắt buộc phải nhập');
                }
                else if((parseInt(this.props.khachSiTraHangFormChild.values.quantity) < (parseInt(value) + parseInt(this.state.returnMedicineCount)))){
                    error =  'application.validation.spaceErrors';
                    Helper.warningAlert('Số lượng nhập phải bé hơn hoặc bằng số lượng bán');
                }
                else
                {
                    error = '';
                    let vatTotalTaxMoney = Helper.getVATQuanlityItem(this.props.khachSiTraHangFormChild.values.input_price, this.props.khachSiTraHangFormChild.values.tax_level_id, value);
                    let totalPrice = parseFloat(value) * parseFloat(this.props.khachSiTraHangFormChild.values.input_price);
                    let totalPrice2 = parseFloat(totalPrice) + parseFloat(vatTotalTaxMoney);
                    
                    this.props.formChange('vat_tax_money', vatTotalTaxMoney); // Khi thjay doi VAT
                    this.props.formChange('thanh_tien_tra', totalPrice2); // cập nhật lai gia tien phai tra
                    this.props.formChange('total_money_before_discount', totalPrice2);
                    let so_luong_con_lai = parseInt(this.props.khachSiTraHangFormChild.values.quantity) - parseInt(this.state.returnMedicineCount);
                    this.props.formChange('so_luong_con_lai', so_luong_con_lai);
                }
                break;
            }
        }
        this.props.formValidation(field, error);
    }

    _onValidationSubmit(){
        const {so_luong_tra} = this.props.khachSiTraHangFormChild.values;
        this._onChangeChildField('so_luong_tra', so_luong_tra);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const errors = this.props.khachSiTraHangFormChild.errors;
                let valid = true;
                for(let field in errors){
                    let error = errors[field];
                    if(error){
                        valid = false;
                        break;
                    }
                }
                resolve(valid);
            }, 0);
        });
    }
    
    render(){
        const selectedDetail = this.props.khachSiTraHangFormChild.values;
    	return (
    		 <div className="portlet box green">
                <div className="portlet-title">
                    <div className="caption">
                        Thông tin chi tiết
                    </div>
                </div>
                <div className="portlet-body form">
                        <div className="form-body">                        
                            <div className="table-scrollable">
                                <table className="table fixed-header table-bordered" id="search_bill_result_list">
                                    <thead>
                                        <tr>
                                            <th className="col-sm-3">Tên sản phẩm</th>
                                            <th className="col-sm-1">Số lô</th>
                                            <th className="col-sm-1">ĐVT</th>
                                            <th className="col-sm-1">SL Bán</th>
                                            <th className="col-sm-1">Đơn giá</th>
                                            <th className="col-sm-1">Tiền thuế</th>
                                            <th className="col-sm-1">Thành tiền</th>
                                            <th className="col-sm-1">SL Trả</th>
                                            <th className="col-sm-1">Tiền Trả</th>
                                        </tr>
                                    </thead>
                                    <tbody id="list-container">
                                    {
                                        (this.props.khachSiTraHangs.listChild === 'undefined' || this.props.khachSiTraHangs.listChild.list === 'undefined' || this.props.khachSiTraHangs.listChild.list.length == 0)
                                        ?
                                        (    <tr>
                                                <td colSpan="9" className='text-center'>
                                                    <Translate value="application.text.noItems"/>
                                                </td>
                                            </tr>
                                        )
                                        :
                                        (
                                        this.props.khachSiTraHangs.listChild.list.map((child, key) => {
                                            const selected = (this.props.khachSiTraHangs.listChild.selectedDetail.id === child.id) ? 'row-active': '';

                                            return (
                                                <tr key={key} onClick={this._onClickListChild.bind(this, child, key)} className={selected}>
                                                    <td>{child.medicine_name}</td>
                                                    <td>{child.shipment_no}</td>
                                                    <td>{child.unit_name}</td>
                                                    <td className="text-right">{Numeral(child.quantity).format('0,0')}</td>
                                                    <td className="text-right">{Numeral(child.input_price).format('0,0')}</td>
                                                    <td className="text-right">{Numeral(child.vat_tax_money).format('0,0')}</td>
                                                    <td className="text-right">{Numeral(child.total_price).format('0,0')}</td>
                                                    <td className="text-right">{Numeral(child.so_luong_tra).format('0,0')}</td>
                                                    <td className="text-right">{Numeral(child.thanh_tien_tra).format('0,0')}</td>
                                                </tr>
                                            );
                                        })
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <hr className="style14"/>
                            <form role="form">
                            <div className="row">
                                <div className="col-md-2">
                                        <div className='form-group'>
                                            <label>Sản phẩm</label>
                                            <div>
                                                <input type="text" className="form-control" value={selectedDetail.medicine_name} readOnly />
                                            </div>
                                        </div>
                                </div>
                                <div className="col-md-2">
                                        <div className='form-group'>
                                            <label>Số lô</label>
                                            <div>
                                                <input type="text" className="form-control text-right" value={selectedDetail.shipment_no} readOnly />
                                            </div>
                                        </div>
                                </div>
                                 <div className="col-md-2">
                                        <div className="form-group">
                                        <label>Giá sỉ</label>
                                        <input type="text" className="form-control text-right" value={Numeral(selectedDetail.input_price).format('0,0')} readOnly />
                                        </div>
                                    </div>
                                <div className="col-sm-1">
                                        <div className="form-group">
                                        <label>SL tồn</label>
                                        <input type="text" className="form-control text-right" value={Numeral(selectedDetail.so_luong_con_lai).format('0,0')} readOnly />
                                        </div>
                                </div>
                                <div className="col-sm-1">
                                        <div className={this.props.khachSiTraHangFormChild.errors.so_luong_tra?'form-group has-error':'form-group'}>
                                        <label>SL trả</label>
                                        <input type="number" className="form-control text-right" value={selectedDetail.so_luong_tra} min="0" onChange={event => this._onChangeChildField('so_luong_tra', event.target.value)} disabled={this.props.khachSiTraHangForm.disabled}/>
                                        <span className="help-block" style={{display: this.props.khachSiTraHangFormChild.errors.so_luong_tra ? 'block': 'none'}}>
                                            <Translate value={this.props.khachSiTraHangFormChild.errors.so_luong_tra}/>
                                        </span>
                                        </div>
                                    </div>
                                <div className="col-md-2">
                                    <div className={this.props.khachSiTraHangFormChild.errors.thanh_tien_tra?'form-group has-error':'form-group'}>
                                        <label>Thành tiền</label>
                                        <input type="text" className="form-control text-right" value={Numeral(selectedDetail.thanh_tien_tra).format('0,0')} readOnly/>
                                        <span className="help-block" style={{display: this.props.khachSiTraHangFormChild.errors.thanh_tien_tra ? 'block': 'none'}}>
                                            <Translate value={this.props.khachSiTraHangFormChild.errors.thanh_tien_tra}/>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                        <div className="form-group">
                                        <label>&nbsp;&nbsp;&nbsp;</label>
                                        <div>
                                            <button className="btn green btn-block" type="button" onClick={this._bindAccept.bind(this)} disabled={this.props.khachSiTraHangForm.disabled}>Cập nhật</button>
                                        </div>
                                    </div>
                                    </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    	);
    }
}

const mapStateToProps = ({
        khachSiTraHangs,
        khachSiTraHangForm,
        khachSiTraHangFormChild,
        valuesAddedTax,
        medicines
    }) => {
    return {
        khachSiTraHangs,
        khachSiTraHangForm,
        khachSiTraHangFormChild,
        valuesAddedTax,
        medicines
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...KhachSiTraHangListActions,
        ...KhachSiTraHangFormChildActions,
        khachSiTraHangFormChange,
        valueAddedTaxLoadList
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ChildForm);
