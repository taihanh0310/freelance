const {Translate, I18n} = ReactReduxI18n;

import Datepicker from 'common/components/Datepicker';

import XuatHuyHangPayment from 'modules/xuatHuyHang/childs/XuatHuyHangPayment';
import XuatHuyHangChildForm from 'modules/xuatHuyHang/childs/XuatHuyHangChildForm';

import * as XuatHuyHangListActions from 'modules/xuatHuyHang/actions/list';
import {formChange as xuatHuyHangFormChange} from 'modules/xuatHuyHang/actions/form'; // form change cua form cha
import {formClear as formChildClear} from 'modules/xuatHuyHang/actions/formChild'; // clear child form
import {changeList as changeListMedicine} from 'modules/medicine/actions/list'; // List medicine trong child form

import {loadOutputFormList as inputTypeFormLoadList} from 'modules/inputOutputTypeForm/actions/list'; // Hinh thuc nhap
import {loadList as pharmacyWarehouseLoadList} from 'modules/pharmacyWarehouse/actions/list'; // Danh sach nha thuoc

class XuatHuyHangParentForm extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this._loadAll();
    }

    _loadAll() {
        this.props.inputTypeFormLoadList();
        this.props.pharmacyWarehouseLoadList();
    }

    _onValidationSubmit() {
        // todo
    }

    _onChangeField(field, value) {
        this.props.xuatHuyHangFormChange(field, value);
        if (field === 'from_drug_store_id') {
            this.props.formChildClear();
            axios.get(`${Config.API_URL}pharmacy-warehouse/${value}/medicine`)
                    .then(response => {
                        const list = response.data.data;
                        this.props.changeListMedicine(list);
                        // kiem tra du lieu form con neu koi co thi clear form con
                    });
        }
    }

    render() {
        const form = this.props.xuatHuyHangForm.values;
        const fromPharmacyWarehouses = this.props.pharmacyWarehouses.listRoot;
        return (
                <div>
                    <div className="portlet box green" id="parent_form_control">
                        <div className="portlet-title">
                            <div className="caption">
                                <Translate value="application.text.formTitle"/>
                            </div>
                        </div>
                        <div className="portlet-body form">
                            <div className="form-horizontal">
                                <div className="form-body">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className={this.props.xuatHuyHangForm.errors.code ? 'form-group has-error' : 'form-group'}>
                                                <label className="control-label col-md-4">Hóa đơn</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" ref="code"
                                                           value={form.code} onChange={event => this._onChangeField('code', event.target.value)}/>
                                                    <span className="help-block" style={{display: this.props.xuatHuyHangForm.errors.code ? 'block' : 'none'}}>
                                                        <Translate value={this.props.xuatHuyHangForm.errors.code}/>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className={this.props.xuatHuyHangForm.errors.from_drug_store_id ? 'form-group has-error' : 'form-group'}>
                                                <label className="control-label col-md-4">Từ kho</label>
                                                <div className="col-md-8">
                                                    <select className="form-control" value={form.from_drug_store_id} onChange={event => this._onChangeField('from_drug_store_id', event.target.value)}>
                                                        {
                                                                fromPharmacyWarehouses.map((type, key) => {
                                                                    return (
                                            <option key={key} value={type.id}>{type.name}</option>
                                                                            );
                                                        })
                                                        }
                                                    </select>
                                                    <span className="help-block" style={{display: this.props.xuatHuyHangForm.errors.from_drug_store_id ? 'block' : 'none'}}>
                                                        <Translate value={this.props.xuatHuyHangForm.errors.from_drug_store_id}/>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className={this.props.xuatHuyHangForm.errors.delivery_date ? 'form-group has-error' : 'form-group'}>
                                                <label className="control-label col-md-4">Ngày xuất</label>
                                                <div className="col-md-8">
                                                    <Datepicker value={form.delivery_date} onChange={(value) => this._onChangeField('delivery_date', value)}/>
                                                    <span className="help-block" style={{display: this.props.xuatHuyHangForm.errors.delivery_date ? 'block' : 'none'}}>
                                                        <Translate value={this.props.xuatHuyHangForm.errors.delivery_date}/>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className={this.props.xuatHuyHangForm.errors.input_output_form_type_id ? 'form-group has-error' : 'form-group'}>
                                                <label className="control-label col-md-4">Hình thức xuất</label>
                                                <div className="col-md-8">
                                                    <select className="form-control" value={form.input_output_form_type_id} onChange={event => this._onChangeField('input_output_form_type_id', event.target.value)}>
                                                        {
                                                                            this.props.inputOutputTypeForms.listRoot.map((type, key) => {
                                                                                return (
                                                        <option key={key} value={type.id}>{type.name}</option>
                                                                                        );
                                                        })
                                                        }
                                                    </select>
                                                    <span className="help-block" style={{display: this.props.xuatHuyHangForm.errors.input_output_form_type_id ? 'block' : 'none'}}>
                                                        <Translate value={this.props.xuatHuyHangForm.errors.input_output_form_type_id}/>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label className="control-label col-md-2">Diễn giải</label>
                                                <div className="col-md-10">
                                                    <input type="text" className="form-control" ref="name" value={form.description} onChange={event => this._onChangeField('description', event.target.value)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <XuatHuyHangChildForm/>
                    <XuatHuyHangPayment/>
                </div>
                                        );
                    }
                }

                const mapStateToProps = ({
                xuatHuyHangs,
                        xuatHuyHangForm,
                        inputOutputTypeForms,
                        pharmacyWarehouses,
                        retailCustomers
                }) => {
                    return {
                        xuatHuyHangs,
                        xuatHuyHangForm,
                        inputOutputTypeForms,
                        pharmacyWarehouses,
                        retailCustomers
                    };
                };

                const mapDispatchToProps = (dispatch) => {
                    return Redux.bindActionCreators({
                        ...ReactRouterRedux.routerActions,
                        ...XuatHuyHangListActions,
                        inputTypeFormLoadList,
                        pharmacyWarehouseLoadList,
                        xuatHuyHangFormChange,
                        changeListMedicine,
                        formChildClear
                    }, dispatch);
                };

                module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(XuatHuyHangParentForm);

