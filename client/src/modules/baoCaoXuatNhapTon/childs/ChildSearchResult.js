const {Translate, I18n} = ReactReduxI18n;
import * as BaoCaoXuatNhapTonListActions from 'modules/baoCaoXuatNhapTon/actions/list';

class ChildSearchResult extends React.Component {
    
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
                                        <th><span>Số hóa đơn</span></th>
                                        <th><span>Ngày lập</span></th>
                                        <th><span>Hình thức</span></th>
                                        <th className="col-sm-4"><span>Ghi Chú</span></th>
                                        <th className="col-sm-2"><span>Số tiền</span></th>
                                    </tr>
                                </thead>
                                <tbody id="list-container">
                                    {
                                        (this.props.baoCaoXuatNhapTons === 'undefined' || this.props.baoCaoXuatNhapTons.listChild === 'undefined' || this.props.baoCaoXuatNhapTons.listChild.list.length == 0)
                                                ?
                                                (<tr>
                                                    <td colSpan="5" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                            </td>
                                            </tr>
                                                    )
                                            :
                                            (
                                                    this.props.baoCaoXuatNhapTons.listChild.list.map((item, key) => {
                                                        return (
                                                        <tr key={key}>
                                                            <td>{item.so_hoa_don}</td>
                                                            <td>{Helper.formatStringToDate(item.ngay_ban)}</td>
                                                            <td>{item.hinh_thuc}</td>
                                                            <td>{item.ghi_chu}</td>
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
                ;

                const mapStateToProps = ({
                    
                    baoCaoXuatNhapTons
                }) => {
                    return {
                        baoCaoXuatNhapTons
                    };
                };

                const mapDispatchToProps = (dispatch) => {
                    return Redux.bindActionCreators({
                        ...ReactRouterRedux.routerActions,
                        ...BaoCaoXuatNhapTonListActions,
                    }, dispatch);
                };

                module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ChildSearchResult);
