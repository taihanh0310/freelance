const {Translate, I18n} = ReactReduxI18n;


import * as LoiNhuanTheoMatHangListActions from 'modules/baoCao/loiNhuanTheoMatHang/actions/list';
class Childs extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
                <div className="portlet box green">
                    <div className="portlet-title">
                        <div className="caption">
                            Danh sách hóa đơn
                        </div>
                    </div>
                    <div className="portlet-body">
                        <div className="table-scrollable">
                            <table className="table fixed-header table-bordered">
                                <thead>
                                    <tr>
                                        <th className="col-sm-1"><span>Mã thuốc</span></th>
                                        <th className="col-sm-8"><span>Sản phẩm</span></th>
                                        <th className="col-sm-1"><span>Số lượng xuất</span></th>
                                        <th className="col-sm-2"><span>Lợi nhuận</span></th>
                                    </tr>
                                </thead>
                                <tbody id="list-container">
                                    {
                                        (this.props.loiNhuanTheoMatHangs.listChild.items === 'undefined' || this.props.loiNhuanTheoMatHangs.listChild.list.items === 'undefined' || this.props.loiNhuanTheoMatHangs.listChild.list.items.length == 0)
                                                ?
                                                (<tr>
                                                    <td className='text-center' colSpan="4">
                                            <Translate value="application.text.noItems"/>
                                            </td>
                                            </tr>
                                                    )
                                            :
                                            (
                                                    this.props.loiNhuanTheoMatHangs.listChild.list.items.map((item, key) => {
                                                        return (
                                                        <tr key={key}>
                                                            <td>{item.medicine_code}</td>
                                                            <td>{item.medicine_name}</td>
                                                            <td className="text-right">{item.so_luong}</td>
                                                            <td className="text-right">{Numeral(item.loi_nhuan).format('0,0')}</td>
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
                                    )
                    }
                }
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
                module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Childs);