const {Translate, I18n} = ReactReduxI18n;

import * as XuatChuyenKhoListActions from 'modules/xuatChuyenKho/actions/list';
import * as XuatChuyenKhoFormChildActions from 'modules/xuatChuyenKho/actions/formChild';
import {formChange as xuatChuyenKhoFormChange} from 'modules/xuatChuyenKho/actions/form';

class XuatChuyenKhoChildForm extends React.Component {
    constructor(){
        super();
        this.state = {
            shipments: [], 
            keyRowSelected: 0
        };
    }
    _onClickListChild(child, key){
        this.props.chooseListChildSelectedDetail(child);
        this.props.formChangeMode('edit');
        this.setState({keyRowSelected: key});
    }
    
    componentDidMount(){
        Helper.CheckPageHeight(300);
    }
    
    _bindChangeMedicine(event){
        const value = event.target.value;
        this.props.formChange('medicine_id', value);
        axios.get(`${Config.API_URL}medicine/${value}`)
        .then(response => {
            const detail = response.data.data;
            this.props.formChange('unit_name', detail.unit2.name);
            this.props.formChange('input_price', detail.input_price);
            this.props.formChange('medicine_name', detail.name);
            // Load thong tin So lo + so luon ton
            axios.get(`${Config.API_URL}pharmacy-warehouse/${this.props.xuatChuyenKhoForm.values.from_drug_store_id}/medicine/${value}`)
            .then(response => {
                const list = response.data.data;
                this.setState({shipments: list});
            });
        });
    }
    
    _bindChangeShipment(event){
        const value = event.target.value;
        this.props.formChange('shipment_no', value);
        
        axios.get(`${Config.API_URL}pharmacy-warehouse/${this.props.xuatChuyenKhoForm.values.from_drug_store_id}/medicine/${this.props.xuatChuyenKhoFormChild.values.medicine_id}/shipment/${value}`)
        .then(response => {
            const shipmentObj = response.data.data[0];
            this.props.formChange('inventory_number', shipmentObj.quantity);
            this.props.formChange('medicine_limited_date', shipmentObj.medicine_limited_date);
        });
    }

