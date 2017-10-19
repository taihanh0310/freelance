const {Translate, I18n} = ReactReduxI18n;
import Datepicker from 'common/components/Datepicker';
import * as LoiNhuanTheoMatHangListActions from 'modules/baoCao/loiNhuanTheoMatHang/actions/list';
import {loadList as pharmacyWarehouseLoadList} from 'modules/pharmacyWarehouse/actions/list'; // Danh sach nha thuoc

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
        this.props.pharmacyWarehouseLoadList();
    }

    _onSearchBill() {
        Helper.PageBlock(I18n.t('application.text.loading'));
        
        // clear list and clear list child
//        this.props.clearList();
        this.props.clearListChild();
        
        setTimeout(() => {
            let values = $.extend({}, this.props.loiNhuanTheoMatHangs.search);
            this.props.searchByCondition(values);
        }, 200);
    }

    _onSearch(field, value) {
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
                                            <Datepicker value={this.props.loiNhuanTheoMatHangs.search.date_from} onChange={(value) => this._onSearch('date_from', value)}/>
                                            <span className="input-group-addon">
                                                <i className="fa fa-forward"></i>
                                            </span>
                                            <Datepicker value={this.props.loiNhuanTheoMatHangs.search.date_to} onChange={(value) => this._onSearch('date_to', value)}/>
                                        </div>
                                    </div>
                                </div>
                
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">Kho hàng</label>
                                        <select className="form-control" value={this.props.loiNhuanTheoMatHangs.search.from_drug_store_id} onChange={event => this._onSearch('from_drug_store_id', event.target.value)}>
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
                
                                <div className="col-sm-1">
                                    <label className="control-label">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
                                    <button type="button" className="btn green btn-block" onClick={
                            this._onSearchBill.bind(this)}> Tìm</button>
                                </div>
                
                                <div className="col-sm-5">
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
loiNhuanTheoMatHangs,
        pharmacyWarehouses
}) => {
    return {
        loiNhuanTheoMatHangs,
        pharmacyWarehouses
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...LoiNhuanTheoMatHangListActions,
        pharmacyWarehouseLoadList
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchConditions);