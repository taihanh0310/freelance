const {Translate, I18n} = ReactReduxI18n;
import * as BaoCaoNhapHangListActions from 'modules/baoCao/baoCaoNhapHang/actions/list';

class SearchResult extends React.Component{
    
    constructor(){
        super();
    }
    
    _onClickRow(baoCaoNhapHang, key){
//        this.props.chooseSelectedDetail(baoCaoNhapHang);
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
                                    <th><span>Ngày nhập</span></th>
                                    <th><span>Số hóa đơn</span></th>
                                    <th><span>Tên thuốc - vật tư</span></th>
                                    <th><span>Nhà SX</span></th>
                                    <th><span>Số lô</span></th>
                                    <th><span>Hạn dùng</span></th>
                                    <th><span>ĐVT</span></th>
                                    <th><span>Đơn giá</span></th>
                                    <th><span>Số lượng</span></th>
                                    <th><span>Thành tiền</span></th>
                                    <th><span>Nhà cung cấp</span></th>
                                </tr>
                            </thead>
                            <tbody id="list-container">
                        	{
                                (this.props.baoCaoNhapHangs === 'undefined' || this.props.baoCaoNhapHangs.list.items === 'undefined' || this.props.baoCaoNhapHangs.list.items.length == 0)
                                ?
                                (    <tr>
                                        <td colSpan="11" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                        </td>
                                    </tr>
                                )
                                :
                                (
                                    this.props.baoCaoNhapHangs.list.items.map((item, key) => {
                                        const selected = '';
                                        return (
                                            <tr key={key} className={selected} onClick={this._onClickRow.bind(this, item, key)}>
                                                <td>{Helper.formatStringToDate(item.ngay_nhap)}</td>
                                                <td>{item.so_hoa_don}</td>
                                                <td>{item.medicine_name}</td>
                                                <td>{item.nsx}</td>
                                                <td>{item.so_lo}</td>
                                                <td>{Helper.formatStringToDate(item.han_dung)}</td>
                                                <td>{item.dvt}</td>
                                                <td className="text-right">{Numeral(item.don_gia).format('0,0')}</td>
                                                <td className="text-right">{Numeral(item.so_luong).format('0,0')}</td>
                                                <td className="text-right">{Numeral(item.thanh_tien).format('0,0')}</td>
                                                <td>{item.ncc}</td>
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
                            <strong>Tổng tiền trước thuế: {Numeral(this.props.baoCaoNhapHangs.list.totalBeforeVAT).format('0,0')}  -  Tổng tiền sau thuế: {Numeral(this.props.baoCaoNhapHangs.list.totalPrice).format('0,0')}</strong>
                            </div>
                        </div>
                </div>
            </div>
            );
    };
};


const mapStateToProps = ({
        baoCaoNhapHangs
    }) => {
    return {
        baoCaoNhapHangs
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...BaoCaoNhapHangListActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchResult);
