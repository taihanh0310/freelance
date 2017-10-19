const {Translate, I18n} = ReactReduxI18n;
import * as HoaDonNhapXuatListActions from 'modules/hoaDonNhapXuat/actions/list';

class ChiTietHoaDon extends React.Component {
    
    componentDidMount(){
        Helper.CheckPageHeight(300);
    }

    render(){
        return (
               <div className="portlet box green">
            	<div className="portlet-title">
                    <div className="caption">
                        Chi tiết hóa đơn
                    </div>
                </div>
                <div className="portlet-body">
                	<div className="table-scrollable">
                		<table className="table fixed-header table-bordered" id="search_bill_result_list">
                			<thead>
                                <tr>
                                    <th><span>Tên sản phẩm</span></th>
                                    <th><span>Đơn vị tính</span></th>
                                    <th><span>Số lô</span></th>
                                    <th><span>Số lượng</span></th>
                                    <th><span>Đơn giá</span></th>
                                    <th><span>Thành tiền</span></th>
                                </tr>
                            </thead>
                            <tbody id="list-container">
                            {
                                (this.props.hoaDonNhapXuats === 'undefined' || this.props.hoaDonNhapXuats.listChild === 'undefined' || this.props.hoaDonNhapXuats.listChild.length == 0)
                                ?
                                (    <tr>
                                        <td colSpan="6" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                        </td>
                                    </tr>
                                )
                                :
                                (
                                    this.props.hoaDonNhapXuats.listChild.list.map((item, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{item.medicine_name}</td>
                                                <td>{item.dvt}</td>
                                                <td>{item.so_lo}</td>
                                                <td className="text-right">{Numeral(item.so_luong).format('0,0')}</td>
                                                <td className="text-right">{Numeral(item.don_gia).format('0,0')}</td>
                                                <td className="text-right">{Numeral(item.thanh_tien).format('0,0')}</td>
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
        hoaDonNhapXuats
    }) => {
    return {
        hoaDonNhapXuats
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...HoaDonNhapXuatListActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ChiTietHoaDon);