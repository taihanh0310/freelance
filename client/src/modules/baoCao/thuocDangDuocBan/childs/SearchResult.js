const {Translate, I18n} = ReactReduxI18n;
import * as ThuocDangDuocBanListActions from 'modules/baoCao/thuocDangDuocBan/actions/list';

class SearchResult extends React.Component{
    
    constructor(){
        super();
    }
    
    componentDidMount(){
        Helper.CheckPageHeight(280);
    }

    render(){
        return (
            <div className="portlet box green">
            	<div className="portlet-title">
                    <div className="caption">
                        Kết quả tìm kiếm
                    </div>
                </div>
                <div className="portlet-body">
                	<div className="table-scrollable">
                		<table className="table fixed-header table-bordered" id="search_bill_result_list">
                			<thead>
                                <tr>
                                    <th className='col-sm-2'><span>Tên nhóm sản phẩm</span></th>
                                    <th className='col-sm-5'><span>Tên sản phẩm</span></th>
                                    <th className='col-sm-1'><span>ĐVT</span></th>
                                    <th className='col-sm-2'><span>Điều kiện bảo quản</span></th>
                                    <th className='col-sm-2'><span>Vị trí cất giữ</span></th>
                                </tr>
                            </thead>
                            <tbody id="list-container">
                        	{
                                (this.props.thuocDangDuocBans === 'undefined' || this.props.thuocDangDuocBans.list === 'undefined' || this.props.thuocDangDuocBans.list.length == 0)
                                ?
                                (    <tr>
                                        <td colSpan="12" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                        </td>
                                    </tr>
                                )
                                :
                                (
                                    this.props.thuocDangDuocBans.list.map((item, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{item.ten_nhom}</td>
                                                <td>{item.medicine_name}</td>
                                                <td>{item.dvt}</td>
                                                <td>{item.dkbq}</td>
                                                <td>{item.vtcg}</td>
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
        thuocDangDuocBans
    }) => {
    return {
        thuocDangDuocBans
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...ThuocDangDuocBanListActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchResult);
