const {Translate, I18n} = ReactReduxI18n;
import * as ThuocDangDuocBanListActions from 'modules/baoCao/thuocDangDuocBan/actions/list';
import {loadList as pharmacyWarehouseLoadList} from 'modules/pharmacyWarehouse/actions/list'; // Danh sach nha thuoc

class SearchConditions extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this._loadAll()
                .then(() => {
                    this._onSearchBill();
                });
    }
    
    componentWillUnmount(){
        this.props.clearList();// Clear search list
    }

    _loadAll() {
        return new Promise((resolve, reject) => {
            this.props.pharmacyWarehouseLoadList()
                    .then(data => {
                        if(data.data.length > 0){
                            this._onSearch('from_drug_store_id',data.data[1].id)
                            .then(() => {
                                resolve();
                            });
                        }
                    });
        });
    }

    _onSearchBill() {
        Helper.PageBlock(I18n.t('application.text.loading'));
        let values = $.extend({}, this.props.thuocDangDuocBans.search);
        this.props.searchByCondition(values);
    }

    _onSearch(field, value) {
        return new Promise((resolve, reject) => {
            this.props.changeSearchList(field, value);
            resolve();
        });
    }

    render() {
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
                                        <label className="control-label">Kho hàng</label>
                                        <select className="form-control" value={this.props.thuocDangDuocBans.search.from_drug_store_id} onChange={event => this._onSearch('from_drug_store_id', event.target.value)}>
                                        {
                                            this.props.pharmacyWarehouses.listRoot.map((type, key) => {
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
                                <div className="col-sm-8">
                                    
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
                };
            };

            const mapStateToProps = ({
                    thuocDangDuocBans,
                    pharmacyWarehouses
                    }) => {
                return {
                    thuocDangDuocBans,
                    pharmacyWarehouses
                };
            };

            const mapDispatchToProps = (dispatch) => {
                return Redux.bindActionCreators({
                    ...ReactRouterRedux.routerActions,
                    ...ThuocDangDuocBanListActions,
                    pharmacyWarehouseLoadList
                }, dispatch);
            };

            module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchConditions);