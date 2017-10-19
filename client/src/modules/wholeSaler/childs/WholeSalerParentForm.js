const {Translate, I18n} = ReactReduxI18n;

import Datepicker from 'common/components/Datepicker';
import WholeSalerChildForm from 'modules/wholeSaler/childs/WholeSalerChildForm';
import WholeSalerPayment from 'modules/wholeSaler/childs/WholeSalerPayment';

import * as wholeSalerListActions from 'modules/wholeSaler/actions/list';
import {formChange as wholeSalerFormChange} from 'modules/wholeSaler/actions/form'; // form change cua form cha
import {formClear as formChildClear} from 'modules/wholeSaler/actions/formChild'; // clear child form
import {changeList as changeListMedicine} from 'modules/medicine/actions/list'; // List medicine trong child form

import {loadOutputFormList as inputTypeFormLoadList} from 'modules/inputOutputTypeForm/actions/list'; // Hinh thuc nhap
import {loadList as pharmacyWarehouseLoadList} from 'modules/pharmacyWarehouse/actions/list'; // Danh sach nha thuoc
import {loadList as customerLoadList} from 'modules/supplier/actions/list'; // Danh sach khach hang// supplier type = 0
//import {paymentTypeList as paymentList} from 'modules/paymentType/actions/list';

class WholeSalerParentForm extends React.Component {
    constructor(){
        super();
    }

    componentDidMount(){
        this._loadAll();
    }

    _loadAll(){
        this.props.inputTypeFormLoadList();
        this.props.pharmacyWarehouseLoadList();
        this.props.customerLoadList(); // load danh sach khach hang
        //this.props.paymentList();
    }

    _onValidationSubmit(){
        // todo
    }

    _onChangeField(field, value){
        this.props.wholeSalerFormChange(field, value);
        switch(field){
            case 'from_drug_store_id':{
                this.props.formChildClear();
                axios.get(`${Config.API_URL}pharmacy-warehouse/${value}/medicine`)
                .then(response => {
                    const list = response.data.data;
                    this.props.changeListMedicine(list);
                    // kiem tra du lieu form con neu koi co thi clear form con
                });
                break;
            }
            case 'customer_id': {
                axios.get(`${Config.API_URL}whole-saler/supplier/${value}`)
                .then(response => {
                    const detail = response.data.data;
                    this.props.wholeSalerFormChange('begin_liability_money', detail);
                });
                break;
            }
        }
    }

    render() {
        const form = this.props.wholeSalerForm.values;
        const fromPharmacyWarehouses = Helper.GetListFilter(this.props.pharmacyWarehouses.listRoot, {is_main_pharmacies_warehouse: 0});
        const customers = Helper.GetListFilter(this.props.suppliers.listRoot, {is_customer: 1});

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
                                                    <div className={this.props.wholeSalerForm.errors.code?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Hóa đơn</label>
                                                            <input type="text" className="form-control" ref="code"
                                                                value={form.code} onChange={event => this._onChangeField('code', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.wholeSalerForm.errors.code ? 'block': 'none'}}>
                                                                <Translate value={this.props.wholeSalerForm.errors.code}/>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.props.wholeSalerForm.errors.from_drug_store_id ?'form-group has-error':'form-group'}>
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
                                                            <span className="help-block" style={{display: this.props.wholeSalerForm.errors.from_drug_store_id ? 'block': 'none'}}>
                                                                <Translate value={this.props.wholeSalerForm.errors.from_drug_store_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.props.wholeSalerForm.errors.delivery_date?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Ngày xuất</label>
                                                        <div>
                                                            <Datepicker value={form.delivery_date} onChange={(value) => this._onChangeField('delivery_date', value)}/>
                                                            <span className="help-block" style={{display: this.props.wholeSalerForm.errors.delivery_date ? 'block': 'none'}}>
                                                                <Translate value={this.props.wholeSalerForm.errors.delivery_date}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className={this.props.wholeSalerForm.errors.input_output_form_type_id?'form-group has-error':'form-group'}>
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
                                                            <span className="help-block" style={{display: this.props.wholeSalerForm.errors.input_output_form_type_id ? 'block': 'none'}}>
                                                                <Translate value={this.props.wholeSalerForm.errors.input_output_form_type_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.props.wholeSalerForm.errors.customer_id ?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Khách hàng</label>
                                                        <div>
                                                            <select className="form-control" value={form.customer_id} onChange={event => this._onChangeField('customer_id', event.target.value)}>
                                                                {
                                                                    customers.map((type, key) => {
                                                                        return (
                                                                            <option key={key} value={type.id}>{type.name}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                            <span className="help-block" style={{display: this.props.wholeSalerForm.errors.customer_id ? 'block': 'none'}}>
                                                                <Translate value={this.props.wholeSalerForm.errors.customer_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="control-label">Công nợ</label>
                                                        <div>
                                                            <input type="text" className="form-control text-right" ref="name" value={Numeral(form.begin_liability_money).format('0,0')} onChange={event => this._onChangeField('begin_liability_money', event.target.value)} readOnly/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
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
                <WholeSalerChildForm/>
                <WholeSalerPayment/>
            </div>
        );
    };
};

const mapStateToProps = ({
        wholeSaleres,
        wholeSalerForm,
        inputOutputTypeForms,
        pharmacyWarehouses,
        suppliers
    }) => {
    return {
        wholeSaleres,
        wholeSalerForm,
        inputOutputTypeForms,
        pharmacyWarehouses,
        suppliers
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...wholeSalerListActions,
        inputTypeFormLoadList,
        pharmacyWarehouseLoadList,
        wholeSalerFormChange,
        changeListMedicine,
        formChildClear,
        customerLoadList,
        //paymentList
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(WholeSalerParentForm);