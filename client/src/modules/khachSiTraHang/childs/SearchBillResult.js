const {Translate, I18n} = ReactReduxI18n;
import * as KhachSiTraHangListActions from 'modules/khachSiTraHang/actions/list';
import Datepicker from 'common/components/Datepicker';

class SearchBillResult extends React.Component {

    _onClickRow(item, key) {
        Helper.PageBlock(I18n.t('application.text.loading'));
        this.props.onClickSearchResultBill(item.code);
    }

    render() {
        return (
                <div className="portlet box green">
                    <div className="portlet-title">
                        <div className="caption">
                            Kết quả tìm kiếm
                        </div>
                    </div>
                    <div className="portlet-body form">
                        <div className="form-body">
                            <div className="table-scrollable">
                                <table className="table fixed-header table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="col-sm-2">Ngày bán</th>
                                            <th className="col-sm-2">Số hóa đơn</th>
                                            <th className="col-sm-6">Tên sản phẩm</th>
                                            <th className="col-sm-2">Số lô</th>
                                        </tr>
                                    </thead>
                                    <tbody id="list-container">
                                        {
                                            (this.props.khachSiTraHangs.searchResult === 'undefined' || this.props.khachSiTraHangs.searchResult.list === 'undefined' || this.props.khachSiTraHangs.searchResult.list.length == 0)
                                                    ?
                                                    (<tr>
                                                        <td colSpan="4" className='text-center'>
                                                <Translate value="application.text.noItems"/>
                                                </td>
                                                </tr>
                                                        )
                                                :
                                                (
                                                        this.props.khachSiTraHangs.searchResult.list.map((item, key) => {
                                                            const selected = (this.props.khachSiTraHangs.selectedDetail.code === item.code) ? 'row-active' : '';
                                                            return (
                                                        <tr key={key} className={selected} onClick={this._onClickRow.bind(this, item, key)}>
                                                            <td>{Helper.formatStringToDate(item.ngay_ban)}</td>
                                                            <td>{item.code}</td>
                                                            <td>{item.medicine_name}</td>
                                                            <td>{item.shipment_no}</td>
                                                        </tr>
                                                                    )
                                    })
                                    )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                                    )
                    }
                }

                const mapStateToProps = ({
                khachSiTraHangs
                }) => {
                    return {
                        khachSiTraHangs
                    };
                };
                const mapDispatchToProps = (dispatch) => {
                    return Redux.bindActionCreators({
                        ...ReactRouterRedux.routerActions,
                        ...KhachSiTraHangListActions
                    }, dispatch);
                };
                module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchBillResult);