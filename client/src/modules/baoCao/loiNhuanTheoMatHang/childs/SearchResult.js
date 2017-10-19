const {Translate, I18n} = ReactReduxI18n;
import * as LoiNhuanTheoMatHangListActions from 'modules/baoCao/loiNhuanTheoMatHang/actions/list';

class SearchResult extends React.Component{
    
    constructor(){
        super();
    }
    
    _onClickRow(loiNhuanTheoMatHang, key){
        Helper.PageBlock(I18n.t('application.text.loading'));
        
        this.props.changeSearchList('medicine_group_id', loiNhuanTheoMatHang.medicine_group_id);
        
        // clear list child before click
        this.props.clearListChild();
        
        setTimeout(() => {
            // get value onject khi update lai du lieu tim kiem
            let values = $.extend({}, this.props.loiNhuanTheoMatHangs.search);
            this.props.chooseSelectedDetail(values);
        }, 500);
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
                                    <th><span>Tên nhóm sản phẩm</span></th>
                                </tr>
                            </thead>
                            <tbody id="list-container">
                        	{
                                (this.props.loiNhuanTheoMatHangs === 'undefined' || this.props.loiNhuanTheoMatHangs.list === 'undefined' || this.props.loiNhuanTheoMatHangs.list.length == 0)
                                ?
                                (    <tr>
                                        <td className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                        </td>
                                    </tr>
                                )
                                :
                                (
                                    this.props.loiNhuanTheoMatHangs.list.map((item, key) => {
                                        const selected = (this.props.loiNhuanTheoMatHangs.selectedDetail.medicine_group_id === item.medicine_group_id) ? 'row-active': '';
                                        return (
                                            <tr key={key} onClick={this._onClickRow.bind(this, item, key)} className={selected}>
                                                <td>{item.medicine_group_name}</td>
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
        loiNhuanTheoMatHangs
    }) => {
    return {
        loiNhuanTheoMatHangs
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...LoiNhuanTheoMatHangListActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchResult);
