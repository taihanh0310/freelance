const {Translate, I18n} = ReactReduxI18n;
import * as BaoCaoXuatHangListActions from 'modules/baoCao/baoCaoXuatHang/actions/list';

class SearchResult extends React.Component{
    
    constructor(){
        super();
    }
    
    _onClickRow(baoCaoXuatHang, key){
//        this.props.chooseSelectedDetail(baoCaoXuatHang);
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
                                    <th className="col-sm-2"><span>Nhóm thuốc</span></th>
                                    <th className="col-sm-1"><span>STT</span></th>
                                    <th className="col-sm-3"><span>Tên thuốc</span></th>
                                    <th className="col-sm-1"><span>ĐVT</span></th>
                                    <th className="col-sm-2"><span>Đơn giá</span></th>
                                    <th className="col-sm-1"><span>Số lượng</span></th>
                                    <th className="col-sm-2"><span>Thành tiền</span></th>
                                </tr>
                            </thead>
                            <tbody id="list-container">
                        	{
                                (this.props.baoCaoXuatHangs === 'undefined' || this.props.baoCaoXuatHangs.list.items === 'undefined' || this.props.baoCaoXuatHangs.list.items.length == 0)
                                ?
                                (    <tr>
                                        <td colSpan="7" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                        </td>
                                    </tr>
                                )
                                :
                                (
                                    this.props.baoCaoXuatHangs.list.items.map((item, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{item.medicine_group_name}</td>
                                                <td className="text-right">{key + 1}</td>
                                                <td>{item.medicine_name}</td>
                                                <td>{item.dvt}</td>
                                                <td className="text-right">{Numeral(item.don_gia).format('0,0')}</td>
                                                <td className="text-right">{Numeral(item.so_luong).format('0,0')}</td>
                                                <td className="text-right">{Numeral(item.thanh_tien).format('0,0')}</td>
                                            </tr>
                                        );
                                    })
                                )
                            }
                            </tbody>
                		</table>
                	</div>
                        <div className="row">
                            <div className="col-sm-8 text-center text-primary">
                                <strong>Có {Numeral(this.props.baoCaoXuatHangs.list.count_item).format('0,0')} lượt sản phẩm được xuất hàng</strong>
                            </div>
                            <div className="col-sm-2 text-center text-primary">
                                <strong>Số lượng: {Numeral(this.props.baoCaoXuatHangs.list.totalQuanlity).format('0,0')}</strong>
                            </div>
                            <div className="col-sm-2 text-right text-primary">
                                <strong>Tổng tiền: {Numeral(this.props.baoCaoXuatHangs.list.totalPrice).format('0,0')}</strong>
                            </div>
                        </div>
                </div>
            </div>
            );
    };
};


const mapStateToProps = ({
        baoCaoXuatHangs
    }) => {
    return {
        baoCaoXuatHangs
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...BaoCaoXuatHangListActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchResult);
