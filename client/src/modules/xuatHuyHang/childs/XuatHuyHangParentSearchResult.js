const {Translate, I18n} = ReactReduxI18n;
import Datepicker from 'common/components/Datepicker';
import * as XuatHuyHangListActions from 'modules/xuatHuyHang/actions/list';
import * as XuatHuyHangFormActions from 'modules/xuatHuyHang/actions/form';
import {changeList as medicineChangeList} from 'modules/medicine/actions/list';
import {formClear as formChildClear} from 'modules/xuatHuyHang/actions/formChild';

class XuatHuyHangParentSearchResult extends React.Component {
	constructor(){
        super();
        this.state = {
            dateFrom: moment().add(-1, 'months'),
            dateTo: moment().add(0, 'days'),
            selectedKey: -1
        }
    }
    componentDidMount(){
        this._loadList(this.state.dateFrom, this.state.dateTo);
        Keyboard.bind('up', event => {
            this._onPreviousRow();
        });
        Keyboard.bind('down', event => {
            this._onNextRow();
        });
    }
    componentWillUnmount(){
        Keyboard.unbind('down');
        Keyboard.unbind('up');
        Helper.CheckPageHeight(300);
    }
    _onNextRow() {
        if(this.props.xuatHuyHangs.selectedDetail.id) {
            if (this.state.selectedKey < this.props.xuatHuyHangs.list.length - 1) {
                const nextKey = this.state.selectedKey+1;
                const selectedDetail = this.props.xuatHuyHangs.list[nextKey];
                this.props.chooseSelectedDetail(selectedDetail);
                this.setState({selectedKey: nextKey});
            }
        }
    }
    _onPreviousRow() {
        if (this.props.xuatHuyHangs.selectedDetail.id) {
            const xuatHuyHangs = this.props.xuatHuyHangs.list;
            if (this.state.selectedKey > 0) {
                const previousKey = this.state.selectedKey - 1;
                const selectedDetail = xuatHuyHangs[previousKey];
                this.props.chooseSelectedDetail(selectedDetail);
                this.setState({selectedKey: previousKey});
            }

        }
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
        
        setTimeout(() => {
            this._loadList(this.state.dateFrom, this.state.dateTo);
        }, 1000);
    }
    _onClickRow(xuatHuyHang, key){
        this.setState({selectedKey: key});
        this.props.chooseSelectedDetail(xuatHuyHang);
        this.props.formChangeMode('edit');
        setTimeout(() => {
            axios.get(`${Config.API_URL}pharmacy-warehouse/${xuatHuyHang.from_drug_store_id}/medicine`)
            .then(response => {
                const list = response.data.data;
                this.props.medicineChangeList(list);
            });
        }, Config.TIMEOUT);
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
                                    <th><span>Ngày hủy</span></th>
                                </tr>
                            </thead>
                            <tbody id="list-container">
                            {
                                (this.props.xuatHuyHangs === 'undefined' || this.props.xuatHuyHangs.list === 'undefined' || this.props.xuatHuyHangs.list.length == 0)
                                ?
                                (    <tr>
                                        <td colSpan="2" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                        </td>
                                    </tr>
                                )
                                :
                                (
                                    this.props.xuatHuyHangs.list.map((xuatHuyHang, key) => {
                                        const selected = (this.props.xuatHuyHangs.selectedDetail.id === xuatHuyHang.id) ? 'row-active': '';
                                        return (
                                            <tr key={key} className={selected} onClick={this._onClickRow.bind(this, xuatHuyHang, key)}>
                                                <td>{xuatHuyHang.code}</td>
                                                <td>{Helper.formatStringToDate(xuatHuyHang.delivery_date)}</td>
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
        xuatHuyHangs
    }) => {
    return {
        xuatHuyHangs
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...XuatHuyHangListActions,
        ...XuatHuyHangFormActions,
        medicineChangeList,
        formChildClear
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(XuatHuyHangParentSearchResult);