const {Translate, I18n} = ReactReduxI18n;

import Datepicker from 'common/components/Datepicker';

import Payment from 'modules/xuatTraHangNCC/childs/Payment';
import ChildForm from 'modules/xuatTraHangNCC/childs/ChildForm';
import SearchBill from 'modules/xuatTraHangNCC/childs/SearchBill';
import SearchBillResult from 'modules/xuatTraHangNCC/childs/SearchBillResult';

import * as XuatTraHangNCCListActions from 'modules/xuatTraHangNCC/actions/list';
import * as XuatTraHangNCCFormActions from 'modules/xuatTraHangNCC/actions/form';
import {formChange as xuatTraHangNCCFormChange} from 'modules/xuatTraHangNCC/actions/form'; // form change cua form cha
import {formClear as formChildClear} from 'modules/xuatTraHangNCC/actions/formChild'; // clear child form
import {changeList as changeListMedicine} from 'modules/medicine/actions/list'; // List medicine trong child form

import {loadOutputFormList as inputTypeFormLoadList} from 'modules/inputOutputTypeForm/actions/list'; // Hinh thuc nhap
import {loadOnlyMainPharmacyWareHouse as pharmacyWarehouseLoadList} from 'modules/pharmacyWarehouse/actions/list'; // Danh sach nha thuoc
import {loadSupplierList as customerLoadList} from 'modules/supplier/actions/list'; // Danh sach nha cung cap

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
            this.props.xuatTraHangNCCFormChange(field, value);
            let error = '';
            switch(field){
                case 'xuat_tra_hang_ncc_code':
                {
                    if(Check.CheckEmpty(value))
                        error = 'application.validation.required';
                    else
                        error = '';
                    break;
                }
                case 'delivery_date':{
                    if(Check.CheckEmpty(value))
                        error = 'application.validation.required';
                    else if(Check.soSanhHaiNgay(this.props.xuatTraHangNCCForm.values.date_input,value) == 1)
                        error = 'Ngày trả hàng phải lớn hơn hoặc bằng ngày nhập hàng';
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
        const form = this.props.xuatTraHangNCCForm.values;
        const fromPharmacyWarehouses = Helper.GetListFilter(this.props.pharmacyWarehouses.listRoot, {is_main_pharmacies_warehouse: 1});
    	return (
    		<div>
                        <SearchBill/>
                        <SearchBillResult/>
    			<div className="portlet box green" id="parent_form_control">
                                <div className="portlet-title">
                                        <div className="caption">
                                                <Translate value="application.text.formTitle"/>
                                        </div>
                                </div>
                                <div className="portlet-body form">
                                        <div className="form-body">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className={this.props.xuatTraHangNCCForm.errors.xuat_tra_hang_ncc_code?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Hóa đơn</label>
                                                        <div>
                                                            <input type="text" className="form-control" ref="code"
                                                                value={form.xuat_tra_hang_ncc_code} onChange={event => this._onChangeField('xuat_tra_hang_ncc_code', event.target.value)}/>
                                                                <span className="help-block" style={{display: this.props.xuatTraHangNCCForm.errors.xuat_tra_hang_ncc_code ? 'block': 'none'}}>
                                                                    <Translate value={this.props.xuatTraHangNCCForm.errors.xuat_tra_hang_ncc_code}/>
                                                                </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-4">
                                                    <div className={this.props.xuatTraHangNCCForm.errors.input_output_form_type_id?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Hình thức xuất</label>
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
                                                            <span className="help-block" style={{display: this.props.xuatTraHangNCCForm.errors.input_output_form_type_id ? 'block': 'none'}}>
                                                                <Translate value={this.props.xuatTraHangNCCForm.errors.input_output_form_type_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className={this.props.xuatTraHangNCCForm.errors.pharmacy_warehouse_id ?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Kho xuất</label>
                                                        <div>
                                                            <select className="form-control" value={form.pharmacy_warehouse_id} onChange={event => this._onChangeField('pharmacy_warehouse_id', event.target.value)} disabled>
                                                               {
                                                                    fromPharmacyWarehouses.map((type, key) => {
                                                                        return (
                                                                            <option key={key} value={type.id}>{type.name}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                            <span className="help-block" style={{display: this.props.xuatTraHangNCCForm.errors.pharmacy_warehouse_id ? 'block': 'none'}}>
                                                                <Translate value={this.props.xuatTraHangNCCForm.errors.pharmacy_warehouse_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                                                                
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className={this.props.xuatTraHangNCCForm.errors.delivery_date?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Ngày xuất</label>
                                                        <div>
                                                            <Datepicker value={form.delivery_date} onChange={(value) => this._onChangeField('delivery_date', value)}/>
                                                            <span className="help-block" style={{display: this.props.xuatTraHangNCCForm.errors.delivery_date ? 'block': 'none'}}>
                                                                <Translate value={this.props.xuatTraHangNCCForm.errors.delivery_date}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.props.xuatTraHangNCCForm.errors.supplier_id ?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Nhà cung cấp</label>
                                                        <div>
                                                            <select className="form-control" value={form.supplier_id} onChange={event => this._onChangeField('supplier_id', event.target.value)} disabled>
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
        xuatTraHangNCCs,
        xuatTraHangNCCForm,
        inputOutputTypeForms,
        pharmacyWarehouses,
        suppliers
    }) => {
    return {
        xuatTraHangNCCs,
        xuatTraHangNCCForm,
        inputOutputTypeForms,
        pharmacyWarehouses,
        suppliers        
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...XuatTraHangNCCListActions,
        ...XuatTraHangNCCFormActions,
        inputTypeFormLoadList,
        pharmacyWarehouseLoadList,
        xuatTraHangNCCFormChange,
        changeListMedicine,
        formChildClear,
        customerLoadList
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ParentForm);

