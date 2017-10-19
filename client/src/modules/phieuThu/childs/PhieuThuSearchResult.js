const {Translate, I18n} = ReactReduxI18n;
import * as PhieuThuListActions from 'modules/phieuThu/actions/list';
import * as PhieuThuFormActions from 'modules/phieuThu/actions/form';

class PhieuThuSearchResult extends React.Component{
    
    constructor(){
        super();
    }

    componentDidMount(){
        this._loadList(this.props.phieuThus.search.date_from, this.props.phieuThus.search.date_to);
        Helper.CheckPageHeight(300);
    }

    _loadList(dateFrom, dateTo){
        Helper.PageBlock(I18n.t('application.text.loading'));
        this.props.loadList(moment(dateFrom).format('YYYY-MM-DD'), moment(dateTo).format('YYYY-MM-DD'))
        .then(() => {
            
        })
    }

    _onClickRow(phieuThu, key){
        this.setState({selectedKey: key});
        this.props.chooseSelectedDetail(phieuThu);
        this.props.formChangeMode('edit');
    }

    render(){
        
        return (
            <div className="portlet box green">
            	<div className="portlet-title">
                    <div className="caption">
                        Danh sách hóa đơn
                    </div>
                </div>
                <div className="portlet-body">
                	<div className="table-scrollable">
                		<table className="table fixed-header table-bordered" id="search_bill_result_list">
                			<thead>
                                <tr>
                                    <th><span>Số hóa đơn</span></th>
                                    <th><span>Ngày thu</span></th>
                                    <th><span>Người thu</span></th>
                                    <th><span>Tổng tiền</span></th>
                                    <th><span>Diễn giải</span></th>
                                </tr>
                            </thead>
                            <tbody id="list-container">
                        	{
                                (this.props.phieuThus === 'undefined' || this.props.phieuThus.list === 'undefined' || this.props.phieuThus.list.length == 0)
                                ?
                                (    <tr>
                                        <td colSpan="4" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                        </td>
                                    </tr>
                                )
                                :
                                (
                                    this.props.phieuThus.list.map((item, key) => {
                                        const selected = (this.props.phieuThus.selectedDetail.id === item.id) ? 'row-active': '';
                                        return (
                                            <tr key={key} className={selected} onClick={this._onClickRow.bind(this, item, key)}>
                                                <td className="col-sm-2">{item.code}</td>
                                                <td className="col-sm-2">{Helper.formatStringToDate(item.date_input)}</td>
                                                <td className="col-sm-2">{item.supplier_name}</td>
                                                <td className="text-right col-sm-2">{Numeral(item.total_money).format('0,0')}</td>
                                                <td className="col-sm-4">{item.description}</td>
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
};


const mapStateToProps = ({
        phieuThus,
        phieuThuForm
    }) => {
    return {
        phieuThus,
        phieuThuForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...PhieuThuListActions,
        ...PhieuThuFormActions,
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PhieuThuSearchResult);