    // Ghi nhan
    _bindAccept(){
        if(this.props.xuatChuyenKhoFormChild.mode === 'add'){
            this._onValidationSubmit()
            .then(valid => {
                    if(valid){
                        const selectedDetail = this.props.xuatChuyenKhoFormChild.values;
                        const listChild = this.props.xuatChuyenKhos.listChild.list;
                        let value = Helper.hasDuplicate(listChild, selectedDetail, 'medicine_id', 'shipment_no');
                        if(value == true)
                        {
                            selectedDetail.id = new Date().toISOString();
                            listChild.push(selectedDetail);
                            this.props.changeListChild(listChild);
                            this.props.formClear();

                            // Tinh lai so tien sau khi add them item vao detail
                            this._calculatorMoneyParentForm(selectedDetail.total_price, 'add');
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
        }else if(this.props.xuatChuyenKhoFormChild.mode === 'edit'){
            
            // const total_money_before_discount = this.props.XuatChuyenKho.selectedDetail.total_money_before_discount;
            const removeObj = this.props.xuatChuyenKhos.listChild.list[this.state.keyRowSelected];
            const discount_remove = removeObj.total_price;
            const list_remain = this._removeByKey(this.props.xuatChuyenKhos.listChild.list, this.state.keyRowSelected);
            setTimeout(() => {
                this.props.changeListChild(list_remain);
//                this.props.clearListChildSelectedDetail();
                this._calculatorMoneyParentForm(discount_remove, 'delete');
//                this.props.formClear(); 

                  const selectedDetail = this.props.xuatChuyenKhoFormChild.values;
                    const listChild = this.props.xuatChuyenKhos.listChild.list;
                    let value = Helper.hasDuplicate(listChild, selectedDetail, 'medicine_id', 'shipment_no');
                    if(value == true){
                        selectedDetail.id = new Date().toISOString();
                        listChild.push(selectedDetail);
                        this.props.changeListChild(listChild);
                        this._calculatorMoneyParentForm(selectedDetail.total_price, 'add');
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
    _bindClearChildForm(){
        this.props.formClear();
        this.props.clearListChildSelectedDetail();
        this.props.formChangeMode('add');
        // set model form child ve add
    }

    // Tinh toan loai du lieu nhu form cha truoc sau khi thay doi form child
    _calculatorMoneyParentForm(money_add, mode){
        var total_money_before_discount = this.props.xuatChuyenKhoForm.values.total_money_before_discount;
        var delivery_total_money = this.props.xuatChuyenKhoForm.values.delivery_total_money_added;
        var total_discount_money = this.props.xuatChuyenKhoForm.values.total_discount_money;
        var discount_rate = this.props.xuatChuyenKhoForm.values.discount_rate;

        var total_money_before_discount_added = 0;
        var delivery_total_money_added = 0;
        var total_discount_money_added = 0;
        switch(mode){
            // mode add
            case 'add': {
                total_money_before_discount_added = parseFloat(money_add) + parseFloat(total_money_before_discount);
                total_discount_money_added = Helper.calcDiscount(discount_rate, total_money_before_discount_added);
                break;
            }
            // mode remove
            case 'delete': {
                total_money_before_discount_added = parseFloat(total_money_before_discount) - parseFloat(money_add);
                total_discount_money_added = Helper.calcDiscount(discount_rate, total_money_before_discount_added);
                break;
            }

        }

        // Tinh tong tien
        delivery_total_money_added = parseFloat(total_money_before_discount_added) - parseFloat(total_discount_money_added);

        // cập nhật giá trị của form parent
        this.props.xuatChuyenKhoFormChange('total_money_before_discount', total_money_before_discount_added);
        this.props.xuatChuyenKhoFormChange('delivery_total_money', delivery_total_money_added);
        this.props.xuatChuyenKhoFormChange('total_discount_money', total_discount_money_added);
    }

    _bindRemoveChild(child, key){
        // const total_money_before_discount = this.props.XuatChuyenKho.selectedDetail.total_money_before_discount;
        const removeObj = this.props.xuatChuyenKhos.listChild.list[key];
        const discount_remove = removeObj.total_price;
        const list_remain = this._removeByKey(this.props.xuatChuyenKhos.listChild.list, key);
        setTimeout(() => {
            this.props.changeListChild(list_remain);
            this.props.clearListChildSelectedDetail();
            this._calculatorMoneyParentForm(discount_remove, 'delete');
            this.props.formClear();            
        }, 0);
        // sau khi remove thi clear form
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
                else if(parseFloat(value) > parseFloat(this.props.xuatChuyenKhoFormChild.values.inventory_number)) 
                    error = 'application.validation.max';
                else
                    error = '';
                    let totalPrice = parseFloat(value) * parseFloat(this.props.xuatChuyenKhoFormChild.values.input_price);
                    this.props.formChange('total_price', totalPrice); // Khi thjay doi input price, tinh lai thong tin total price
                break;
            }
            case 'medicine_id':
            case 'shipment_no': {
                if(Check.CheckEmpty(value))
                    error = 'application.validation.required';
                else
                    error = '';
                break;
            }
        }
        this.props.formValidation(field, error);
    }

    _onValidationSubmit(){
        const {medicine_id, shipment_no, quantity, inventory_number} = this.props.xuatChuyenKhoFormChild.values;

        this._onChangeChildField('medicine_id', medicine_id);
        this._onChangeChildField('shipment_no', shipment_no);
        this._onChangeChildField('quantity', quantity);
        this._onChangeChildField('inventory_number', inventory_number);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const errors = this.props.xuatChuyenKhoFormChild.errors;
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
        const selectedDetail = this.props.xuatChuyenKhoFormChild.values;
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
                                    <div className="col-md-3">
                                        <div className={this.props.xuatChuyenKhoFormChild.errors.medicine_id?'form-group has-error':'form-group'}>
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
                                                        )
                                                    })
                                                }
                                            </select>
                                            <span className="help-block" style={{display: this.props.xuatChuyenKhoFormChild.errors.medicine_id ? 'block': 'none'}}>
                                                <Translate value={this.props.xuatChuyenKhoFormChild.errors.medicine_id}/>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className={this.props.xuatChuyenKhoFormChild.errors.shipment_no?'form-group has-error':'form-group'}>
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
                                                    )
                                                })
                                            }
                                            </select>
                                            <span className="help-block" style={{display: this.props.xuatChuyenKhoFormChild.errors.shipment_no ? 'block': 'none'}}>
                                                <Translate value={this.props.xuatChuyenKhoFormChild.errors.shipment_no}/>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
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
                                                    )
                                                })
                                            }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>Đơn vị tính</label>
                                            <input type="text" className="form-control" value={selectedDetail.unit_name} readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                        <label>Đơn giá</label>
                                        <input type="text" className="form-control text-right" value={Numeral(selectedDetail.input_price).format('0,0')} readOnly />
                                        </div>
                                </div>
                                <div className="col-md-3">
                                    <div className={this.props.xuatChuyenKhoFormChild.errors.quantity ?'form-group has-error':'form-group'}>
                                        <label>Số lượng</label>
                                        <input type="number" min="0" className="form-control text-right" value={selectedDetail.quantity} onChange={event => this._onChangeChildField('quantity', event.target.value)}/>
                                        <span className="help-block" style={{display: this.props.xuatChuyenKhoFormChild.errors.quantity ? 'block': 'none'}}>
                                                <Translate value={this.props.xuatChuyenKhoFormChild.errors.quantity}/>
                                            </span>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Thành tiền</label>
                                        <input type="text" className="form-control text-right" value={Numeral(selectedDetail.total_price).format('0,0')} readOnly onChange={event => this._onChangeChildField('total_price', event.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>&nbsp;&nbsp;&nbsp;</label>
                                        <div>
                                            <button className="btn red" type="button" onClick={this._bindClearChildForm.bind(this)} style={{width:'50%'}}><Translate value="application.button.addChild"/></button>
                                            <button className="btn green" type="button" onClick={this._bindAccept.bind(this)} style={{width:'50%'}}><Translate value="application.button.saveChild"/></button>
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
                                                <th>Thành tiền</th>
                                                <th>Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody id="list-container">
                                        {
                                            (this.props.xuatChuyenKhos.listChild === 'undefined' || this.props.xuatChuyenKhos.listChild.list === 'undefined' || this.props.xuatChuyenKhos.listChild.list.length == 0)
                                            ?
                                            (    <tr>
                                                    <td colSpan="8" className='text-center'>
                                                        <Translate value="application.text.noItems"/>
                                                    </td>
                                                </tr>
                                            )
                                            :
                                            (
                                            this.props.xuatChuyenKhos.listChild.list.map((child, key) => {
                                                const selected = (this.props.xuatChuyenKhos.listChild.selectedDetail.id === child.id) ? 'row-active': '';
                                                return (
                                                    <tr key={key} onClick={this._onClickListChild.bind(this, child, key)} className={selected}>
                                                        <td>{child.medicine_name}</td>
                                                        <td>{child.unit_name}</td>
                                                        <td>{child.shipment_no}</td>
                                                        <td>{child.inventory_number}</td>
                                                        <td>{Numeral(child.quantity).format('0,0')}</td>
                                                        <td className="text-center">{Numeral(child.input_price).format('0,0')}</td>
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
    };
};

const mapStateToProps = ({
        xuatChuyenKhos,
        xuatChuyenKhoForm,
        xuatChuyenKhoFormChild,
        medicines
    }) => {
    return {
        xuatChuyenKhos,
        xuatChuyenKhoForm,
        xuatChuyenKhoFormChild,
        medicines
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...XuatChuyenKhoListActions,
        ...XuatChuyenKhoFormChildActions,
        xuatChuyenKhoFormChange
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(XuatChuyenKhoChildForm);