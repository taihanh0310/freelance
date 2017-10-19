const {Translate, I18n} = ReactReduxI18n;
import * as QuanLyCongNoListActions from 'modules/quanLyCongNo/actions/list';

class ChiTietHoaDon extends React.Component {
    
    componentDidMount(){
        Helper.CheckPageHeight(300);
    }
    
    render() {
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
                                        <th><span>Hóa đơn</span></th>
                                        <th><span>Ngày lập</span></th>
                                        <th><span>Diễn giải</span></th>
                                        <th className="col-sm-2"><span>Tổng tiền</span></th>
                                    </tr>
                                </thead>
                                <tbody id="list-container">
                                {
                                        (this.props.quanLyCongNos === 'undefined' || this.props.quanLyCongNos.listChild === 'undefined' || this.props.quanLyCongNos.listChild.length == 0)
                                                ?
                                                (<tr>
                                                    <td colSpan="4" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                            </td>
                                            </tr>
                                                    )
                                            :
                                            (
                                                    this.props.quanLyCongNos.listChild.list.map((item, key) => {
                                                        return (
                                                        <tr key={key}>
                                                            <td>{item.code}</td>
                                                            <td>{item.ngay_lap}</td>
                                                            <td>{item.dien_giai}</td>
                                                            <td className="text-center">{Numeral(item.tong_tien).format('0,0')}</td>
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
    }
    ;
}

const mapStateToProps = ({
quanLyCongNos
}) => {
    return {
        quanLyCongNos
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...QuanLyCongNoListActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ChiTietHoaDon);