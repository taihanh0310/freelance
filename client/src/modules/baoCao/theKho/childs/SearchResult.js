const {Translate, I18n} = ReactReduxI18n;
import * as TheKhoListActions from 'modules/baoCao/theKho/actions/list';

class SearchResult extends React.Component{
    
    constructor(){
        super();
    }
    
    _onClickRow(theKho, key){
//        this.props.chooseSelectedDetail(theKho);
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
                                    <th className='col-sm-1'><span>Ngày</span></th>
                                    <th className='col-sm-1'><span>Kho</span></th>
                                    <th className='col-sm-1'><span>HĐ Nhập</span></th>
                                    <th className='col-sm-1'><span>HĐ Xuất</span></th>
                                    <th className='col-sm-1'><span>Nội dung</span></th>
                                    <th className='col-sm-1'><span>ĐVT</span></th>
                                    <th className='col-sm-1'><span>Đơn giá</span></th>
                                    <th className='col-sm-1'><span>SL Nhập</span></th>
                                    <th className='col-sm-1'><span>TT Nhập</span></th>
                                    <th className='col-sm-1'><span>SL Xuất</span></th>
                                    <th className='col-sm-1'><span>TT Xuất</span></th>
                                    <th className='col-sm-1'><span>SL Tồn</span></th>
                                </tr>
                            </thead>
                            <tbody id="list-container">
                        	{
                                (this.props.theKhos === 'undefined' || this.props.theKhos.list.items === 'undefined' || this.props.theKhos.list.items.length == 0)
                                ?
                                (    <tr>
                                        <td colSpan="12" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                        </td>
                                    </tr>
                                )
                                :
                                (
                                    this.props.theKhos.list.items.map((item, key) => {
                                        const selected = '';
                                        return (
                                            <tr key={key} className={selected} onClick={this._onClickRow.bind(this, item, key)}>
                                                <td>{Helper.formatStringToDate(item.ngay_nhap)}</td>
                                                <td>{item.kho}</td>
                                                <td>{item.hoa_don_nhap}</td>
                                                <td>{item.hoa_don_xuat}</td>
                                                <td>{item.noi_dung}</td>
                                                <td>{item.dvt}</td>
                                                <td className="text-right">{Numeral(item.gia_nhap).format('0,0')}</td>
                                                <td className="text-right">{Numeral(item.sl_nhap).format('0,0')}</td>
                                                <td className="text-right">{Numeral(item.tien_nhap).format('0,0')}</td>
                                                <td className="text-right">{Numeral(item.sl_xuat).format('0,0')}</td>
                                                <td className="text-right">{Numeral(item.tien_xuat).format('0,0')}</td>
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
                        <div className="col-sm-7 text-right text-primary">
                            <strong>Tổng số:</strong>
                        </div>
                        <div className='col-sm-1 text-right .padding-right-30px'>
                            <strong className='padding-right-10px'>{Numeral(this.props.theKhos.list.tongNhap).format('0,0')}</strong>
                        </div>
                        <div className='col-sm-1 text-right'>
                            <strong className='padding-right-10px'>{Numeral(this.props.theKhos.list.tongTienNhap).format('0,0')}</strong>
                        </div>
                        <div className='col-sm-1 text-right'>
                            <strong className='padding-right-10px'>{Numeral(this.props.theKhos.list.tongXuat).format('0,0')}</strong>
                        </div>
                        <div className='col-sm-1 text-right'>
                            <strong className='padding-right-10px'>{Numeral(this.props.theKhos.list.tongTienXuat).format('0,0')}</strong>
                        </div>
                        <div className='col-sm-1 text-right'>
                            <strong className='padding-right-10px'>{Numeral(this.props.theKhos.list.tonConLai).format('0,0')}</strong>
                        </div>
                    </div>
                </div>
            </div>
            );
    };
};


const mapStateToProps = ({
        theKhos
    }) => {
    return {
        theKhos
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...TheKhoListActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchResult);
