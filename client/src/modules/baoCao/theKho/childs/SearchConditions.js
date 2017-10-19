const {Translate, I18n} = ReactReduxI18n;
import Datepicker from 'common/components/Datepicker';
import * as TheKhoListActions from 'modules/baoCao/theKho/actions/list';
import {loadList as pharmacyWarehouseLoadList} from 'modules/pharmacyWarehouse/actions/list'; // Danh sach nha thuoc
import {loadOnlyMedicine as medicineLoadList, changeList as medicineChangeList} from 'modules/medicine/actions/list';
import {selectDetail as medicineSelectedDetail} from 'modules/medicine/actions/detail';

class SearchConditions extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this._loadAll()
                .then(() => {
                    this._onSearchBill();
                })
    }
    
    componentWillUnmount(){
        this.props.clearList();// Clear search list
    }

    _loadAll() {
        return new Promise((resolve, reject) => {
            this.props.pharmacyWarehouseLoadList(); // nha thuoc
            this.props.medicineLoadList()
                    .then(data => {
                        if(data.data.length > 0){
                            this._onSearch('medicine_id',data.data[1].id)
                            .then(() => {
                                resolve();
                            })
                        }
                    })
        })
      
        
    }

    _onSearchBill() {
        Helper.PageBlock(I18n.t('application.text.loading'));
        let values = $.extend({}, this.props.theKhos.search);
        this.props.searchByCondition(values);
    }

    _onSearch(field, value) {
        return new Promise((resolve, reject) => {
            this.props.changeSearchList(field, value);
            resolve();
        })
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
                                        <label className="control-label">Từ ngày - đến ngày</label>
                                        <div className="input-group date-picker input-daterange">
                                            <Datepicker value={this.props.theKhos.search.date_from} onChange={(value) => this._onSearch('date_from', value)}/>
                                            <span className="input-group-addon">
                                                <i className="fa fa-forward"></i>
                                            </span>
                                            <Datepicker value={this.props.theKhos.search.date_to} onChange={(value) => this._onSearch('date_to', value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">Kho hàng</label>
                                        <select className="form-control" value={this.props.theKhos.search.from_drug_store_id} onChange={event => this._onSearch('from_drug_store_id', event.target.value)}>
                                        <option value="-1">Tất cả các kho</option>
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
                                <div className="col-sm-3">
                                <div className="form-group">
                                        <label className="control-label">Tên thuốc</label>
                                        <select className="form-control" value={this.props.theKhos.search.medicine_id} onChange={event => this._onSearch('medicine_id', event.target.value)}>
                                        {
                                            this.props.medicines.list.map((type, key) => {
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
                                <div className="col-sm-1">
                                    <label className="control-label">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
                                    <button type="button" className="btn green btn-block" onClick={this._onSearchBill.bind(this)}> Tìm </button>
                                </div>
                                <div className="col-sm-2">
                                <div className="form-group text-center">
                                    <label className="control-label">Tồn đầu kì</label>
                                    <input type="text" className="form-control text-right" ref="code" readOnly value={Numeral(this.props.theKhos.list.tonDauKi).format('0,0')}/>
                                </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
                );
                };
            };

            const mapStateToProps = ({
                    theKhos,
                    pharmacyWarehouses,
                    medicines,
                    medicine
                    }) => {
                return {
                    theKhos,
                    pharmacyWarehouses,
                    medicines,
                    medicine
                };
            };

            const mapDispatchToProps = (dispatch) => {
                return Redux.bindActionCreators({
                    ...ReactRouterRedux.routerActions,
                    ...TheKhoListActions,
                    pharmacyWarehouseLoadList,
                    medicineLoadList,
                    medicineChangeList,
                    medicineSelectedDetail

                }, dispatch);
            };

            module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchConditions);