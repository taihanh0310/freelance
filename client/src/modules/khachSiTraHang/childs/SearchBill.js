const {Translate, I18n} = ReactReduxI18n;
import * as KhachSiTraHangListActions from 'modules/khachSiTraHang/actions/list';
import Datepicker from 'common/components/Datepicker';

class SearchBill extends React.Component {
    _onSearchBill() {
        Helper.PageBlock(I18n.t('application.text.loading'));
        let values = this.props.khachSiTraHangs.search;
        this.props.onSearchBill(values);
    }
    _onSearch(field, value) {
        this.props.changeSearchList(field, value);
    }
    render() {
        return (
                <div className="portlet box green">
                    <div className="portlet-title">
                        <div className="caption">
                            Tìm kiếm hóa đơn bán sỉ
                        </div>
                    </div>
                    <div className="portlet-body form">
                        <div className="form-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="control-label">Thời gian tìm kiếm</label>
                                        <div className="input-group date-picker input-daterange">
                                            <Datepicker value={this.props.khachSiTraHangs.search.delivery_date_from} onChange={(value) => this._onSearch('delivery_date_from', value)}/>
                                            <span className="input-group-addon">
                                                <i className="fa fa-forward"></i>
                                            </span>
                                            <Datepicker value={this.props.khachSiTraHangs.search.delivery_date_to} onChange={(value) => this._onSearch('delivery_date_to', value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className='form-group'>
                                        <label className="control-label">Hóa đơn bán sỉ</label>
                                        <div>
                                            <input type="text" className="form-control" value={this.props.khachSiTraHangs.search.product_input_code} onChange={event => this._onSearch('product_input_code', event.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className='form-group'>
                                        <label className="control-label">Tên thuốc</label>
                                        <div>
                                            <input type="text" className="form-control" value={this.props.khachSiTraHangs.search.medicine_name} onChange={event => this._onSearch('medicine_name', event.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className='form-group'>
                                        <label className="control-label">Số lô</label>
                                        <div>
                                            <input type="text" className="form-control" value={this.props.khachSiTraHangs.search.shipment_no} onChange={event => this._onSearch('shipment_no', event.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-1">
                                    <label className="control-label">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
                                    <button type="button" className="btn green btn-block" onClick={this._onSearchBill.bind(this)}> Tìm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )
    }
}

const mapStateToProps = ({
khachSiTraHangs
}) => {
    return {
        khachSiTraHangs
    };
};
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...KhachSiTraHangListActions
    }, dispatch);
};
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchBill);