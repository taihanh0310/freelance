const {Translate, I18n} = ReactReduxI18n;
import Datepicker from 'common/components/Datepicker';
import * as BaoCaoXuatHangListActions from 'modules/baoCao/baoCaoXuatHangChiTiet/actions/list';
import {loadOutputFormList as inputTypeFormLoadList} from 'modules/inputOutputTypeForm/actions/list'; // Hinh thuc nhap
import {loadList as pharmacyWarehouseLoadList} from 'modules/pharmacyWarehouse/actions/list'; // Danh sach nha thuoc
import {loadList as medicineGroupLoadList} from 'modules/medicineGroup/actions/list'; // Danh sach nha thuoc
import {loadAllRetailCustomerAndCustomer as customerLoadList} from 'modules/user/actions/list';
import {loadWareHouseKepperList as loadWareHouseKepperList} from 'modules/user/actions/list'; // Nhan vien

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

    componentWillUnmount() {
        this.props.clearList();// Clear search list
    }

    _loadAll() {
        this.props.inputTypeFormLoadList(); // hinh thuc nhap
        this.props.pharmacyWarehouseLoadList(); // nha thuoc
        this.props.medicineGroupLoadList();
        this.props.customerLoadList();
        this.props.loadWareHouseKepperList(); // user
    }

    _onSearchBill() {
        Helper.PageBlock(I18n.t('application.text.loading'));
        let values = $.extend({}, this.props.baoCaoXuatHangs.search);
        this.props.searchByCondition(values);
    }

    _onSearch(field, value) {
        console.log(value);
        this.props.changeSearchList(field, value);
    }

    render() {
        const fromPharmacyWarehouses = Helper.GetListFilter(this.props.pharmacyWarehouses.listRoot, {is_main_pharmacies_warehouse: 0});
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
                                            <Datepicker value={this.props.baoCaoXuatHangs.search.date_from} onChange={(value) => this._onSearch('date_from', value)}/>
                                            <span className="input-group-addon">
                                                <i className="fa fa-forward"></i>
                                            </span>
                                            <Datepicker value={this.props.baoCaoXuatHangs.search.date_to} onChange={(value) => this._onSearch('date_to', value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">Kho hàng</label>
                                        <select className="form-control" value={this.props.baoCaoXuatHangs.search.from_drug_store_id} onChange={event => this._onSearch('from_drug_store_id', event.target.value)}>
                                            <option value="-1">Tất cả các kho</option>
                                            {
                                                fromPharmacyWarehouses.map((type, key) => {
                                                    if (type.id > 0) {
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
                                    <label className="control-label">Hình thức</label>
                                    <select className="form-control" value={
                            this.props.baoCaoXuatHangs.search.input_output_form_type_id} onChange={event => this._onSearch('input_output_form_type_id', event.target.value)}>
                                        <option value="-1">Tất cả</option>
                                        {
                                                    this.props.inputOutputTypeForms.listRoot.map((type, key) => {
                                                        if (type.id > 0) {
                                                            return (
                                                    <option key={key} value={type.id}>{type.name}</option>
                                                                    );
                                        }
                                        })
                                        }
                                    </select>
                                </div>
                                <div className="col-sm-3">
                                    <label>Khách hàng</label>
                                    <select className="form-control" value={
                                    this.props.baoCaoXuatHangs.search.customer_id} onChange={event => this._onSearch('customer_id', event.target.value)}>
                                        <option value="-1">Tất cả</option>
                                        {
                                            this.props.userCustomers.listRoot.map((country, key) => {
                                                return (
                                                    <option key={key} value={country.id}>{country.full_name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-3">
                                    <label>Nhân viên</label>
                                    <select className="form-control" value={this.props.baoCaoXuatHangs.search.user_id} onChange={event => this._onSearch('user_id', event.target.value)}>
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
                                        <select className="form-control" value={this.props.baoCaoXuatHangs.search.medicine_group_id} onChange={event => this._onSearch('medicine_group_id', event.target.value)}>
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
                                        <input type="text" className="form-control" ref="code" value={
                                            this.props.baoCaoXuatHangs.search.keyword} onChange={event => this._onSearch('keyword', event.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                </div>
                                <div className="col-sm-1">
                                    <label className="control-label">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
                                    <button type="button" className="btn green btn-block" onClick={this._onSearchBill.bind(this)}> Tìm</button>
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
baoCaoXuatHangs,
        inputOutputTypeForms,
        pharmacyWarehouses,
        medicineGroups,
        users,
        userCustomers
        }) => {
    return {
        baoCaoXuatHangs,
        inputOutputTypeForms,
        pharmacyWarehouses,
        medicineGroups,
        users,
        userCustomers
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...BaoCaoXuatHangListActions,
        inputTypeFormLoadList,
        pharmacyWarehouseLoadList,
        medicineGroupLoadList,
        customerLoadList,
        loadWareHouseKepperList
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchConditions);