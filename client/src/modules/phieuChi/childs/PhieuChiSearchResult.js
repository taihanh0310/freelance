const {Translate, I18n} = ReactReduxI18n;
import * as PhieuChiListActions from 'modules/phieuChi/actions/list';
import * as PhieuChiFormActions from 'modules/phieuChi/actions/form';

class PhieuChiSearchResult extends React.Component{
    
    constructor(){
        super();
    }

    componentDidMount(){
        this._loadList(this.props.phieuChis.search.date_from, this.props.phieuChis.search.date_to);
        Helper.CheckPageHeight(300);
    }

    _loadList(dateFrom, dateTo){
        Helper.PageBlock(I18n.t('application.text.loading'));
        this.props.loadList(moment(dateFrom).format('YYYY-MM-DD'), moment(dateTo).format('YYYY-MM-DD'))
        .then(() => {
            
        })
    }

    _onClickRow(phieuChi, key){
        this.setState({selectedKey: key});
        this.props.chooseSelectedDetail(phieuChi);
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
                                    <th><span>Ngày chi</span></th>
                                    <th><span>Người chi</span></th>
                                    <th><span>Tổng tiền</span></th>
                                    <th><span>Diễn giải</span></th>
                                </tr>
                            </thead>
                            <tbody id="list-container">
                        	{
                                (this.props.phieuChis === 'undefined' || this.props.phieuChis.list === 'undefined' || this.props.phieuChis.list.length == 0)
                                ?
                                (    <tr>
                                        <td colSpan="4" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                        </td>
                                    </tr>
                                )
                                :
                                (
                                    this.props.phieuChis.list.map((item, key) => {
                                        const selected = (this.props.phieuChis.selectedDetail.id === item.id) ? 'row-active': '';
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
        phieuChis,
        phieuChiForm
    }) => {
    return {
        phieuChis,
        phieuChiForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...PhieuChiListActions,
        ...PhieuChiFormActions,
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PhieuChiSearchResult);
