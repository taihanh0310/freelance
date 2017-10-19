const {Translate, I18n} = ReactReduxI18n;
import Datepicker from 'common/components/Datepicker';
import * as BaoCaoNhapHangListActions from 'modules/baoCao/baoCaoNhapHang/actions/list';
import {loadWareHouseKepperList as loadWareHouseKepperList} from 'modules/user/actions/list';
import {loadInputFormList as inputTypeFormLoadList} from 'modules/inputOutputTypeForm/actions/list'; // Hinh thuc nhap
import {loadList as pharmacyWarehouseLoadList} from 'modules/pharmacyWarehouse/actions/list'; // Danh sach nha thuoc
import {loadList as customerLoadList} from 'modules/supplier/actions/list'; // Danh sach nha cung cap
import {loadList as medicineGroupLoadList} from 'modules/medicineGroup/actions/list'; // Danh sach nha thuoc

class SearchConditions extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this._loadAll();
        setTimeout(() => {
            this._onSearchBill();
        }, Config.TIMEOUT500);
    }
    
    componentWillUnmount(){
        this.props.clearList();// Clear search list
    }

    _loadAll() {
        this.props.inputTypeFormLoadList(); // hinh thuc nhap
        this.props.pharmacyWarehouseLoadList(); // nha thuoc
        this.props.customerLoadList(); // load danh sach user
        this.props.loadWareHouseKepperList(); // user
        this.props.medicineGroupLoadList();
    }

    _onSearchBill() {
        Helper.PageBlock(I18n.t('application.text.loading'));
        let values = $.extend({}, this.props.baoCaoNhapHangs.search);
        this.props.searchByCondition(values);
    }

    _onSearch(field, value) {
        this.props.changeSearchList(field, value);
    }

    render() {
        const fromPharmacyWarehouses = Helper.GetListFilter(this.props.pharmacyWarehouses.listRoot, {is_main_pharmacies_warehouse: 1});
        const customers = Helper.GetListFilter(this.props.suppliers.listRoot, {is_customer: 0});
        return (
                <div className="portlet box green">
                    <div className="portlet-title">
                        <div className="caption">Thông tin tìm kiếm</div>
                    </div>
                    <div className="portlet-body">
                        <div className="form-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">Từ ngày - đến ngày</label>
                                        <div className="input-group date-picker input-daterange">
                                            <Datepicker value={this.props.baoCaoNhapHangs.search.date_from} onChange={(value) => this._onSearch('date_from', value)}/>
                                            <span className="input-group-addon">
                                                <i className="fa fa-forward"></i>
                                            </span>
                                            <Datepicker value={this.props.baoCaoNhapHangs.search.date_to} onChange={(value) => this._onSearch('date_to', value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">Kho hàng</label>
                                        <select className="form-control" value={this.props.baoCaoNhapHangs.search.from_drug_store_id} onChange={event => this._onSearch('from_drug_store_id', event.target.value)}>
                                        <option value="-1">Tất cả các kho</option>
                                        {
                                            fromPharmacyWarehouses.map((type, key) => {
                                                if(type.id > 0){
                                                    return (
                                                        <option key={key} value={type.id}>{type.name}</option>
                                                    );
                                                }
                                            })
                                        }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">Nhà cung cấp</label>
                                        <select className="form-control" value={this.props.baoCaoNhapHangs.search.supplier_id} onChange={event => this._onSearch('supplier_id', event.target.value)}>
                                        <option value="-1">Tất cả</option>
                                        {
                                            customers.map((type, key) => {    
                                                if(type.id > 0){
                                                    return (
                                                        <option key={key} value={type.id}>{type.name}</option>
                                                    );
                                                }
                                            })
                                        }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <label className="control-label">Hình thức nhập</label>
                                    <select className="form-control" value={this.props.baoCaoNhapHangs.search.input_output_form_type_id} onChange={event => this._onSearch('input_output_form_type_id', event.target.value)}>
                                    <option value="-1">Tất cả</option>
                                    {
                                        this.props.inputOutputTypeForms.listRoot.map((type, key) => {
                                            if(type.id > 0){
                                                return (
                                                    <option key={key} value={type.id}>{type.name}</option>
                                                );
                                            }
                                        })
                                    }
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-3">
                                    <label>Nhân viên</label>
                                    <select className="form-control" value={this.props.baoCaoNhapHangs.search.user_id} onChange={event => this._onSearch('user_id', event.target.value)}>
                                    <option value="-1">Tất cả</option>
                                    {
                                        this.props.users.listRoot.map((user, key) => {
                                            if (user.id > 0) {
                                                return (
                                                    <option key={key} value={user.id}>{user.fullname}</option>
                                                );
                                            }
                                        })
                                    }
                                    </select>
                                </div>
                                
                                <div className="col-sm-3">
                                    <div className='form-group'>
                                        <label>Nhóm thuốc</label>
                                        <select className="form-control" value={this.props.baoCaoNhapHangs.search.medicine_group_id} onChange={event => this._onSearch('medicine_group_id', event.target.value)}>
                                            <option value="-1">Tất cả nhóm thuốc</option>
                                            {
                                                this.props.medicineGroups.listRoot.map((country, key) => {
                                                    if (country.id > 0) {
                                                        return (
                                                            <option key={key} value={country.id}>{country.name}</option>
                                                        );
                                                    }
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">Tên thuốc</label>
                                        <input type="text" className="form-control" ref="code" value={this.props.baoCaoNhapHangs.search.keyword} onChange={event => this._onSearch('keyword', event.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                <div className="form-group">
                                    <label className="control-label">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
                                        <label className="checkbox padding-left-20px"><input type="checkbox" checked={parseInt(this.props.baoCaoNhapHangs.search.vat_mode)?true:false} onChange={(event) => {const value = (parseInt(this.props.baoCaoNhapHangs.search.vat_mode) === 0 || typeof this.props.baoCaoNhapHangs.search.vat_mode === 'undefined') ? 1: 0; this._onSearch('vat_mode', value)}} />Đơn giá bao gồm VAT</label>
                                    </div>
                                </div>
                                <div className="col-sm-1">
                                    <label className="control-label">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
                                    <button type="button" className="btn green btn-block" onClick={this._onSearchBill.bind(this)}> Tìm </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                                                    );
                }
                ;
            }
            ;

            const mapStateToProps = ({
            baoCaoNhapHangs,
                    users,
                    inputOutputTypeForms,
                    pharmacyWarehouses,
                    suppliers,
                    medicineGroups
                    }) => {
                return {
                    baoCaoNhapHangs,
                    users,
                    inputOutputTypeForms,
                    pharmacyWarehouses,
                    suppliers,
                    medicineGroups
                };
            };

            const mapDispatchToProps = (dispatch) => {
                return Redux.bindActionCreators({
                    ...ReactRouterRedux.routerActions,
                    ...BaoCaoNhapHangListActions,
                    loadWareHouseKepperList,
                    inputTypeFormLoadList,
                    pharmacyWarehouseLoadList,
                    medicineGroupLoadList,
                    customerLoadList
                }, dispatch);
            };

            module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchConditions);