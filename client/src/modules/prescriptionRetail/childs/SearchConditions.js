const {Translate, I18n} = ReactReduxI18n;
import Datepicker from 'common/components/Datepicker';
import * as PrescriptionRetailListActions from 'modules/prescriptionRetail/actions/list';
import {loadList as pharmacyWarehouseLoadList} from 'modules/pharmacyWarehouse/actions/list'; // Danh sach nha thuoc

class SearchConditions extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this._loadAll();
        this._onSearchBill();
        Helper.CheckPageHeight(300);
    }

    _loadAll() {
        this.props.pharmacyWarehouseLoadList();
    }

    _searchCondition(values) {
        Helper.PageBlock(I18n.t('application.text.loading'));
        this.props.searchByCondition(values)
                .then(() => {

                })
    }

    _onSearchBill() {
        
        let values = $.extend({}, this.props.prescriptionRetails.search);
        this._searchCondition(values);
        this.props.clearSelectedDetail(); //clear detail form cha
    }

    _onSearch(field, value) {
        this.props.changeSearchList(field, value);
    }

    render() {
        const fromPharmacyWarehouses = Helper.GetListFilter(this.props.pharmacyWarehouses.listRoot, {is_main_pharmacies_warehouse: 0});
        return (
                <div className="portlet box green">
                    <div className="portlet-title">
                        <div className="caption">Tìm theo điều kiện</div>
                    </div>
                    <div className="portlet-body">
                        <div className="form-horizontal">
                            <div className="form-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <div className="col-md-12">
                                                <div className="input-group date-picker input-daterange">
                                                    <Datepicker value={this.props.prescriptionRetails.search.date_from} onChange={(value) => this._onSearch('date_from', value)}/>
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-forward"></i>
                                                    </span>
                                                    <Datepicker value={this.props.prescriptionRetails.search.date_to} onChange={(value) => this._onSearch('date_to', value)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                                    <div className='form-group'>
                                                        <label className="control-label col-md-4">Từ kho</label>
                                                        <div className="col-md-8">
                                                            <select className="form-control" value={this.props.prescriptionRetails.search.from_drug_store_id} onChange={event => this._onSearch('from_drug_store_id', event.target.value)}>
                                                                <option value="-1">Tất cả nhà thuốc</option>
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
                                                </div>
                                    <div className="col-sm-5">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">Tên thuốc</label>
                                            <div className="col-md-9">
                                                <input type="text" className="form-control" ref="code" onChange={(event => this._onSearch('keyword', event.target.value))}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-1">
                                        <button type="button" className="btn green btn-block" onClick={this._onSearchBill.bind(this)}> Tìm </button>
                                    </div>
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
prescriptionRetails,
        pharmacyWarehouses
        }) => {
    return {
        prescriptionRetails,
        pharmacyWarehouses
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...PrescriptionRetailListActions,
        pharmacyWarehouseLoadList
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchConditions);