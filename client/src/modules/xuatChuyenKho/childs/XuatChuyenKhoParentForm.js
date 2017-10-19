const {Translate, I18n} = ReactReduxI18n;

import Datepicker from 'common/components/Datepicker';
import XuatChuyenKhoChildForm from 'modules/xuatChuyenKho/childs/XuatChuyenKhoChildForm';
import XuatChuyenKhoPayment from 'modules/xuatChuyenKho/childs/XuatChuyenKhoPayment';

import * as XuatChuyenKhoListActions from 'modules/xuatChuyenKho/actions/list';
import {formChange as xuatChuyenKhoFormChange} from 'modules/xuatChuyenKho/actions/form'; // form change cua form cha
import {formClear as formChildClear} from 'modules/xuatChuyenKho/actions/formChild'; // clear child form
import {changeList as changeListMedicine} from 'modules/medicine/actions/list'; // List medicine trong child form
import {changeList as changeListToPharmacyWarehouses} from 'modules/pharmacyWarehouse/actions/list';

import {loadOutputFormList as inputTypeFormLoadList} from 'modules/inputOutputTypeForm/actions/list'; // Hinh thuc nhap
import {loadList as pharmacyWarehouseLoadList} from 'modules/pharmacyWarehouse/actions/list'; // Danh sach nha thuoc

class XuatChuyenKhoParentForm extends React.Component {
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
        this.props.xuatChuyenKhoFormChange(field, value);
        if (field === 'from_drug_store_id') {
            this.props.formChildClear();
            axios.get(`${Config.API_URL}pharmacy-warehouse/${value}/medicine`)
                    .then(response => {
                        const list = response.data.data;
                        this.props.changeListMedicine(list);
                        // kiem tra du lieu form con neu koi co thi clear form con
                    });

            // update list nha thuoc chuyen kho
            setTimeout(() => {
                axios.get(`${Config.API_URL}pharmacy-warehouse/${value}/fetchList`)
                        .then(response => {
                            var list = response.data.data;
                            const arr = {
                                name: '',
                                id: '-1'
                            };
                            list.unshift(arr);
                            this.props.changeListToPharmacyWarehouses(list);
                        });
            }, 0);
        }
    }

    render() {
        const form = this.props.xuatChuyenKhoForm.values;
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
                                <div className="form-body">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className={this.props.xuatChuyenKhoForm.errors.code ? 'form-group has-error' : 'form-group'}>
                                                <label className="control-label">Hóa đơn</label>
                                                <div>
                                                    <input type="text" className="form-control" ref="code"
                                                           value={form.code} onChange={event => this._onChangeField('code', event.target.value)}/>
                                                    <span className="help-block" style={{display: this.props.xuatChuyenKhoForm.errors.code ? 'block' : 'none'}}>
                                                        <Translate value={this.props.xuatChuyenKhoForm.errors.code}/>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className={this.props.xuatChuyenKhoForm.errors.delivery_date ? 'form-group has-error' : 'form-group'}>
                                                <label className="control-label">Ngày xuất</label>
                                                <div>
                                                    <Datepicker value={form.delivery_date} onChange={(value) => this._onChangeField('delivery_date', value)}/>
                                                    <span className="help-block" style={{display: this.props.xuatChuyenKhoForm.errors.delivery_date ? 'block' : 'none'}}>
                                                        <Translate value={this.props.xuatChuyenKhoForm.errors.delivery_date}/>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className={this.props.xuatChuyenKhoForm.errors.input_output_form_type_id ? 'form-group has-error' : 'form-group'}>
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
                                                    <span className="help-block" style={{display: this.props.xuatChuyenKhoForm.errors.input_output_form_type_id ? 'block' : 'none'}}>
                                                        <Translate value={this.props.xuatChuyenKhoForm.errors.input_output_form_type_id}/>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className={this.props.xuatChuyenKhoForm.errors.from_drug_store_id ? 'form-group has-error' : 'form-group'}>
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
                                                    <span className="help-block" style={{display: this.props.xuatChuyenKhoForm.errors.from_drug_store_id ? 'block' : 'none'}}>
                                                        <Translate value={this.props.xuatChuyenKhoForm.errors.from_drug_store_id}/>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className={this.props.xuatChuyenKhoForm.errors.to_drug_store_id ? 'form-group has-error' : 'form-group'}>
                                                <label className="control-label">Đến kho</label>
                                                <div>
                                                    <select className="form-control" value={form.to_drug_store_id} onChange={event => this._onChangeField('to_drug_store_id', event.target.value)}>
                                                        {
                                                                                    this.props.pharmacyWarehouses.list.map((type, key) => {
                                                                                        return (
                                                                <option key={key} value={type.id}>{type.name}</option>
                                                                                                );
                                                        })
                                                        }
                                                    </select>
                                                    <span className="help-block" style={{display: this.props.xuatChuyenKhoForm.errors.to_drug_store_id ? 'block' : 'none'}}>
                                                        <Translate value={this.props.xuatChuyenKhoForm.errors.to_drug_store_id}/>
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
                    <XuatChuyenKhoChildForm/>
                    <XuatChuyenKhoPayment/>
                </div>
                                                );
                        }
                        ;
                    }
                    ;

                    const mapStateToProps = ({
                    xuatChuyenKhos,
                            xuatChuyenKhoForm,
                            inputOutputTypeForms,
                            pharmacyWarehouses
                    }) => {
                        return {
                            xuatChuyenKhos,
                            xuatChuyenKhoForm,
                            inputOutputTypeForms,
                            pharmacyWarehouses
                        };
                    };

                    const mapDispatchToProps = (dispatch) => {
                        return Redux.bindActionCreators({
                            ...ReactRouterRedux.routerActions,
                            ...XuatChuyenKhoListActions,
                            inputTypeFormLoadList,
                            pharmacyWarehouseLoadList,
                            xuatChuyenKhoFormChange,
                            changeListMedicine,
                            changeListToPharmacyWarehouses,
                            formChildClear
                        }, dispatch);
                    };

                    module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(XuatChuyenKhoParentForm);