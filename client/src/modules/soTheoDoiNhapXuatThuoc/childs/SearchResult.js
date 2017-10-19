const {Translate, I18n} = ReactReduxI18n;
import * as SoTheoDoiNhapXuatThuocListActions from 'modules/soTheoDoiNhapXuatThuoc/actions/list';

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
                        Danh sách hóa đơn
                    </div>
                </div>
                <div className="portlet-body">
                	<div className="table-scrollable">
                		<table className="table fixed-header table-bordered" id="search_bill_result_list">
                            <thead>
                                <tr>
                                    <th><span>Ngày</span></th>
                                    <th><span>Kho</span></th>
                                    <th><span>HĐ Nhập</span></th>
                                    <th><span>HĐ Xuất</span></th>
                                    <th><span>NCC hoặc KH</span></th>
                                    <th><span>Tên thuốc</span></th>
                                    <th><span>ĐVT</span></th>
                                    <th><span>Số lô</span></th>
                                    <th><span>Hạn sử dụng</span></th>
                                    <th><span>Hãng, Nước SX</span></th>
                                    <th><span>Nhập</span></th>
                                    <th><span>Xuất</span></th>
                                    <th><span>Tồn</span></th>
                                </tr>
                            </thead>
                            <tbody id="list-container">
                        	{
                                (this.props.soTheoDoiNhapXuatThuocs === 'undefined' || this.props.soTheoDoiNhapXuatThuocs.list.items === 'undefined' || this.props.soTheoDoiNhapXuatThuocs.list.items.length == 0)
                                ?
                                (    <tr>
                                        <td colSpan="13" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                        </td>
                                    </tr>
                                )
                                :
                                (
                                    this.props.soTheoDoiNhapXuatThuocs.list.items.map((item, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{Helper.formatStringToDate(item.ngay_nhap)}</td>
                                                <td>{item.kho}</td>
                                                <td>{item.hoa_don_nhap}</td>
                                                <td>{item.hoa_don_xuat}</td>
                                                <td>{item.noi_dung}</td>
                                                <td>{item.medicine_name}</td>
                                                <td>{item.dvt}</td>
                                                <td>{item.so_lo}</td>
                                                <td>{item.hsd}</td>
                                                <td>{item.nuoc_san_xuat}</td>
                                                <td className="text-right">{Numeral(item.sl_nhap).format('0,0')}</td>
                                                <td className="text-right">{Numeral(item.sl_xuat).format('0,0')}</td>
                                                <td className="text-right">{Numeral(item.sl_ton).format('0,0')}</td>
                                            </tr>
                                        );
                                    })
                                )
                            }
                            </tbody>
                		</table>
                	</div>
                    <div className="row">
                        <div className="col-sm-6 text-right text-primary">
                            <strong>Tổng số:</strong>
                        </div>
                        <div className='col-sm-2 text-right .padding-right-30px'>
                            <strong className='padding-right-10px'>Tổng nhập: {Numeral(this.props.soTheoDoiNhapXuatThuocs.list.slNhap).format('0,0')}</strong>
                        </div>
                        <div className='col-sm-2 text-right'>
                            <strong className='padding-right-10px'>Tổng xuất: {Numeral(this.props.soTheoDoiNhapXuatThuocs.list.slXuat).format('0,0')}</strong>
                        </div>
                        <div className='col-sm-2 text-right'>
                            <strong className='padding-right-10px'>Tổng SL Tồn: {Numeral(this.props.soTheoDoiNhapXuatThuocs.list.slTon).format('0,0')}</strong>
                        </div>
                    </div>
                </div>
            </div>
            );
    };
};


const mapStateToProps = ({
        soTheoDoiNhapXuatThuocs
    }) => {
    return {
        soTheoDoiNhapXuatThuocs
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...SoTheoDoiNhapXuatThuocListActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchResult);
