const {Translate, I18n} = ReactReduxI18n;

import Datepicker from 'common/components/Datepicker';

import Payment from 'modules/khachLeTraHang/childs/Payment';
import ChildForm from 'modules/khachLeTraHang/childs/ChildForm';
import SearchBill from 'modules/khachLeTraHang/childs/SearchBill';
import SearchBillResult from 'modules/khachLeTraHang/childs/SearchBillResult';

import * as KhachLeTraHangListActions from 'modules/khachLeTraHang/actions/list';
import * as KhachLeTraHangFormActions from 'modules/khachLeTraHang/actions/form';
import {formChange as khachLeTraHangFormChange} from 'modules/khachLeTraHang/actions/form'; // form change cua form cha
import {formClear as formChildClear} from 'modules/khachLeTraHang/actions/formChild'; // clear child form
import {changeList as changeListMedicine} from 'modules/medicine/actions/list'; // List medicine trong child form

import {loadInputFormList as inputTypeFormLoadList} from 'modules/inputOutputTypeForm/actions/list'; // Hinh thuc nhap
import {loadChildPharmacyWareHouse as pharmacyWarehouseLoadList} from 'modules/pharmacyWarehouse/actions/list'; // Danh sach nha thuoc
import {loadList as retailCustomerLoadList} from 'modules/retailCustomer/actions/list'; // Danh sach khach hang le

class ParentForm extends React.Component{
    constructor(){
        super();
        this.state = {
            selectedTam: {}
        }
    }
    
    componentDidMount(){
        this._loadAll();
    }
    
    _loadAll(){
        this.props.inputTypeFormLoadList();
        this.props.pharmacyWarehouseLoadList();
        this.props.retailCustomerLoadList() // load danh sach nha cung cap
    }
    
    _onChangeField(field, value){
            this.props.khachLeTraHangFormChange(field, value);
            let error = '';
            switch(field){
                case 'khach_le_tra_hang_code':
                {
                    if(Check.CheckEmpty(value))
                        error = 'application.validation.required';
                    else
                        error = '';
                    break;
                }
                case 'return_date':{
                    if(Check.CheckEmpty(value))
                        error = 'application.validation.required';
                    else if(Check.soSanhHaiNgay(this.props.khachLeTraHangForm.values.delivery_date,value) == 1)
                        error = 'application.validation.returnDate';
                    else
                        error = '';
                    break;
                }
                case 'input_output_form_type_id':
                {
                    if(Check.CheckEmpty(value))
                        error = 'application.validation.required';
                    else
                        error = '';
                    break;
                }
            }
        }

    _onValidationSubmit(){
        // todo
    }
        
    render(){
        const form = this.props.khachLeTraHangForm.values;
        const fromPharmacyWarehouses = Helper.GetListFilter(this.props.pharmacyWarehouses.listRoot, {is_main_pharmacies_warehouse: 0});
    	return (
    		<div>
                        <SearchBill/>
                        <SearchBillResult/>
    			<div className="portlet box green" id="parent_form_control">
                                <div className="portlet-title">
                                        <div className="caption">
                                                Thông tin hóa đơn khách lẻ trả hàng
                                        </div>
                                </div>
                                <div className="portlet-body form">
                                        <div className="form-body">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className={this.props.khachLeTraHangForm.errors.khach_le_tra_hang_code?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Hóa đơn khách lẻ trả hàng</label>
                                                        <div>
                                                            <input type="text" className="form-control" ref="code"
                                                                value={form.khach_le_tra_hang_code} onChange={event => this._onChangeField('khach_le_tra_hang_code', event.target.value)}/>
                                                                <span className="help-block" style={{display: this.props.khachLeTraHangForm.errors.khach_le_tra_hang_code ? 'block': 'none'}}>
                                                                    <Translate value={this.props.khachLeTraHangForm.errors.khach_le_tra_hang_code}/>
                                                                </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-4">
                                                    <div className={this.props.khachLeTraHangForm.errors.input_output_form_type_id?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Hình thức nhập</label>
                                                        <div>
                                                            <select className="form-control" value={form.input_output_form_type_id} onChange={event => this._onChangeField('input_output_form_type_id', event.target.value)}>
                                                            {
                                                                this.props.inputOutputTypeForms.listRoot.map((type, key) => {
                                                                    return (
                                                                        <option key={key} value={type.id}>{type.name}</option>
                                                                    );
                                                                })
                                                            }
                                                            </select>
                                                            <span className="help-block" style={{display: this.props.khachLeTraHangForm.errors.input_output_form_type_id ? 'block': 'none'}}>
                                                                <Translate value={this.props.khachLeTraHangForm.errors.input_output_form_type_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className={this.props.khachLeTraHangForm.errors.from_drug_store_id ?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Kho nhập</label>
                                                        <div>
                                                            <select className="form-control" value={form.from_drug_store_id} onChange={event => this._onChangeField('from_drug_store_id', event.target.value)} disabled>
                                                               {
                                                                    fromPharmacyWarehouses.map((type, key) => {
                                                                        return (
                                                                            <option key={key} value={type.id}>{type.name}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                            <span className="help-block" style={{display: this.props.khachLeTraHangForm.errors.from_drug_store_id ? 'block': 'none'}}>
                                                                <Translate value={this.props.khachLeTraHangForm.errors.from_drug_store_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                                                                
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className={this.props.khachLeTraHangForm.errors.return_date?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Ngày nhập</label>
                                                        <div>
                                                            <Datepicker value={form.return_date} onChange={(value) => this._onChangeField('return_date', value)}/>
                                                            <span className="help-block" style={{display: this.props.khachLeTraHangForm.errors.return_date ? 'block': 'none'}}>
                                                                <Translate value={this.props.khachLeTraHangForm.errors.return_date}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className='form-group'>
                                                        <label className="control-label">Khách hàng</label>
                                                        <div>
                                                            <select className="form-control" value={form.retai_customer_id} onChange={event => this._onChangeField('retai_customer_id', event.target.value)} disabled>
                                                               {
                                                                    this.props.retailCustomers.listRoot.map((type, key) => {
                                                                        return (
                                                                            <option key={key} value={type.id}>{type.name}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-2">
                                                    <div className='form-group'>
                                                        <label className="control-label">Tuổi</label>
                                                        <div>
                                                            <select className="form-control" value={form.retai_customer_id} onChange={event => this._onChangeField('retai_customer_id', event.target.value)} disabled>
                                                               {
                                                                    this.props.retailCustomers.listRoot.map((type, key) => {
                                                                        return (
                                                                            <option key={key} value={type.id}>{type.years_old}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className={this.props.khachLeTraHangForm.errors.retai_customer_id ?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Điện thoại</label>
                                                        <div>
                                                            <select className="form-control" value={form.retai_customer_id} onChange={event => this._onChangeField('retai_customer_id', event.target.value)} disabled>
                                                               {
                                                                    this.props.retailCustomers.listRoot.map((type, key) => {
                                                                        return (
                                                                            <option key={key} value={type.id}>{type.phone_number}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="row">
                                                 <div className="col-md-4">
                                                    <div className={this.props.khachLeTraHangForm.errors.retai_customer_id ?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Địa chỉ</label>
                                                        <div>
                                                            <select className="form-control" value={form.retai_customer_id} onChange={event => this._onChangeField('retai_customer_id', event.target.value)} disabled>
                                                               {
                                                                    this.props.retailCustomers.listRoot.map((type, key) => {
                                                                        return (
                                                                            <option key={key} value={type.id}>{type.address}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-8">
                                                <label className="control-label">Diễn giải</label>
                                                    <div>
                                                        <input type='text' className='form-control' value={form.description} onChange={event => this._onChangeField('description', event.target.value)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                </div>
    			<ChildForm/>
    			<Payment/>
    		</div>
    	);
    }
}

const mapStateToProps = ({
        khachLeTraHangs,
        khachLeTraHangForm,
        inputOutputTypeForms,
        pharmacyWarehouses,
        retailCustomers
    }) => {
    return {
        khachLeTraHangs,
        khachLeTraHangForm,
        inputOutputTypeForms,
        pharmacyWarehouses,
        retailCustomers        
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...KhachLeTraHangListActions,
        ...KhachLeTraHangFormActions,
        inputTypeFormLoadList,
        pharmacyWarehouseLoadList,
        khachLeTraHangFormChange,
        changeListMedicine,
        formChildClear,
        retailCustomerLoadList
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ParentForm);

