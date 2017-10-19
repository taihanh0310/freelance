const {Translate, I18n} = ReactReduxI18n;
import * as LoiNhuanTheoDonHangListActions from 'modules/baoCao/loiNhuanTheoDonHang/actions/list';

class SearchResult extends React.Component{
    
    constructor(){
        super();
    }
    
    _onClickRow(loiNhuanTheoDonHang, key){
//        this.props.chooseSelectedDetail(loiNhuanTheoDonHang);
//        this.props.formChangeMode('edit');
    }
    
    componentDidMount(){
        Helper.CheckPageHeight(280);
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
                                    <th className="col-sm-1"><span>Hóa đơn</span></th>
                                    <th className="col-sm-1"><span>Lợi nhuận</span></th>
                                </tr>
                            </thead>
                            <tbody id="list-container">
                        	{
                                (this.props.loiNhuanTheoDonHangs === 'undefined' || this.props.loiNhuanTheoDonHangs.list.items === 'undefined' || this.props.loiNhuanTheoDonHangs.list.items.length == 0)
                                ?
                                (    <tr>
                                        <td colSpan="2" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                        </td>
                                    </tr>
                                )
                                :
                                (
                                    this.props.loiNhuanTheoDonHangs.list.items.map((item, key) => {
                                        return (
                                            <tr key={key}>
                                                <td></td>
                                                <td className="text-right">{Numeral(0).format('0,0')}</td>
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
        loiNhuanTheoDonHangs
    }) => {
    return {
        loiNhuanTheoDonHangs
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...LoiNhuanTheoDonHangListActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchResult);
