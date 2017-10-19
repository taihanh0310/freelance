const {Translate, I18n} = ReactReduxI18n;
import * as QuanLyCongNoListActions from 'modules/quanLyCongNo/actions/list';

class DanhSach extends React.Component {

    _onClickRow(item, key) {
        
        this.props.changeSearchList('supplier_id', item.supplier_id);
        Helper.PageBlock(I18n.t('application.text.loading'));
        
        setTimeout(() => {
            let values = $.extend({}, this.props.quanLyCongNos.search); // search condition
            this.props.clearListChild(); //clear list child
            this.props.chooseSelectedDetail(values);
        }, 100);
    }
    
    componentDidMount(){
        Helper.CheckPageHeight(300);
    }

    render() {

        return (
                <div className="portlet box green">
                    <div className="portlet-title">
                        <div className="caption">
                            Danh sách khách hàng/nhà cung cấp
                        </div>
                    </div>
                    <div className="portlet-body">
                        <div className="table-scrollable">
                            <table className="table fixed-header table-bordered">
                                <thead>
                                    <tr>
                                        <th>Khách hàng/nhà cung cấp</th>
                                        <th>Địa chỉ</th>
                                        <th>Dư đầu kì</th>
                                        <th>Nợ trong kì</th>
                                        <th>Có trong kì</th>
                                        <th>Dư cuối kì</th>
                                    </tr>
                                </thead>
                                <tbody id="list-container">
                                    {
                                        (this.props.quanLyCongNos === 'undefined' || this.props.quanLyCongNos.list === 'undefined' || this.props.quanLyCongNos.list.cong_no === 'undefined')
                                                ?
                                                (<tr>
                                                    <td colSpan="6" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                            </td>
                                            </tr>
                                                    )
                                            :
                                            (
                                                    this.props.quanLyCongNos.list.cong_no.map((item, key) => {
                                                        const selected = (this.props.quanLyCongNos.selectedDetail.supplier_id == item.supplier_id) ? 'row-active' : '';
                                                        return (
                                                        <tr key={key} onClick={this._onClickRow.bind(this, item, key)} className={selected}>
                                                            <td className="col-sm-3">{item.supplier_name}</td>
                                                            <td className="col-sm-5">{item.address}</td>
                                                            <td className="text-right">{Numeral(item.du_dau_ki).format('0,0')}</td>
                                                            <td className="text-right">{Numeral(item.no_trong_ki).format('0,0')}</td>
                                                            <td className="text-right">{Numeral(item.co_trong_ki).format('0,0')}</td>
                                                            <td className="text-right">{Numeral(item.du_cuoi_ki).format('0,0')}</td>
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

                module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DanhSach);