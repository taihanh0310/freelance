const {Translate, I18n} = ReactReduxI18n;
import Datepicker from 'common/components/Datepicker';
import * as QuanLyCongNoListActions from 'modules/quanLyCongNo/actions/list';

class DieuKienTimKiem extends React.Component {

    constructor() {
        super();
//        this.state = {
//            dateFrom: moment().add(-1, 'months'),
//            dateTo: moment().add(1, 'days'),
//            keyword: '',
//            type: -1
//        }
    }

    _onSearch(field, value) {
        this.props.changeSearchList(field, value);
    }

    componentDidMount() {
        this._onSearchBill();
    }

    _onSearchBill() {
        Helper.PageBlock(I18n.t('application.text.loading'));
        this.props.clearSelectedDetail();
        this.props.clearListChild();
        let values = $.extend({}, this.props.quanLyCongNos.search);
        this.props.searchByCondition(values);
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
                                            <div className="col-md-12">
                                                <div className="input-group date-picker input-daterange">
                                                    <Datepicker value={this.props.quanLyCongNos.search.date_from} onChange={(value) => this._onSearch('date_from', value)}/>
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-forward"></i>
                                                    </span>
                                                    <Datepicker value={this.props.quanLyCongNos.search.date_to} onChange={(value) => this._onSearch('date_to', value)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <div className="col-md-12">
                                                <select className="form-control" onChange={event => this._onSearch('type', event.target.value)}>
                                                    <option value="0">Nhà cung cấp</option>
                                                    <option value="1">Khách hàng</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">Tìm theo tên</label>
                                            <div className="col-md-9">
                                                <input type="text" className="form-control" ref="code" onChange={(event => this._onSearch('keyword', event.target.value))}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <div className="col-md-12">
                                                <button type="button" className="btn green btn-block" onClick={this._onSearchBill.bind(this)}> Tìm kiếm</button>
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

const mapStateToProps = ({
quanLyCongNos
}) => {
    return {
        quanLyCongNos
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...QuanLyCongNoListActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DieuKienTimKiem);