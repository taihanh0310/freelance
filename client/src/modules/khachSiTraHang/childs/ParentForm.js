const {Translate, I18n} = ReactReduxI18n;

import Datepicker from 'common/components/Datepicker';

import Payment from 'modules/khachSiTraHang/childs/Payment';
import ChildForm from 'modules/khachSiTraHang/childs/ChildForm';
import SearchBill from 'modules/khachSiTraHang/childs/SearchBill';
import SearchBillResult from 'modules/khachSiTraHang/childs/SearchBillResult';

import * as KhachSiTraHangListActions from 'modules/khachSiTraHang/actions/list';
import * as KhachSiTraHangFormActions from 'modules/khachSiTraHang/actions/form';
import {formChange as khachSiTraHangFormChange} from 'modules/khachSiTraHang/actions/form'; // form change cua form cha
import {formClear as formChildClear} from 'modules/khachSiTraHang/actions/formChild'; // clear child form
import {changeList as changeListMedicine} from 'modules/medicine/actions/list'; // List medicine trong child form

import {loadInputFormList as inputTypeFormLoadList} from 'modules/inputOutputTypeForm/actions/list'; // Hinh thuc nhap
import {loadChildPharmacyWareHouse as pharmacyWarehouseLoadList} from 'modules/pharmacyWarehouse/actions/list'; // Danh sach nha thuoc
import {loadCustomerList as customerLoadList} from 'modules/supplier/actions/list'; // Danh sach nha cung cap

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
         this.props.customerLoadList() // load danh sach nha cung cap
    }
    
    _onChangeField(field, value){
            this.props.khachSiTraHangFormChange(field, value);
            let error = '';
            switch(field){
                case 'khach_si_tra_hang_code':
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
                    else if(Check.soSanhHaiNgay(this.props.khachSiTraHangForm.values.delivery_date,value) == 1)
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
//            this.props.formValidation(field, error);
        }

    _onValidationSubmit(){
        // todo
    }
        
    render(){
        const form = this.props.khachSiTraHangForm.values;
        const fromPharmacyWarehouses = Helper.GetListFilter(this.props.pharmacyWarehouses.listRoot, {is_main_pharmacies_warehouse: 0});
    	return (
    		<div>
                        <SearchBill/>
                        <SearchBillResult/>
    			<div className="portlet box green" id="parent_form_control">
                                <div className="portlet-title">
                                        <div className="caption">
                                                Thông tin hóa đơn khách sỉ trả hàng
                                        </div>
                                </div>
                                <div className="portlet-body form">
                                        <div className="form-body">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className={this.props.khachSiTraHangForm.errors.khach_si_tra_hang_code?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Hóa đơn khách sỉ trả hàng</label>
                                                        <div>
                                                            <input type="text" className="form-control" ref="code"
                                                                value={form.khach_si_tra_hang_code} onChange={event => this._onChangeField('khach_si_tra_hang_code', event.target.value)}/>
                                                                <span className="help-block" style={{display: this.props.khachSiTraHangForm.errors.khach_si_tra_hang_code ? 'block': 'none'}}>
                                                                    <Translate value={this.props.khachSiTraHangForm.errors.khach_si_tra_hang_code}/>
                                                                </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-4">
                                                    <div className={this.props.khachSiTraHangForm.errors.input_output_form_type_id?'form-group has-error':'form-group'}>
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
                                                            <span className="help-block" style={{display: this.props.khachSiTraHangForm.errors.input_output_form_type_id ? 'block': 'none'}}>
                                                                <Translate value={this.props.khachSiTraHangForm.errors.input_output_form_type_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className={this.props.khachSiTraHangForm.errors.from_drug_store_id ?'form-group has-error':'form-group'}>
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
                                                            <span className="help-block" style={{display: this.props.khachSiTraHangForm.errors.from_drug_store_id ? 'block': 'none'}}>
                                                                <Translate value={this.props.khachSiTraHangForm.errors.from_drug_store_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                                                                
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className={this.props.khachSiTraHangForm.errors.return_date?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Ngày nhập</label>
                                                        <div>
                                                            <Datepicker value={form.return_date} onChange={(value) => this._onChangeField('return_date', value)}/>
                                                            <span className="help-block" style={{display: this.props.khachSiTraHangForm.errors.return_date ? 'block': 'none'}}>
                                                                <Translate value={this.props.khachSiTraHangForm.errors.return_date}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.props.khachSiTraHangForm.errors.customer_id ?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Khách hàng</label>
                                                        <div>
                                                            <select className="form-control" value={form.customer_id} onChange={event => this._onChangeField('customer_id', event.target.value)} disabled>
                                                                {
                                                                    this.props.suppliers.list.map((type, key) => {
                                                                        return (
                                                                            <option key={key} value={type.id}>{type.name}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="control-label">Công nợ</label>
                                                        <div>
                                                            <input type="text" className="form-control text-right" ref="name" value={Numeral(form.begin_liability_money).format('0,0')} readOnly/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col-md-12">
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
        khachSiTraHangs,
        khachSiTraHangForm,
        inputOutputTypeForms,
        pharmacyWarehouses,
        suppliers
    }) => {
    return {
        khachSiTraHangs,
        khachSiTraHangForm,
        inputOutputTypeForms,
        pharmacyWarehouses,
        suppliers        
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...KhachSiTraHangListActions,
        ...KhachSiTraHangFormActions,
        inputTypeFormLoadList,
        pharmacyWarehouseLoadList,
        khachSiTraHangFormChange,
        changeListMedicine,
        formChildClear,
        customerLoadList
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ParentForm);

