const {Translate, I18n} = ReactReduxI18n;

import Datepicker from 'common/components/Datepicker';

import ProductInputPayment from 'modules/productInput/childs/ProductInputPayment';
import ProductInputChildForm from 'modules/productInput/childs/ProductInputChildForm';

import * as ProductInputListActions from 'modules/productInput/actions/list';
import {formChange as productInputFormChange} from 'modules/productInput/actions/form'; // form change cua form cha
import {formClear as formChildClear} from 'modules/productInput/actions/formChild'; // clear child form

import {loadInputFormList as inputTypeFormLoadList} from 'modules/inputOutputTypeForm/actions/list'; // Hinh thuc nhap
import {loadList as pharmacyWarehouseLoadList} from 'modules/pharmacyWarehouse/actions/list'; // Danh sach nha thuoc
import {loadList as customerLoadList} from 'modules/supplier/actions/list'; // Danh sach nha cung cap

class ProductInputParentForm extends React.Component{
    constructor(){
        super();
    }

    componentDidMount(){
        this._loadAll();
    }

    _loadAll(){
        this.props.inputTypeFormLoadList();
        this.props.pharmacyWarehouseLoadList();
        this.props.customerLoadList(); // load danh sach nha cung cap
    }

    _onValidationSubmit(){
        // todo
    }

    _onChangeField(field, value){
        this.props.productInputFormChange(field, value);
        switch(field){
            case 'supplier_id': {
                axios.get(`${Config.API_URL}product-input/supplier/${value}`)
                .then(response => {
                    const detail = response.data.data;
                    this.props.productInputFormChange('begin_liability_money', detail);
                });
                break;
            }
        }
    }

    render(){
        const form = this.props.productInputForm.values;
        const fromPharmacyWarehouses = Helper.GetListFilter(this.props.pharmacyWarehouses.listRoot, {is_main_pharmacies_warehouse: 1});
        const customers = Helper.GetListFilter(this.props.suppliers.listRoot, {is_customer: 0});
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
                                    <div className={this.props.productInputForm.errors.code?'form-group has-error':'form-group'}>
                                        <label className="control-label">Hóa đơn</label>
                                        <div>
                                            <input type="text" className="form-control" ref="code"
                                                value={form.code} onChange={event => this._onChangeField('code', event.target.value)}/>
                                                <span className="help-block" style={{display: this.props.productInputForm.errors.code ? 'block': 'none'}}>
                                                    <Translate value={this.props.productInputForm.errors.code}/>
                                                </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className={this.props.productInputForm.errors.input_output_form_type_id?'form-group has-error':'form-group'}>
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
                                            <span className="help-block" style={{display: this.props.productInputForm.errors.input_output_form_type_id ? 'block': 'none'}}>
                                                <Translate value={this.props.productInputForm.errors.input_output_form_type_id}/>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className={this.props.productInputForm.errors.pharmacy_warehouse_id ?'form-group has-error':'form-group'}>
                                        <label className="control-label">Kho tổng</label>
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
                                            <span className="help-block" style={{display: this.props.productInputForm.errors.pharmacy_warehouse_id ? 'block': 'none'}}>
                                                <Translate value={this.props.productInputForm.errors.pharmacy_warehouse_id}/>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className={this.props.productInputForm.errors.date_input?'form-group has-error':'form-group'}>
                                        <label className="control-label">Ngày nhập</label>
                                        <div>
                                            <Datepicker value={form.date_input} onChange={(value) => this._onChangeField('date_input', value)}/>
                                            <span className="help-block" style={{display: this.props.productInputForm.errors.date_input ? 'block': 'none'}}>
                                                <Translate value={this.props.productInputForm.errors.date_input}/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className={this.props.productInputForm.errors.supplier_id ?'form-group has-error':'form-group'}>
                                        <label className="control-label">Nhà cung cấp</label>
                                        <div>
                                            <select className="form-control" value={form.supplier_id} onChange={event => this._onChangeField('supplier_id', event.target.value)}>
                                                {
                                                    customers.map((type, key) => {
                                                        return (
                                                            <option key={key} value={type.id}>{type.name}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                            <span className="help-block" style={{display: this.props.productInputForm.errors.supplier_id ? 'block': 'none'}}>
                                                <Translate value={this.props.productInputForm.errors.supplier_id}/>
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
                        </div>
                    </div>
                </div>
    			<ProductInputChildForm/>
    			<ProductInputPayment/>
    		</div>
    	);
    }
}

const mapStateToProps = ({
        productInputs,
        productInputForm,
        inputOutputTypeForms,
        pharmacyWarehouses,
        suppliers
    }) => {
    return {
        productInputs,
        productInputForm,
        inputOutputTypeForms,
        pharmacyWarehouses,
        suppliers
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...ProductInputListActions,
        inputTypeFormLoadList,
        pharmacyWarehouseLoadList,
        productInputFormChange,
        formChildClear,
        customerLoadList
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ProductInputParentForm);

