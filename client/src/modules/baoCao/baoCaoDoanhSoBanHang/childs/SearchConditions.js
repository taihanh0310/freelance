const {Translate, I18n} = ReactReduxI18n;
import Datepicker from 'common/components/Datepicker';
import OnlyMonthYearPicker from 'common/components/OnlyMonthYearPicker';
import * as BaoCaoDoanhSoBanHangListAction from 'modules/baoCao/baoCaoDoanhSoBanHang/actions/list';
import {loadWareHouseKepperList as loadWareHouseKepperList} from 'modules/user/actions/list';
import {loadOutputFormList as inputTypeFormLoadList} from 'modules/inputOutputTypeForm/actions/list'; // Hinh thuc nhap

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
        this.props.loadWareHouseKepperList(); // user
    }

    _onSearchBill() {
        Helper.PageBlock(I18n.t('application.text.loading'));
        let values = $.extend({}, this.props.baoCaoDoanhSoBanHangs.search);
        this.props.searchByCondition(values);
    }

    _onSearch(field, value) {
        this.props.changeSearchList(field, value);
    }

    _onPrintReview(){
        let values = $.extend({}, this.props.baoCaoDoanhSoBanHangs.search);
              
        axios.post(`${Config.API_URL}bao-cao-doanh-so-ban-hang/pdfExport`, {values}, {
        responseType: 'arraybuffer'
        })
        .then((response) => {
            let downloadLink = document.createElement('a');
            downloadLink.target   = '_blank';

            const date = Moment(new Date()).format('YYYY.MM.DD_HH.mm.ss');
            const fileName = `bao_cao_doanh_so_ban_hang_${date}.pdf`;
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
                        <div className="caption">Thông tin tìm kiếm</div>
                    </div>
                    <div className="portlet-body">
                        <div className="form-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">Từ ngày - đến ngày</label>
                                        <div className="input-group date-picker input-daterange">
                                            <Datepicker value={this.props.baoCaoDoanhSoBanHangs.search.date_from} onChange={(value) => this._onSearch('date_from', value)}/>
                                            <span className="input-group-addon">
                                                <i className="fa fa-forward"></i>
                                            </span>
                                            <Datepicker value={this.props.baoCaoDoanhSoBanHangs.search.date_to} onChange={(value) => this._onSearch('date_to', value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <label className="control-label">Hình thức</label>
                                    <select className="form-control" value={this.props.baoCaoDoanhSoBanHangs.search.input_output_form_type_id} onChange={event => this._onSearch('input_output_form_type_id', event.target.value)}>
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
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">Trong ngày</label>
                                        <label className="control-label label-float-right">Tổng tiền</label>
                                        <div className="input-group">
                                            <Datepicker value={this.props.baoCaoDoanhSoBanHangs.search.day_search} onChange={(value) => this._onSearch('day_search', value)}/>
                                            <span className="input-group-addon">
                                                <i className="fa fa-minus"></i>
                                            </span>
                                            <input type='text' readOnly className='form-control text-right' value={Numeral(this.props.baoCaoDoanhSoBanHangs.list.totalPriceDay).format('0,0')}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">Trong tháng</label>
                                        <label className="control-label label-float-right">Tổng tiền</label>
                                        <div className="input-group">
                                            <OnlyMonthYearPicker value={this.props.baoCaoDoanhSoBanHangs.search.month_search} onChange={(value) => this._onSearch('month_search', value)}/>
                                            <span className="input-group-addon">
                                                <i className="fa fa-minus"></i>
                                            </span>
                                            <input type='text' readOnly className='form-control text-right' value={Numeral(this.props.baoCaoDoanhSoBanHangs.list.totalPriceMonth).format('0,0')}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-3">
                                    <label>Nhân viên</label>
                                    <select className="form-control" value={this.props.baoCaoDoanhSoBanHangs.search.user_id} onChange={event => this._onSearch('user_id', event.target.value)}>
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
                                
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
                                        <div className='mt-radio-inline'>
                                            <label className="mt-radio padding-left-20px">
                                                <input type="radio" name="optionsRadios" value="1" checked={parseInt(this.props.baoCaoDoanhSoBanHangs.search.type) === 1} onChange={event => this._onSearch('type', event.target.value)}/>
                                                Mặc định
                                                <span></span>
                                            </label>
                                             <label className="mt-radio padding-left-20px">
                                                <input type="radio" name="optionsRadios" value="2" checked={parseInt(this.props.baoCaoDoanhSoBanHangs.search.type) === 2} onChange={event => this._onSearch('type', event.target.value)}/>
                                                Tổng hợp theo ngày
                                                <span></span>
                                            </label>
                                            <label className="mt-radio padding-left-20px">
                                                <input type="radio" name="optionsRadios" value="3" checked={parseInt(this.props.baoCaoDoanhSoBanHangs.search.type) === 3} onChange={event => this._onSearch('type', event.target.value)}/>
                                                Tổng hợp theo khách hàng
                                                <span></span>
                                            </label>
                                            <label className="mt-radio padding-left-20px">
                                                <input type="radio" name="optionsRadios" value="4" checked={parseInt(this.props.baoCaoDoanhSoBanHangs.search.type) === 4} onChange={event => this._onSearch('type', event.target.value)}/>
                                                Tổng hợp theo ca
                                                <span></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-1">
                                    <div className="form-group">
                                        <label className="control-label">Giờ</label>
                                        <input type="number" className="form-control text-right" min='0' max='23' value={this.props.baoCaoDoanhSoBanHangs.search.house} onChange={event => this._onSearch('house', event.target.value)}/>
                                    </div>
                                </div>

                                <div className="col-sm-1">
                                    <label className="control-label">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
                                    <button type="button" className="btn green" onClick={this._onPrintReview.bind(this)}>
                                        <Translate value="application.button.review_and_print"/>
                                    </button>
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
            baoCaoDoanhSoBanHangs,
                    users,
                    inputOutputTypeForms,
                    }) => {
                return {
                    baoCaoDoanhSoBanHangs,
                    users,
                    inputOutputTypeForms,
                };
            };

            const mapDispatchToProps = (dispatch) => {
                return Redux.bindActionCreators({
                    ...ReactRouterRedux.routerActions,
                    ...BaoCaoDoanhSoBanHangListAction,
                    loadWareHouseKepperList,
                    inputTypeFormLoadList
                }, dispatch);
            };

            module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchConditions);