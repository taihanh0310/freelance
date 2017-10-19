const {Translate, I18n} = ReactReduxI18n;
import Datepicker from 'common/components/Datepicker';
import Modal from 'common/components/Modal';
import MedicineFormView from 'modules/medicine/MedicineFormView';
import * as ProductInputListActions from 'modules/productInput/actions/list';
import * as ProductInputFormChildActions from 'modules/productInput/actions/formChild';
import {formChange as productInputFormChange} from 'modules/productInput/actions/form';
import {loadList as valueAddedTaxLoadList} from 'modules/valueAddedTax/actions/list'; // Hinh thuc nhap
import {loadOnlyMedicine as medicineLoadList, loadList as medicinePopupLoadList} from 'modules/medicine/actions/list'; 
import {loadList as countryLoadList} from 'modules/country/actions/list';

class ProductInputChildForm extends React.Component{
    constructor(){
        super();
        this.state = {
            shipments: [],
            keyRowSelected: 0,
            confirm: false,
            medicinePopup: false
        };
    }

    componentDidMount(){
        this.props.valueAddedTaxLoadList();
        this.props.medicineLoadList();
        this.props.countryLoadList();
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
            this.props.formChange('unit_id', detail.unit2.id);
            this.props.formChange('storage_position_id', detail.storage_position.id);
            this.props.formChange('storage_position_name', detail.storage_position.name);
            this.props.formChange('input_price', detail.input_price);
            this.props.formChange('input_first_price', detail.input_first_price);
            this.props.formChange('retail_price', detail.retail_price);
            this.props.formChange('wholesale_price', detail.wholesale_price);
            this.props.formChange('medicine_name', detail.name);
        });
    }

    // Ghi nhan
    _bindAccept(){

        if(this.props.productInputFormChild.mode === 'add'){
            this._onValidationSubmit()
            .then(valid => {
                    if(valid){

                        const selectedDetail = this.props.productInputFormChild.values;
                        const listChild = this.props.productInputs.listChild.list;
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
        else if(this.props.productInputFormChild.mode === 'edit'){
            // const total_money_before_discount = this.props.internalStockDeliveries.selectedDetail.total_money_before_discount;
            const removeObj = this.props.productInputs.listChild.list[this.state.keyRowSelected];
            const discount_remove = removeObj.total_price;
            const vat_tax_money_remove = removeObj.vat_tax_money;

            const list_remain = this._removeByKey(this.props.productInputs.listChild.list, this.state.keyRowSelected);

            setTimeout(() => {
                this.props.changeListChild(list_remain);
//                this.props.clearListChildSelectedDetail();
                this._calculatorMoneyParentForm(discount_remove, 'delete', vat_tax_money_remove);
//                this.props.formClear();
                    const selectedDetail = this.props.productInputFormChild.values;
                    const listChild = this.props.productInputs.listChild.list;

                    let value = Helper.hasDuplicate(listChild, selectedDetail, 'medicine_id', 'shipment_no');
                    if(value == true){
                        selectedDetail.id = new Date().toISOString();
                        listChild.push(selectedDetail);
                        this.props.changeListChild(listChild);
                        this._calculatorMoneyParentForm(selectedDetail.total_price, 'add', selectedDetail.vat_tax_money);
                        // this._bindClearChildForm();
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
        var total_money_before_discount = this.props.productInputForm.values.total_money_before_discount;
        var product_total_money = this.props.productInputForm.values.product_total_money;
        var total_discount_money = this.props.productInputForm.values.total_discount_money;
        var discount_rate = this.props.productInputForm.values.discount_rate;
        var total_vat_money = this.props.productInputForm.values.total_vat_money; // total vat

        var total_money_before_discount_added = 0;
        var product_total_money_added = 0;
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
        product_total_money_added = parseFloat(total_money_before_discount_added) - parseFloat(total_discount_money_added);

        // cập nhật giá trị của form parent
        this.props.productInputFormChange('total_money_before_discount', total_money_before_discount_added);
        this.props.productInputFormChange('product_total_money', product_total_money_added);
        this.props.productInputFormChange('total_discount_money', total_discount_money_added);
        this.props.productInputFormChange('total_vat_money', total_vat_money_added);
    }

    _bindRemoveChild(child, key){
        // const total_money_before_discount = this.props.internalStockDeliveries.selectedDetail.total_money_before_discount;
        const removeObj = this.props.productInputs.listChild.list[key];
        const discount_remove = removeObj.total_price;
        const add_tax_remove = removeObj.vat_tax_money;
        const list_remain = this._removeByKey(this.props.productInputs.listChild.list, key);
        setTimeout(() => {
            this.props.changeListChild(list_remain);
            this.props.clearListChildSelectedDetail();
            this._calculatorMoneyParentForm(discount_remove, 'delete', add_tax_remove);
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
                else
                    error = '';
                    //this.props.formChange('total_price', totalPrice); // Khi thjay doi input price, tinh lai thong tin total price

                    let form_values = this.props.productInputFormChild.values;
                    let total_price = Helper.getTotalPrice(form_values.input_price, value, form_values.tax_level_id);
                    this.props.formChange('total_price', total_price);
                break;
            }
            case 'medicine_id':
            case 'medicine_created_date':
            case 'shipment_no':
            {
                if(Check.CheckEmpty(value))
                {
                    error = 'application.validation.required';
                    this.props.formChange('country_name', ''); // empty country name
                }
                else{
                    error = '';
                }
                break;
            }
            case 'country_id':{
                if(Check.CheckEmpty(value))
                {
                    error = 'application.validation.required';
                    this.props.formChange('country_name', ''); // empty country name
                }
                else
                {
                    axios.get(`${Config.API_URL}countries/${value}`)
                    .then(response => {
                        const detail = response.data.data;
                        this.props.formChange('country_name', detail.name);
                    });
                    error = '';
                }
                break;
            }
            case 'tax_level_id': {
                if(Check.CheckEmpty(value))
                    error = 'application.validation.required';
                else
                    error = '';
                    //let vatTotalTaxMoney =  Helper.getVATQuanlityItem(this.props.productInputFormChild.values.input_price, value, this.props.productInputFormChild.values.quantity);
                    //let totalPrice2 = parseFloat(this.props.productInputFormChild.values.total_price) + parseFloat(vatTotalTaxMoney);
                    //this.props.formChange('vat_tax_money', vatTotalTaxMoney); // Khi thjay doi VAT
                    //this.props.formChange('total_price', totalPrice2); // cập nhật lại giá tổng tiền

                    let form_values = this.props.productInputFormChild.values;
                    let total_price = Helper.getTotalPrice(form_values.input_price, form_values.quantity, value);
                    this.props.formChange('total_price', total_price);

                break;
            }
            case 'medicine_limited_date':{
                if(Check.CheckEmpty(value))
                    error = 'application.validation.required';
                else if(Check.soSanhHaiNgay(this.props.productInputFormChild.values.medicine_created_date, value) == 1)
                    error = 'application.validation.compareLimitedDate';
                else
                    error = '';
                break;
            }
        }
        this.props.formValidation(field, error);
    }
    
    _onValidationSubmit(){
        const {
            medicine_id,
            shipment_no,
            quantity,
            total_price,
            medicine_limited_date,
            medicine_created_date,
            country_id,
            country_name,
            tax_level_id
        } = this.props.productInputFormChild.values;

        this._onChangeChildField('medicine_id', medicine_id);
        this._onChangeChildField('shipment_no', shipment_no);
        this._onChangeChildField('quantity', quantity);
        this._onChangeChildField('total_price', total_price);
        this._onChangeChildField('medicine_limited_date', medicine_limited_date);
        this._onChangeChildField('medicine_created_date', medicine_created_date);
        this._onChangeChildField('country_id', country_id);
        this._onChangeChildField('country_name', country_name);
        this._onChangeChildField('tax_level_id', tax_level_id);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const errors = this.props.productInputFormChild.errors;
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
    
    _stopSubmitForm(e){
        e.preventDefault();
    }
    render(){
        const selectedDetail = this.props.productInputFormChild.values;
    	return (                
                <div className="portlet box green">
                <Modal modal={this.state.medicinePopup} onRequestClose={()=>this.setState({medicinePopup: false})}>
                    <div className="modal-body">
                      <MedicineFormView popup={true} onExit={()=>this.setState({medicinePopup: false})} onSelect={(medicine) => {
                        this.setState({medicinePopup: false}, () => {
                          this.props.medicinePopupLoadList().then(() => {
                            this.props.formChange('medicine_id', medicine.id);
                          });
                        });
                      }}/>
                    </div>
                </Modal>
                <div className="portlet-title">
                    <div className="caption">
                        Thông tin chi tiết
                    </div>
                </div>
                <div className="portlet-body form">
                        <form role="form" onSubmit={this._stopSubmitForm.bind(this)}>
                            <div className="form-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className={this.props.productInputFormChild.errors.medicine_id?'form-group has-error':'form-group'}>
                                            <label>Sản phẩm</label>
                                            <div className="input-group">
                                            <select className="form-control" value={selectedDetail.medicine_id}
                                                onChange={this._bindChangeMedicine.bind(this)} ref="medicine_id">
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
                                            <span className="help-block" style={{display: this.props.productInputFormChild.errors.medicine_id ? 'block': 'none'}}>
                                                <Translate value={this.props.productInputFormChild.errors.medicine_id}/>
                                            </span>
                                            <span className="input-group-btn">
                                                <span className="btn btn-primary" onClick={() => this.setState({medicinePopup: true})}>
                                                    <span className="glyphicon glyphicon-plus"></span>
                                                </span>
                                            </span>
                                        </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Đơn vị tính</label>
                                            <input type="text" className="form-control" value={selectedDetail.unit_name} readOnly />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Vị trí cất giữ</label>
                                            <input type="text" className="form-control" value={selectedDetail.storage_position_name} readOnly />
                                        </div>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                        <label>Giá nhập</label>
                                        <input type="text" className="form-control text-right" value={Numeral(selectedDetail.input_price).format('0,0')} readOnly />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                        <label><Translate value="productInput.field.wholesale_price"/></label>
                                        <input type="text" className="form-control text-right" value={Numeral(selectedDetail.wholesale_price).format('0,0')} readOnly />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                        <label><Translate value="productInput.field.retail_price"/></label>
                                        <input type="text" className="form-control text-right" value={Numeral(selectedDetail.retail_price).format('0,0')} readOnly />
                                        </div>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className={this.props.productInputFormChild.errors.shipment_no?'form-group has-error':'form-group'}>
                                            <label>Số lô</label>
                                            <input type="text" className="form-control" value={selectedDetail.shipment_no} onChange={event => this._onChangeChildField('shipment_no', event.target.value)}/>
                                            <span className="help-block" style={{display: this.props.productInputFormChild.errors.shipment_no ? 'block': 'none'}}>
                                                <Translate value={this.props.productInputFormChild.errors.shipment_no}/>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className={this.props.productInputFormChild.errors.quantity ?'form-group has-error':'form-group'}>
                                            <label>Số lượng</label>
                                            <input type="number" min="0" className="form-control text-right" value={selectedDetail.quantity}  onChange={event => this._onChangeChildField('quantity', event.target.value)}/>
                                            <span className="help-block" style={{display: this.props.productInputFormChild.errors.quantity ? 'block': 'none'}}>
                                                <Translate value={this.props.productInputFormChild.errors.quantity}/>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className={this.props.productInputFormChild.errors.tax_level_id ?'form-group has-error':'form-group'}>
                                            <label><Translate value="application.text.vatTax"/></label>
                                            <select className="form-control" value={selectedDetail.tax_level_id} onChange={event => this._onChangeChildField('tax_level_id', event.target.value)} ref="tax_level_id">
                                            {
                                                this.props.valuesAddedTax.listRoot.map((type, key) => {
                                                    return (
                                                        <option key={key} value={type.percent_tax}>{type.percent_tax}</option>
                                                    );
                                                })
                                            }
                                            </select>
                                            <span className="help-block" style={{display: this.props.productInputFormChild.errors.tax_level_id ? 'block': 'none'}}>
                                                <Translate value={this.props.productInputFormChild.errors.tax_level_id}/>
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className='col-md-4'>
                                        <div className={this.props.productInputFormChild.errors.country_id?'form-group has-error':'form-group'}>
                                            <label>
                                                <Translate value="productInput.field.country_id"/>
                                            </label>
                                            <select className="form-control" onChange={event => this._onChangeChildField('country_id', event.target.value)}
                                                value={this.props.productInputFormChild.values.country_id}>
                                                {
                                                    this.props.countries.listRoot.map((country, key) => {
                                                        return (
                                                            <option key={key} value={country.id}>{country.name}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                            <span className="help-block" style={{display: this.props.productInputFormChild.errors.country_id ? 'block': 'none'}}>
                                                <Translate value={this.props.productInputFormChild.errors.country_id}/>
                                            </span>
                                        </div>
                                    </div>

                                    <div className='col-md-4'>
                                        <div className={this.props.productInputFormChild.errors.medicine_created_date?'form-group has-error':'form-group'}>
                                            <label>
                                                <Translate value="productInput.field.medicine_created_date"/>
                                            </label>
                                            <Datepicker value={this.props.productInputFormChild.values.medicine_created_date} onChange={(value) => this._onChangeChildField('medicine_created_date', value)} readOnly/>
                                            <span className="help-block" style={{display: this.props.productInputFormChild.errors.medicine_created_date ? 'block': 'none'}}>
                                                <Translate value={this.props.productInputFormChild.errors.medicine_created_date}/>
                                            </span>
                                        </div>
                                    </div>

                                    <div className='col-md-4'>
                                        <div className={this.props.productInputFormChild.errors.medicine_limited_date?'form-group has-error':'form-group'}>
                                            <label>
                                                <Translate value="productInput.field.medicine_limited_date"/>
                                            </label>
                                            <Datepicker value={this.props.productInputFormChild.values.medicine_limited_date} onChange={(value) => this._onChangeChildField('medicine_limited_date', value)}/>
                                            <span className="help-block" style={{display: this.props.productInputFormChild.errors.medicine_limited_date ? 'block': 'none'}}>
                                                <Translate value={this.props.productInputFormChild.errors.medicine_limited_date}/>
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Thành tiền</label>
                                        <input type="text" className="form-control text-right" value={Numeral(selectedDetail.total_price).format('0,0')} readOnly onChange={event => this._onChangeChildField('total_price', event.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>&nbsp;&nbsp;&nbsp;</label>
                                        <div>
                                            <button className="btn red" style={{width:'50%'}} type="button" onClick={this._bindClearChildForm.bind(this)}><Translate value="application.button.addChild"/></button>
                                            <button className="btn green" style={{width:'50%'}} type="button" onClick={this._bindAccept.bind(this)}><Translate value="application.button.saveChild"/></button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </form>
                    
                    <div className="form-horizontal">
                        <div className="form-body">
                                <div className="table-scrollable">
                                    <table className="table fixed-header table-bordered" id="search_bill_result_list">
                                        <thead>
                                            <tr>
                                                <th className="col-md-4">Tên sản phẩm</th>
                                                <th>Số lô</th>
                                                <th>Đơn vị tính</th>
                                                <th>Số lượng</th>
                                                <th>Đơn giá</th>
                                                <th>Tiền thuế</th>
                                                <th>Thành tiền</th>
                                                <th>Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody id="list-container">
                                        {
                                            (this.props.productInputs.listChild === 'undefined' || this.props.productInputs.listChild.list === 'undefined' || this.props.productInputs.listChild.list.length == 0)
                                            ?
                                            (    <tr>
                                                    <td colSpan="8" className='text-center'>
                                                        <Translate value="application.text.noItems"/>
                                                    </td>
                                                </tr>
                                            )
                                            :
                                            (
                                            this.props.productInputs.listChild.list.map((child, key) => {
                                                const selected = (this.props.productInputs.listChild.selectedDetail.id === child.id) ? 'row-active': '';

                                                return (
                                                    <tr key={key} onClick={this._onClickListChild.bind(this, child, key)} className={selected}>
                                                        <td>{child.medicine_name}</td>
                                                        <td>{child.shipment_no}</td>
                                                        <td>{child.unit_name}</td>
                                                        <td>{Numeral(child.quantity).format('0,0')}</td>
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
    	);
    }
}

const mapStateToProps = ({
        productInputs,
        productInputForm,
        productInputFormChild,
        valuesAddedTax,
        medicines,
        countries
    }) => {
    return {
        productInputs,
        productInputForm,
        productInputFormChild,
        valuesAddedTax,
        medicines,
        countries
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...ProductInputListActions,
        ...ProductInputFormChildActions,
        productInputFormChange,
        valueAddedTaxLoadList,
        medicineLoadList,
        countryLoadList,
        medicinePopupLoadList
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ProductInputChildForm);
