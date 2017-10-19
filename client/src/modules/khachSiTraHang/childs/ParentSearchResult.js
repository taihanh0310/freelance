const {Translate, I18n} = ReactReduxI18n;
import Datepicker from 'common/components/Datepicker';
import * as KhachSiTraHangListActions from 'modules/khachSiTraHang/actions/list';
import * as KhachSiTraHangFormActions from 'modules/khachSiTraHang/actions/form';
import {changeList as medicineChangeList} from 'modules/medicine/actions/list';
import {formClear as formChildClear} from 'modules/khachSiTraHang/actions/formChild';

class ParentSearchResult extends React.Component {
	constructor(){
        super();
        this.state = {
            dateFrom: moment().add(-1, 'months'),
            dateTo: moment().add(0, 'days'),
        }
    }
    componentDidMount(){
        this._loadList(this.state.dateFrom, this.state.dateTo);
        Helper.CheckPageHeight(300);
    }
    _loadList(dateFrom, dateTo){
        Helper.PageBlock(I18n.t('application.text.loading'));
        this.props.loadList(moment(dateFrom).format('YYYY-MM-DD'), moment(dateTo).format('YYYY-MM-DD'))
        .then(() => {
            
        })
    }
    _onSearchBill(){
        this.props.formClear(); //clear form cha
        this.props.formChildClear(); //clear form con
        this.props.clearListChild(); //clear list child
        this.props.clearSelectedDetail(); //clear detail form cha
        this.props.clearListChildSelectedDetail();
        setTimeout(() => {
            this._loadList(this.state.dateFrom, this.state.dateTo);
        }, 200);
    }
    _onClickRow(khachSiTraHang, key){
        this.props.chooseSelectedDetail(khachSiTraHang);
        this.props.formChangeMode('edit');
//        setTimeout(() => {
//            axios.get(`${Config.API_URL}pharmacy-warehouse/${khachSiTraHang.pharmacy_warehouse_id}/medicine`)
//            .then(response => {
//                const list = response.data.data;
//                this.props.medicineChangeList(list);
//            });
//        }, Config.TIMEOUT);
    }
	render() {
        return (                                
                <div className="portlet box green">
                    <div className="portlet-title">
                        <div className="caption">
                           Tìm kiếm
                        </div>
                    </div>
                    <div className="portlet-body">
                    <div className="form-horizontal form-bordered">
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
                        <div className="form-group">
                            <div className="col-md-12">
                                <button className="btn blue btn-block" onClick={this._onSearchBill.bind(this)} type="button">
                                    <span>Tìm kiếm hóa đơn</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="table-scrollable">
                        <table className="table fixed-header table-bordered" id="search_bill_result_list">
                            <thead>
                                <tr>
                                    <th><span>Số hóa đơn</span></th>
                                    <th><span>Ngày nhập</span></th>
                                </tr>
                            </thead>
                            <tbody id="list-container">
                            {
                                (this.props.khachSiTraHangs === 'undefined' || this.props.khachSiTraHangs.list === 'undefined' || this.props.khachSiTraHangs.list.length == 0)
                                ?
                                (    <tr>
                                        <td colSpan="2" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                        </td>
                                    </tr>
                                )
                                :
                                (
                                    this.props.khachSiTraHangs.list.map((khachSiTraHang, key) => {
                                        const selected = (this.props.khachSiTraHangs.selectedDetail.id === khachSiTraHang.id) ? 'row-active': '';
                                        return (
                                            <tr key={key} className={selected} onClick={this._onClickRow.bind(this, khachSiTraHang, key)}>
                                                <td>{khachSiTraHang.khach_si_tra_hang_code}</td>
                                                <td>{Helper.formatStringToDate(khachSiTraHang.return_date)}</td>
                                            </tr>
                                        );
                                    })
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
        );
    };
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
        ...KhachSiTraHangListActions,
        ...KhachSiTraHangFormActions,
        medicineChangeList,
        formChildClear
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ParentSearchResult);