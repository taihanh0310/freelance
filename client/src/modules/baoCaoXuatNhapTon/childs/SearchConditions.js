const {Translate, I18n} = ReactReduxI18n;
import Datepicker from 'common/components/Datepicker';
import * as BaoCaoXuatNhapTonListActions from 'modules/baoCaoXuatNhapTon/actions/list';
import {loadList as pharmacyWarehouseLoadList} from 'modules/pharmacyWarehouse/actions/list'; // Danh sach nha thuoc
import {loadList as medicineGroupLoadList} from 'modules/medicineGroup/actions/list'; // Danh sach nha thuoc
import {loadSupplierList as supplierLoadList} from 'modules/supplier/actions/list'; // Danh sach nha cung cap

class SearchConditions extends React.Component {
    
    constructor(){
        super();
    }
    
    componentDidMount(){
        this._loadAll();
        this._onSearchBill();
    }
    
    _loadAll(){
        this.props.pharmacyWarehouseLoadList();
        this.props.medicineGroupLoadList();
        this.props.supplierLoadList();
    }
    _onSearch(field, value){
        this.props.changeSearchList(field, value);
    }
    
    _onSearchBill(){
        Helper.PageBlock(I18n.t('application.text.loading'));
this.props.clearSelectedDetail(); 
        this.props.clearListChild(); 
        let values = $.extend({}, this.props.baoCaoXuatNhapTons.search);
        this.props.searchByCondition(values);
        
    }
    _onExit(){
            this.props.push(Routes.dashboard.view);
        }
        
    _onPrintReview(){
        let values = $.extend({}, this.props.baoCaoXuatNhapTons.search);
        
        axios.post(`${Config.API_URL}xuat-nhap-ton/pdfExport`, {values}, {
        responseType: 'arraybuffer'
        })
        .then((response) => {
            let downloadLink = document.createElement('a');
            downloadLink.target   = '_blank';

            const date = Moment(new Date()).format('YYYY.MM.DD_HH.mm.ss');
            const fileName = `bao_cao_xuat_nhap_ton_${date}.pdf`;
            downloadLink.download = fileName;

            const blob = new Blob([response.data], { type: 'application/pdf' });
            var URL = window.URL || window.webkitURL;
            var downloadUrl = URL.createObjectURL(blob);

            downloadLink.href = downloadUrl;

            document.body.append(downloadLink);

            downloadLink.click();

            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(downloadUrl);
        })
        .catch((error) => {
            Helper.alertErrorAferPrint();
        });
        
    }
    
