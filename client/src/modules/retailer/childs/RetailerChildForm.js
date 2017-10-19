const {Translate, I18n} = ReactReduxI18n;

import * as RetailerListActions from 'modules/retailer/actions/list';
import * as RetailerFormChildActions from 'modules/retailer/actions/formChild';
import {formChange as retailerFormChange} from 'modules/retailer/actions/form';
import {loadList as valueAddedTaxLoadList} from 'modules/valueAddedTax/actions/list'; // Hinh thuc nhap

class RetailerChildForm extends React.Component{
    constructor(){
        super();
        this.state = {
            shipments: [],
            keyRowSelected: 0
        };
    }

    componentDidMount(){
        this.props.valueAddedTaxLoadList();
        Helper.CheckPageHeight(300);
    }

    _onClickListChild(child, key){
        this.props.chooseListChildSelectedDetail(child);
        this.props.formChangeMode('edit');
        this.setState({keyRowSelected: key});
    }

    _bindChangeMedicine(event){
        const value = event.target.value;
        this.props.formChange('medicine_id', value);

        //: Reset total price and vat
        this.props.formChange('tax_level_id', '');
        this.props.formChange('total_price', '');
        this.props.formChange('quantity', 0);

        axios.get(`${Config.API_URL}medicine/${value}`)
        .then(response => {
            const detail = response.data.data;
            this.props.formChange('unit_name', detail.unit2.name);
            this.props.formChange('input_price', detail.retail_price);
            this.props.formChange('gia_nhap', detail.input_price);
            this.props.formChange('medicine_name', detail.name);
            // Load thong tin So lo + so luon ton
            axios.get(`${Config.API_URL}pharmacy-warehouse/${this.props.retailerForm.values.from_drug_store_id}/medicine/${value}`)
            .then(response => {
                const list = response.data.data;
                this.setState({shipments: list});
            });
        });
    }

    _bindChangeShipment(event){
        const value = event.target.value;
        this.props.formChange('shipment_no', value);
        axios.get(`${Config.API_URL}pharmacy-warehouse/${this.props.retailerForm.values.from_drug_store_id}/medicine/${this.props.retailerFormChild.values.medicine_id}/shipment/${value}`)
        .then(response => {
            const shipmentObj = response.data.data[0];
            this.props.formChange('inventory_number', shipmentObj.quantity);
            this.props.formChange('medicine_limited_date', shipmentObj.medicine_limited_date);
        });
    }

    // Ghi nhan
    _bindAccept(){
        if(this.props.retailerFormChild.mode === 'add'){
            this._onValidationSubmit()
            .then(valid => {
                    if(valid){

                        const selectedDetail = this.props.retailerFormChild.values;
                        const listChild = this.props.retailers.listChild.list;
                        let value = Helper.hasDuplicate(listChild, selectedDetail, 'medicine_id', 'shipment_no');
                        if(value == true)
                        {
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
        else if(this.props.retailerFormChild.mode === 'edit'){

            // const total_money_before_discount = this.props.internalStockDeliveries.selectedDetail.total_money_before_discount;
            const removeObj = this.props.retailers.listChild.list[this.state.keyRowSelected];
            const discount_remove = removeObj.total_price;
            const vat_tax_money_remove = removeObj.vat_tax_money;

            const list_remain = this._removeByKey(this.props.retailers.listChild.list, this.state.keyRowSelected);

            setTimeout(() => {
                this.props.changeListChild(list_remain);
//                this.props.clearListChildSelectedDetail();
                this._calculatorMoneyParentForm(discount_remove, 'delete', vat_tax_money_remove);
//                this.props.formClear();

                  const selectedDetail = this.props.retailerFormChild.values;
                    const listChild = this.props.retailers.listChild.list;
                    let value = Helper.hasDuplicate(listChild, selectedDetail, 'medicine_id', 'shipment_no');
                    if(value == true){
                        selectedDetail.id = new Date().toISOString();
                        listChild.push(selectedDetail);
                        this.props.changeListChild(listChild);
                        this._calculatorMoneyParentForm(selectedDetail.total_price, 'add', selectedDetail.vat_tax_money);
                        this._bindClearChildForm();
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
        var total_money_before_discount = this.props.retailerForm.values.total_money_before_discount;
        var delivery_total_money = this.props.retailerForm.values.delivery_total_money_added;
        var total_discount_money = this.props.retailerForm.values.total_discount_money;
        var discount_rate = this.props.retailerForm.values.discount_rate;
        var total_vat_money = this.props.retailerForm.values.total_vat_money; // total vat

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
        this.props.retailerFormChange('total_money_before_discount', total_money_before_discount_added);
        this.props.retailerFormChange('delivery_total_money', delivery_total_money_added);
        this.props.retailerFormChange('total_discount_money', total_discount_money_added);
        this.props.retailerFormChange('total_vat_money', total_vat_money_added);
    }

    _bindRemoveChild(child, key){
        // const total_money_before_discount = this.props.internalStockDeliveries.selectedDetail.total_money_before_discount;
        const removeObj = this.props.retailers.listChild.list[key];
        const discount_remove = removeObj.total_price;
        const add_tax_remove = removeObj.vat_tax_money;
        const list_remain = this._removeByKey(this.props.retailers.listChild.list, key);
        setTimeout(() => {
            this.props.changeListChild(list_remain);
            this.props.clearListChildSelectedDetail();
            this._calculatorMoneyParentForm(discount_remove, 'delete',add_tax_remove);
            this.props.formClear();
        }, 0);
        // sau khi remove thi clear form
    }

    _bindClearChildForm(){
        this.props.formClear();
        this.props.clearListChildSelectedDetail();
        this.props.formChangeMode('add');
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
            case 'quantity': {
                if(Check.CheckEmpty(value) || parseFloat(value) < 1)
                    error = 'application.validation.required';
                else if(parseFloat(value) > parseFloat(this.props.retailerFormChild.values.inventory_number))
                    error = 'application.validation.max';
                else
                    error = '';
                    //let totalPrice = parseFloat(value) * parseFloat(this.props.retailerFormChild.values.input_price);
                    //this.props.formChange('total_price', totalPrice); // Khi thjay doi input price, tinh lai thong tin total price

                    let form_values = this.props.retailerFormChild.values;
                    let total_price = Helper.getTotalPrice(form_values.input_price, value, form_values.tax_level_id);
                    this.props.formChange('total_price', total_price);
                break;
            }
            case 'medicine_id':
            case 'shipment_no':
            {
                if(Check.CheckEmpty(value))
                    error = 'application.validation.required';
                else
                    error = '';
                break;
            }
            case 'tax_level_id': {
                if(Check.CheckEmpty(value))
                    error = 'application.validation.required';
                else
                    error = '';
                    //let vatTotalTaxMoney =  Helper.getVATQuanlityItem(this.props.retailerFormChild.values.input_price, value, this.props.retailerFormChild.values.quantity);
                    //let totalPrice = parseFloat(this.props.retailerFormChild.values.total_price) + parseFloat(vatTotalTaxMoney);
                    //this.props.formChange('vat_tax_money', vatTotalTaxMoney); // Khi thjay doi VAT
                    //this.props.formChange('total_price', totalPrice); // cập nhật lại giá tổng tiền

                    let form_values = this.props.retailerFormChild.values;
                    let total_price = Helper.getTotalPrice(form_values.input_price, form_values.quantity, value);
                    this.props.formChange('total_price', total_price);
                break;
            }
        }
        this.props.formValidation(field, error);
    }

    _onValidationSubmit(){
        const {medicine_id, shipment_no, quantity, inventory_number,total_price, tax_level_id} = this.props.retailerFormChild.values;

        this._onChangeChildField('medicine_id', medicine_id);
        this._onChangeChildField('shipment_no', shipment_no);
        this._onChangeChildField('quantity', quantity);
        this._onChangeChildField('inventory_number', inventory_number);
        this._onChangeChildField('total_price', total_price);
        this._onChangeChildField('tax_level_id', tax_level_id);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const errors = this.props.retailerFormChild.errors;
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
        const selectedDetail = this.props.retailerFormChild.values;
    	return (
    		 <div className="portlet box green">
                <div className="portlet-title">
                    <div className="caption">
                        Thông tin chi tiết
                    </div>
                </div>
                <div className="portlet-body form">
                    <div className="row">
                        <form role="form">
                            <div className="form-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className={this.props.retailerFormChild.errors.medicine_id?'form-group has-error':'form-group'}>
                                            <label>Sản phẩm</label>
                                            <select className="form-control" value={selectedDetail.medicine_id}
                                                onChange={this._bindChangeMedicine.bind(this)} ref="medicine_id">
                                                <option value=""></option>
                                                {
                                                    this.props.medicines.list.map((medicine, key) => {
                                                        return (
                                                            <option key={key} value={medicine.id}>
                                                                {medicine.name}
                                                            </option>
                                                        );
                                                    })
                                                }
                                            </select>
                                            <span className="help-block" style={{display: this.props.retailerFormChild.errors.medicine_id ? 'block': 'none'}}>
                                                <Translate value={this.props.retailerFormChild.errors.medicine_id}/>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className={this.props.retailerFormChild.errors.shipment_no?'form-group has-error':'form-group'}>
                                            <label>Số lô</label>
                                            <select className="form-control" value={selectedDetail.shipment_no}
                                                onChange={this._bindChangeShipment.bind(this)}>
                                            <option value=""></option>
                                            {
                                                this.state.shipments.map((shipment, key) => {
                                                    return (
                                                        <option key={key} value={shipment.shipment_no}>
                                                            {shipment.shipment_no}
                                                        </option>
                                                    );
                                                })
                                            }
                                            </select>
                                            <span className="help-block" style={{display: this.props.retailerFormChild.errors.shipment_no ? 'block': 'none'}}>
                                                <Translate value={this.props.retailerFormChild.errors.shipment_no}/>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>Tồn kho</label>
                                            <select className="form-control" value={selectedDetail.shipment_no}
                                                onChange={this._bindChangeShipment.bind(this)} disabled>
                                            <option value=""></option>
                                            {
                                                this.state.shipments.map((shipment, key) => {
                                                    return (
                                                        <option key={key} value={shipment.shipment_no}>
                                                            {shipment.quantity}
                                                        </option>
                                                    );
                                                })
                                            }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>Đơn vị tính</label>
                                            <input type="text" className="form-control" value={selectedDetail.unit_name} readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                <div className="col-md-2">
                                        <div className="form-group">
                                        <label>Đơn giá</label>
                                        <input type="text" className="form-control text-right" value={Numeral(selectedDetail.input_price).format('0,0')} readOnly />
                                        </div>
                                    </div>
                                <div className="col-md-2">
                                    <div className={this.props.retailerFormChild.errors.quantity ?'form-group has-error':'form-group'}>
                                        <label>Số lượng</label>
                                        <input type="number" min="0" className="form-control text-right" value={selectedDetail.quantity} onChange={event => this._onChangeChildField('quantity', event.target.value)}/>
                                        <span className="help-block" style={{display: this.props.retailerFormChild.errors.quantity ? 'block': 'none'}}>
                                            <Translate value={this.props.retailerFormChild.errors.quantity}/>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                        <div className={this.props.retailerFormChild.errors.tax_level_id ?'form-group has-error':'form-group'}>
                                            <label><Translate value="application.text.vatTax"/></label>
                                            <select className="form-control" value={selectedDetail.tax_level_id} onChange={event => this._onChangeChildField('tax_level_id', event.target.value)}>
                                            {
                                                this.props.valuesAddedTax.listRoot.map((type, key) => {
                                                    return (
                                                        <option key={key} value={type.percent_tax}>{type.percent_tax}</option>
                                                    );
                                                })
                                            }
                                            </select>
                                            <span className="help-block" style={{display: this.props.retailerFormChild.errors.tax_level_id ? 'block': 'none'}}>
                                                <Translate value={this.props.retailerFormChild.errors.tax_level_id}/>
                                            </span>
                                        </div>
                                    </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label>Thành tiền</label>
                                        <input type="text" className="form-control text-right" value={Numeral(selectedDetail.total_price).format('0,0')} readOnly onChange={event => this._onChangeChildField('total_price', event.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>&nbsp;&nbsp;&nbsp;</label>
                                        <div>
                                            <button className="btn red"  style={{width:'50%'}} type="button" onClick={this._bindClearChildForm.bind(this)}><Translate value="application.button.addChild"/></button>
                                            <button className="btn green" style={{width:'50%'}} type="button" onClick={this._bindAccept.bind(this)}><Translate value="application.button.saveChild"/></button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="form-horizontal">
                        <div className="form-body">
                            <div className="row">
                                <div className="table-scrollable">
                                    <table className="table fixed-header table-bordered" id="search_bill_result_list">
                                        <thead>
                                            <tr>
                                                <th className="col-md-3">Tên sản phẩm</th>
                                                <th>Đơn vị tính</th>
                                                <th>Số lô</th>
                                                <th>SL tồn</th>
                                                <th>Số lượng</th>
                                                <th>Đơn giá</th>
                                                <th>Tiền thuế</th>
                                                <th>Thành tiền</th>
                                                <th>Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody id="list-container">
                                        {
                                            (this.props.retailers.listChild === 'undefined' || this.props.retailers.listChild.list === 'undefined' || this.props.retailers.listChild.list.length == 0)
                                            ?
                                            (    <tr>
                                                    <td colSpan="9" className='text-center'>
                                                        <Translate value="application.text.noItems"/>
                                                    </td>
                                                </tr>
                                            )
                                            :
                                            (
                                            this.props.retailers.listChild.list.map((child, key) => {
                                                const selected = (this.props.retailers.listChild.selectedDetail.id === child.id) ? 'row-active': '';

                                                return (
                                                    <tr key={key} onClick={this._onClickListChild.bind(this, child, key)} className={selected}>
                                                        <td>{child.medicine_name}</td>
                                                        <td>{child.unit_name}</td>
                                                        <td>{child.shipment_no}</td>
                                                        <td>{child.inventory_number}</td>
                                                        <td>{child.quantity}</td>
                                                        <td className="text-center">{Numeral(child.input_price).format('0,0')}</td>
                                                        <td className="text-center">{Numeral(child.vat_tax_money).format('0,0')}</td>
                                                        <td className="text-center">{Numeral(child.total_price).format('0,0')}</td>
                                                        <td><button type="button" className="btn btn-warning btn-block" onClick={this._bindRemoveChild.bind(this, child, key)}><Translate value="application.button.delChid"/></button></td>
                                                    </tr>
                                                );
                                            })
                                                    )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    	);
    }
}

const mapStateToProps = ({
        retailers,
        retailerForm,
        retailerFormChild,
        medicines,
        valuesAddedTax
    }) => {
    return {
        retailers,
        retailerForm,
        retailerFormChild,
        medicines,
        valuesAddedTax
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...RetailerListActions,
        ...RetailerFormChildActions,
        retailerFormChange,
        valueAddedTaxLoadList
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(RetailerChildForm);
