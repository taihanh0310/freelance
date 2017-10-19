const {Translate, I18n} = ReactReduxI18n;
import Datepicker from 'common/components/Datepicker';
import * as SoNhapThuocListActions from 'modules/soNhapThuoc/actions/list';

class SearchConditions extends React.Component {

    constructor() {
        super();
        this.state = {
            dateFrom: moment().add(-1, 'months'),
            dateTo: moment().add(0, 'days'),
            keyword: ''
        }
    }

    componentDidMount() {
        this._onSearchBill();
    }

    _searchCondition(dateFrom, dateTo, keyword) {
        Helper.PageBlock(I18n.t('application.text.loading'));
        this.props.searchByCondition(moment(dateFrom).format('YYYY-MM-DD'), moment(dateTo).format('YYYY-MM-DD'), keyword)
                .then(() => {

                })
    }

    _onSearchBill() {
        this._searchCondition(this.state.dateFrom, this.state.dateTo, this.state.keyword);
//        this.props.clearSelectedDetail(); //clear detail form cha
    }

    _onSearch(field, value) {
        this.props.changeSearchList(field, value);
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
                                                    <Datepicker value={this.state.dateFrom} onChange={(value) => this.setState({dateFrom: value})}/>
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-forward"></i>
                                                    </span>
                                                    <Datepicker value={this.state.dateTo} onChange={(value) => this.setState({dateTo: value})}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="form-group">
                                            <label className="control-label col-md-2">Tìm kiếm</label>
                                            <div className="col-md-10">
                                                <input type="text" className="form-control" ref="code" value={this.state.keyword} onChange={(event) => this.setState({keyword: event.target.value})}/>
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
soNhapThuocs
        }) => {
    return {
        soNhapThuocs
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...SoNhapThuocListActions,
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchConditions);