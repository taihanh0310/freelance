const {Translate, I18n} = ReactReduxI18n;
import * as BaoCaoDoanhSoBanHangListAction from 'modules/baoCao/baoCaoDoanhSoBanHang/actions/list';

class SearchResult extends React.Component{
    
    constructor(){
        super();
    }
    
    _onClickRow(baoCaoDoanhSoBanHang, key){
//        this.props.chooseSelectedDetail(baoCaoDoanhSoBanHang);
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
                                    <th className='col-sm-1'><span>Hóa đơn</span></th>
                                    <th className='col-sm-1'><span>Ngày lập</span></th>
                                    <th className='col-sm-2'><span>Khách hàng</span></th>
                                    <th className='col-sm-3'><span>Địa chỉ</span></th>
                                    <th className='col-sm-1'><span>Thành tiền</span></th>
                                    <th className='col-sm-4'><span>Diễn giải</span></th>
                                </tr>
                            </thead>
                            <tbody id="list-container">
                        	{
                                (this.props.baoCaoDoanhSoBanHangs === 'undefined' || this.props.baoCaoDoanhSoBanHangs.list.items === 'undefined' || this.props.baoCaoDoanhSoBanHangs.list.items.length == 0)
                                ?
                                (    <tr>
                                        <td colSpan="6" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                        </td>
                                    </tr>
                                )
                                :
                                (
                                    this.props.baoCaoDoanhSoBanHangs.list.items.map((item, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{item.hoa_don}</td>
                                                <td>{Helper.formatStringToDate(item.ngay_ban)}</td>
                                                <td>{item.ten_khach_hang}</td>
                                                <td>{item.dia_chi}</td>
                                                <td className="text-right">{Numeral(item.tong_tien).format('0,0')}</td>
                                                <td>{item.dien_giai}</td>
                                            </tr>
                                        );
                                    })
                                )
                            }
                            </tbody>
                		</table>
                	</div>
                        <div className="row">
                            <div className="col-sm-12 text-center text-primary">
                            <strong>Tổng tiền: {Numeral(this.props.baoCaoDoanhSoBanHangs.list.totalPriceSearch).format('0,0')}</strong>
                            </div>
                        </div>
                </div>
            </div>
            );
    };
};


const mapStateToProps = ({
        baoCaoDoanhSoBanHangs
    }) => {
    return {
        baoCaoDoanhSoBanHangs
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...BaoCaoDoanhSoBanHangListAction
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchResult);
