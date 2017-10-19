const {Translate, I18n} = ReactReduxI18n;

import Datepicker from 'common/components/Datepicker';

import PrescriptionRetailPayment from 'modules/prescriptionRetail/childs/PrescriptionRetailPayment';
import PrescriptionRetailChildForm from 'modules/prescriptionRetail/childs/PrescriptionRetailChildForm';

import * as PrescriptionRetailListActions from 'modules/prescriptionRetail/actions/list';
import {formChange as prescriptionRetailFormChange} from 'modules/prescriptionRetail/actions/form'; // form change cua form cha
import {formClear as formChildClear} from 'modules/prescriptionRetail/actions/formChild'; // clear child form
import {changeList as changeListMedicine} from 'modules/medicine/actions/list'; // List medicine trong child form

import {loadOutputFormList as inputTypeFormLoadList} from 'modules/inputOutputTypeForm/actions/list'; // Hinh thuc nhap
import {loadList as pharmacyWarehouseLoadList} from 'modules/pharmacyWarehouse/actions/list'; // Danh sach nha thuoc
import {loadList as retailCustomerLoadList} from 'modules/retailCustomer/actions/list'; // Danh sach khach hang le


class PrescriptionRetailParentForm extends React.Component{
    constructor(){
        super();
    }
    
    componentDidMount(){
        this._loadAll();
    }
    
    _loadAll(){
        this.props.inputTypeFormLoadList();
        this.props.pharmacyWarehouseLoadList();
        this.props.retailCustomerLoadList();
    }

    _onValidationSubmit(){
        // todo
    }
    
    _onChangeField(field, value){
        this.props.prescriptionRetailFormChange(field, value);
        if(field === 'from_drug_store_id'){
            this.props.formChildClear();
            axios.get(`${Config.API_URL}pharmacy-warehouse/${value}/medicine`)
            .then(response => {
                const list = response.data.data;
                this.props.changeListMedicine(list);
                // kiem tra du lieu form con neu koi co thi clear form con
            });
        }
    }
    
    render(){
        const form = this.props.prescriptionRetailForm.values;
        const fromPharmacyWarehouses = Helper.GetListFilter(this.props.pharmacyWarehouses.listRoot, {is_main_pharmacies_warehouse: 0});
    	return (
    		<div>
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
                                                    <div className={this.props.prescriptionRetailForm.errors.code?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Hóa đơn</label>
                                                        <div>
                                                            <input type="text" className="form-control" ref="code"
                                                                value={form.code} onChange={event => this._onChangeField('code', event.target.value)}/>
                                                                <span className="help-block" style={{display: this.props.prescriptionRetailForm.errors.code ? 'block': 'none'}}>
                                                                    <Translate value={this.props.prescriptionRetailForm.errors.code}/>
                                                                </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.props.prescriptionRetailForm.errors.from_drug_store_id ?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Từ kho</label>
                                                        <div>
                                                            <select className="form-control" value={form.from_drug_store_id} onChange={event => this._onChangeField('from_drug_store_id', event.target.value)}>
                                                               {
                                                                    fromPharmacyWarehouses.map((type, key) => {
                                                                        return (
                                                                            <option key={key} value={type.id}>{type.name}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                            <span className="help-block" style={{display: this.props.prescriptionRetailForm.errors.from_drug_store_id ? 'block': 'none'}}>
                                                                <Translate value={this.props.prescriptionRetailForm.errors.from_drug_store_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.props.prescriptionRetailForm.errors.delivery_date?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Ngày xuất</label>
                                                        <div>
                                                            <Datepicker value={form.delivery_date} onChange={(value) => this._onChangeField('delivery_date', value)}/>
                                                            <span className="help-block" style={{display: this.props.prescriptionRetailForm.errors.delivery_date ? 'block': 'none'}}>
                                                                <Translate value={this.props.prescriptionRetailForm.errors.delivery_date}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className={this.props.prescriptionRetailForm.errors.input_output_form_type_id?'form-group has-error':'form-group'}>
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
                                                            <span className="help-block" style={{display: this.props.prescriptionRetailForm.errors.input_output_form_type_id ? 'block': 'none'}}>
                                                                <Translate value={this.props.prescriptionRetailForm.errors.input_output_form_type_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.props.prescriptionRetailForm.errors.retai_customer_id ?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Khách hàng</label>
                                                        <div>
                                                            <select className="form-control" value={form.retai_customer_id} onChange={event => this._onChangeField('retai_customer_id', event.target.value)}>
                                                               {
                                                                    this.props.retailCustomers.listRoot.map((type, key) => {
                                                                        return (
                                                                            <option key={key} value={type.id}>{type.name}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                            <span className="help-block" style={{display: this.props.prescriptionRetailForm.errors.retai_customer_id ? 'block': 'none'}}>
                                                                <Translate value={this.props.prescriptionRetailForm.errors.retai_customer_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className={this.props.prescriptionRetailForm.errors.retai_customer_id ?'form-group has-error':'form-group'}>
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
                                                            <span className="help-block" style={{display: this.props.prescriptionRetailForm.errors.retai_customer_id ? 'block': 'none'}}>
                                                                <Translate value={this.props.prescriptionRetailForm.errors.from_drug_store_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className={this.props.prescriptionRetailForm.errors.retai_customer_id ?'form-group has-error':'form-group'}>
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
                                                            <span className="help-block" style={{display: this.props.prescriptionRetailForm.errors.retai_customer_id ? 'block': 'none'}}>
                                                                <Translate value={this.props.prescriptionRetailForm.errors.from_drug_store_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.props.prescriptionRetailForm.errors.retai_customer_id ?'form-group has-error':'form-group'}>
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
                                                            <span className="help-block" style={{display: this.props.prescriptionRetailForm.errors.retai_customer_id ? 'block': 'none'}}>
                                                                <Translate value={this.props.prescriptionRetailForm.errors.from_drug_store_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="control-label">Diễn giải</label>
                                                        <div>
                                                            <input type="text" className="form-control" ref="name" value={form.description} onChange={event => this._onChangeField('description', event.target.value)}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                </div>
    			<PrescriptionRetailChildForm/>
    			<PrescriptionRetailPayment/>
    		</div>
    	);
    }
}

const mapStateToProps = ({
        prescriptionRetails,
        prescriptionRetailForm,
        inputOutputTypeForms,
        pharmacyWarehouses,
        retailCustomers
    }) => {
    return {
        prescriptionRetails,
        prescriptionRetailForm,
        inputOutputTypeForms,
        pharmacyWarehouses,
        retailCustomers
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...PrescriptionRetailListActions,
        inputTypeFormLoadList,
        pharmacyWarehouseLoadList,
        prescriptionRetailFormChange,
        changeListMedicine,
        formChildClear,
        retailCustomerLoadList
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PrescriptionRetailParentForm);

