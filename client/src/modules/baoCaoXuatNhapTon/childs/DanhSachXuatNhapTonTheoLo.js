const {Translate, I18n} = ReactReduxI18n;
import * as BaoCaoXuatNhapTonListActions from 'modules/baoCaoXuatNhapTon/actions/list';

class DanhSachXuatNhapTonTheoLo extends React.Component {

    constructor() {
        super();
    }
    
    componentDidMount(){
        Helper.CheckPageHeight(300);
    }

    _onClickRow(baoCaoXuatNhapTon, key) {
        Helper.PageBlock(I18n.t('application.text.loading'));
        this.props.clearListChild(); //clear list child
        this.props.chooseSelectedDetail(baoCaoXuatNhapTon);
    }

    render() {
        return (
                <div className="portlet box green">
                    <div className="portlet-title">
                        <div className="caption">
                            Danh sách thuốc xuất nhập theo lô
                        </div>
                    </div>
                    <div className="portlet-body">
                        <div className="table-scrollable">
                            <table className="table fixed-header table-bordered" id="search_bill_result_list">
                                <thead>
                                    <tr>
                                        <th><span>Tên thuốc/vật tư</span></th>
                                        <th><span>Nhóm thuốc</span></th>
                                        <th><span>Lô SX</span></th>
                                        <th><span>ĐVT</span></th>
                                        <th><span>Đơn giá</span></th>
                                        <th><span>Tồn đầu</span></th>
                                        <th><span>Tổng nhập</span></th>
                                        <th><span>Tổng xuất</span></th>
                                        <th><span>Tồn cuối</span></th>
                                        <th><span>Thành tiền</span></th>
                                    </tr>
                                </thead>
                                <tbody id="list-container">
                                {
                                        (this.props.baoCaoXuatNhapTons === 'undefined' || this.props.baoCaoXuatNhapTons.list === 'undefined' || this.props.baoCaoXuatNhapTons.list.length == 0)
                                                ?
                                                (<tr>
                                                    <td colSpan="10" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                            </td>
                                            </tr>
                                                    )
                                            :
                                            (
                                                    this.props.baoCaoXuatNhapTons.list.bao_cao.map((item, key) => {
                                                        const selected = (this.props.baoCaoXuatNhapTons.selectedDetail.medicine_id == item.medicine_id) ? 'row-active' : '';
                                                        return (
                                                        <tr key={key} onClick={this._onClickRow.bind(this, item, key)} className={selected}>
                                                            <td>{item.medicine_name}</td>
                                                            <td>{item.medicine_group_name}</td>
                                                            <td>{item.so_lo}</td>
                                                            <td>{item.DVT}</td>
                                                            <td className="text-right">{Numeral(item.don_gia).format('0,0')}</td>
                                                            <td className="text-right">{Numeral(item.ton_dau).format('0,0')}</td>
                                                            <td className="text-right">{Numeral(item.tong_nhap).format('0,0')}</td>
                                                            <td className="text-right">{Numeral(item.tong_xuat).format('0,0')}</td>
                                                            <td className="text-right">{Numeral(item.ton_cuoi).format('0,0')}</td>
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
                module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DanhSachXuatNhapTonTheoLo);
