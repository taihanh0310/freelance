const {Translate, I18n} = ReactReduxI18n;
import * as NhomThuocDangDuocBanListActions from 'modules/baoCao/nhomThuocDangDuocBan/actions/list';

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
                                    <th className='col-sm-4'><span>Tên nhóm sản phẩm</span></th>
                                    <th className='col-sm-7'><span>Diễn giải</span></th>
                                    <th className='col-sm-1'><span>Số mặt hàng</span></th>
                                </tr>
                            </thead>
                            <tbody id="list-container">
                        	{
                                (this.props.nhomThuocDangDuocBans === 'undefined' || this.props.nhomThuocDangDuocBans.list === 'undefined' || this.props.nhomThuocDangDuocBans.list.length == 0)
                                ?
                                (    <tr>
                                        <td colSpan="12" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                        </td>
                                    </tr>
                                )
                                :
                                (
                                    this.props.nhomThuocDangDuocBans.list.map((item, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{item.ten_nhom}</td>
                                                <td>{item.dien_giai}</td>
                                                <td className="text-right">{Numeral(item.so_luong).format('0,0')}</td>
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
        nhomThuocDangDuocBans
    }) => {
    return {
        nhomThuocDangDuocBans
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...NhomThuocDangDuocBanListActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchResult);
