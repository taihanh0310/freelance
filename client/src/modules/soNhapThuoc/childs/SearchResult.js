const {Translate, I18n} = ReactReduxI18n;
import * as SoNhapThuocListActions from 'modules/soNhapThuoc/actions/list';

class SearchResult extends React.Component{
    
    constructor(){
        super();
    }
    
    _onClickRow(soNhapThuoc, key){
//        this.props.chooseSelectedDetail(soNhapThuoc);
//        this.props.formChangeMode('edit');
    }
    
    componentDidMount(){
        Helper.CheckPageHeight(300);
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
                                    <th><span>Tên thuốc</span></th>
                                    <th><span>Số hóa đơn</span></th>
                                    <th><span>Số lô</span></th>
                                    <th><span>Hạn dùng</span></th>
                                    <th><span>Nhà cung cấp</span></th>
                                    <th><span>ĐVT</span></th>
                                    <th><span>Số lượng</span></th>
                                    <th><span>Đơn giá</span></th>
                                    <th><span>Thành tiền</span></th>
                                </tr>
                            </thead>
                            <tbody id="list-container">
                        	{
                                (this.props.soNhapThuocs === 'undefined' || this.props.soNhapThuocs.list === 'undefined' || this.props.soNhapThuocs.list.length == 0)
                                ?
                                (    <tr>
                                        <td colSpan="11" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                        </td>
                                    </tr>
                                )
                                :
                                (
                                    this.props.soNhapThuocs.list.map((item, key) => {
                                        const selected = '';
                                        return (
                                            <tr key={key} className={selected} onClick={this._onClickRow.bind(this, item, key)}>
                                                <td>{Helper.formatStringToDate(item.ngay_nhap)}</td>
                                                <td>{item.medicine_name}</td>
                                                <td>{item.so_hoa_don}</td>
                                                <td>{item.so_lo}</td>
                                                <td>{Helper.formatStringToDate(item.han_dung)}</td>
                                                <td>{item.ncc}</td>
                                                <td>{item.dvt}</td>
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
};


const mapStateToProps = ({
        soNhapThuocs
    }) => {
    return {
        soNhapThuocs
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...SoNhapThuocListActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchResult);