    render() {
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
                                            <div className="col-sm-12">
                                                <div className="input-group date-picker input-daterange">
                                                    <Datepicker value={this.props.baoCaoXuatNhapTons.search.date_from} onChange={(value) => this._onSearch('date_from', value)}/>
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-forward"></i>
                                                    </span>
                                                    <Datepicker value={this.props.baoCaoXuatNhapTons.search.date_to} onChange={(value) => this._onSearch('date_to', value)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label className="control-label col-sm-4">Nhà thuốc</label>
                                            <div className="col-sm-8">
                                                <select className="form-control" onChange={event => this._onSearch('pharma_warehouse_id', event.target.value)}
                                                    value={this.props.baoCaoXuatNhapTons.search.pharma_warehouse_id}>
                                                    <option value="-1">Tất cả nhà thuốc</option>
                                                    {
                                                        this.props.pharmacyWarehouses.listRoot.map((country, key) => {
                                                            
                                                            if(country.id > 0){
                                                                return (
                                                                    <option key={key} value={country.id}>{country.name}</option>
                                                                );
                                                            }
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label className="control-label col-sm-4">Nhà cung cấp</label>
                                            <div className="col-sm-8">
                                                <select className="form-control" value={this.props.baoCaoXuatNhapTons.search.supplier_id} onChange={event => this._onSearch('supplier_id', event.target.value)}>
                                                <option value="-1">Tất cả nhà cung cấp</option>
                                                {
                                                    this.props.suppliers.list.map((type, key) => {
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
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label className="control-label col-sm-4">Nhóm thuốc</label>
                                            <div className="col-sm-8">
                                                <select className="form-control" onChange={event => this._onSearch('medicine_group_id', event.target.value)}
                                                    value={this.props.baoCaoXuatNhapTons.search.medicine_group_id}>
                                                    <option value="-1">Tất cả nhóm thuốc</option>
                                                    {
                                                        this.props.medicineGroups.listRoot.map((country, key) => {
                                                            if(country.id > 0){
                                                                return (
                                                                    <option key={key} value={country.id}>{country.name}</option>
                                                                );
                                                            }
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6" id="list_checkbox">
                                        <div className="form-group">
                                            <div className="checkbox-list">
                                                <div className="checkbox-inline">
                                                    <input type="checkbox" checked={parseInt(this.props.baoCaoXuatNhapTons.search.data_connected)?true:false} onChange={event => {
                                                                            const value = (parseInt(this.props.baoCaoXuatNhapTons.search.data_connected) === 0 || typeof this.props.baoCaoXuatNhapTons.search.data_connected === 'undefined') ? 1: 0;
                                                                            this.props.changeSearchList('data_connected', value);
                                                                    }} id="data_connected"/>
                                                    <label>Dữ liệu kết xuất</label>
                                                </div>
                                                 <div className="checkbox-inline">
                                                    <input type="checkbox" checked={parseInt(this.props.baoCaoXuatNhapTons.search.see_detail)?true:false} onChange={event => {
                                                                            const value = (parseInt(this.props.baoCaoXuatNhapTons.search.see_detail) === 0 || typeof this.props.baoCaoXuatNhapTons.search.see_detail === 'undefined') ? 1: 0;
                                                                            this.props.changeSearchList('see_detail', value);
                                                                    }} id="see_detail"/>
                                                    <label>Xem chi tiết</label>
                                                </div>
                                                <div className="checkbox-inline">
                                                    <input type="checkbox" checked={parseInt(this.props.baoCaoXuatNhapTons.search.see_shipment_no)?true:false} onChange={event => {
                                                                            const value = (parseInt(this.props.baoCaoXuatNhapTons.search.see_shipment_no) === 0 || typeof this.props.baoCaoXuatNhapTons.search.see_shipment_no === 'undefined') ? 1: 0;
                                                                            this.props.changeSearchList('see_shipment_no', value);
                                                                    }} id="see_shipment_no"/>
                                                    <label>Theo lô sản xuất</label>
                                                </div>
                                                <div className="checkbox-inline">
                                                    <input type="checkbox" checked={parseInt(this.props.baoCaoXuatNhapTons.search.medicine_input_output)?true:false} onChange={event => {
                                                                            const value = (parseInt(this.props.baoCaoXuatNhapTons.search.medicine_input_output) === 0 || typeof this.props.baoCaoXuatNhapTons.search.medicine_input_output === 'undefined') ? 1: 0;
                                                                            this.props.changeSearchList('medicine_input_output', value);
                                                                    }} id="medicine_input_output"/>
                                                    <label>Hàng nhập xuất</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                                <label className="control-label col-sm-2">Tìm theo tên</label>
                                                <div className="col-sm-10">
                                                        <input type="text" className="form-control" onChange={(event => this._onSearch('keyword', event.target.value))}/>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">                                    
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                                <label className="control-label col-sm-4">Tổng tiền</label>
                                                <div className="col-sm-8">
                                                        <input type="text" className="form-control text-right" readOnly value={Numeral(this.props.baoCaoXuatNhapTons.list.total).format('0,0')}/>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <div className="col-sm-12">
                                                    <button type="button" className="btn green btn-block btn-customer-size" onClick={this._onSearchBill.bind(this)}> Xem báo cáo</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <div className="col-sm-12">
                                                <button type="button" className="btn green btn-block btn-customer-size" onClick={this._onPrintReview.bind(this)}> In và kết xuất</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <div className="col-sm-12">
                                                <button type="button" className="btn green btn-block btn-customer-size" onClick={this._onExit.bind(this)}>
                                                    <Translate value="application.button.exit"/>
                                                </button>
                                            </div>
                                        </div>
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
                    baoCaoXuatNhapTons,
                    pharmacyWarehouses,
                    medicineGroups,
                    suppliers
                }) => {
                    return {
                        baoCaoXuatNhapTons,
                        pharmacyWarehouses,
                        medicineGroups,
                        suppliers
                    };
                };

                const mapDispatchToProps = (dispatch) => {
                    return Redux.bindActionCreators({
                        ...ReactRouterRedux.routerActions,
                        ...BaoCaoXuatNhapTonListActions,
                        pharmacyWarehouseLoadList,
                        medicineGroupLoadList,
                        supplierLoadList
                    }, dispatch);
                };

                module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchConditions);
