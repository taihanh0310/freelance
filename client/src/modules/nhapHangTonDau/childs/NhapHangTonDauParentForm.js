const {Translate, I18n} = ReactReduxI18n;

import Datepicker from 'common/components/Datepicker';

import NhapHangTonDauPayment from 'modules/nhapHangTonDau/childs/NhapHangTonDauPayment';
import NhapHangTonDauChildForm from 'modules/nhapHangTonDau/childs/NhapHangTonDauChildForm';

import * as NhapHangTonDauListActions from 'modules/nhapHangTonDau/actions/list';
import {formChange as nhapHangTonDauFormChange} from 'modules/nhapHangTonDau/actions/form'; // form change cua form cha
import {formClear as formChildClear} from 'modules/nhapHangTonDau/actions/formChild'; // clear child form

import {loadInputFormList as inputTypeFormLoadList} from 'modules/inputOutputTypeForm/actions/list'; // Hinh thuc nhap
import {loadList as pharmacyWarehouseLoadList} from 'modules/pharmacyWarehouse/actions/list'; // Danh sach nha thuoc


class NhapHangTonDauParentForm extends React.Component{
    constructor(){
        super();
    }
    
    componentDidMount(){
        this._loadAll();
    }
    
    _loadAll(){
        this.props.inputTypeFormLoadList();
        this.props.pharmacyWarehouseLoadList();
    }

    _onValidationSubmit(){
        // todo
    }
    
    _onChangeField(field, value){
        this.props.nhapHangTonDauFormChange(field, value);
    }
    
    render(){
        const form = this.props.nhapHangTonDauForm.values;
        const fromPharmacyWarehouses = Helper.GetListFilter(this.props.pharmacyWarehouses.listRoot, {is_main_pharmacies_warehouse: 1});
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
                                                <div className="col-md-3">
                                                    <div className={this.props.nhapHangTonDauForm.errors.date_input?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Ngày nhập</label>
                                                        <div>
                                                            <Datepicker value={form.date_input} onChange={(value) => this._onChangeField('date_input', value)}/>
                                                            <span className="help-block" style={{display: this.props.nhapHangTonDauForm.errors.date_input ? 'block': 'none'}}>
                                                                <Translate value={this.props.nhapHangTonDauForm.errors.date_input}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className={this.props.nhapHangTonDauForm.errors.code?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Hóa đơn</label>
                                                        <div>
                                                            <input type="text" className="form-control" ref="code"
                                                                value={form.code} onChange={event => this._onChangeField('code', event.target.value)}/>
                                                                <span className="help-block" style={{display: this.props.nhapHangTonDauForm.errors.code ? 'block': 'none'}}>
                                                                    <Translate value={this.props.nhapHangTonDauForm.errors.code}/>
                                                                </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-3">
                                                    <div className={this.props.nhapHangTonDauForm.errors.input_output_form_type_id?'form-group has-error':'form-group'}>
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
                                                            <span className="help-block" style={{display: this.props.nhapHangTonDauForm.errors.input_output_form_type_id ? 'block': 'none'}}>
                                                                <Translate value={this.props.nhapHangTonDauForm.errors.input_output_form_type_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className={this.props.nhapHangTonDauForm.errors.pharmacy_warehouse_id ?'form-group has-error':'form-group'}>
                                                        <label className="control-label">Kho hàng</label>
                                                        <div>
                                                            <select className="form-control" value={form.pharmacy_warehouse_id} onChange={event => this._onChangeField('pharmacy_warehouse_id', event.target.value)}>
                                                               {
                                                                    fromPharmacyWarehouses.map((type, key) => {
                                                                        return (
                                                                            <option key={key} value={type.id}>{type.name}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                            <span className="help-block" style={{display: this.props.nhapHangTonDauForm.errors.pharmacy_warehouse_id ? 'block': 'none'}}>
                                                                <Translate value={this.props.nhapHangTonDauForm.errors.pharmacy_warehouse_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                                                                
                                            </div>
                                        </div>
                                </div>
                </div>
    			<NhapHangTonDauChildForm/>
    			<NhapHangTonDauPayment/>
    		</div>
    	);
    }
}

const mapStateToProps = ({
        nhapHangTonDaus,
        nhapHangTonDauForm,
        inputOutputTypeForms,
        pharmacyWarehouses
    }) => {
    return {
        nhapHangTonDaus,
        nhapHangTonDauForm,
        inputOutputTypeForms,
        pharmacyWarehouses
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...NhapHangTonDauListActions,
        inputTypeFormLoadList,
        pharmacyWarehouseLoadList,
        nhapHangTonDauFormChange,
        formChildClear
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(NhapHangTonDauParentForm);

