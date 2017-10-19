const {Translate, I18n} = ReactReduxI18n;
import * as RetailerListActions from 'modules/retailer/actions/list';

class SearchResult extends React.Component {

    constructor() {
        super();
        this.state = {
            selected: ''
        }
    }

    _onClickRow(retailer, key) {

//        this.setState({selected: 'row-active'});
    }
    componentDidMount() {
        Helper.CheckPageHeight(300);
    }

    render() {
        return (
                <div className="portlet box green">
                    <div className="portlet-title">
                        <div className="caption">
                            Danh sách thuốc
                        </div>
                    </div>
                    <div className="portlet-body">
                        <div className="table-scrollable">
                            <table className="table fixed-header table-bordered" id="search_bill_result_list">
                                <thead>
                                    <tr>
                                        <th className="col-sm-1"><span>Ngày bán</span></th>
                                        <th className="col-sm-3"><span>Tên thuốc</span></th>
                                        <th className="col-sm-1"><span>Đơn vị tính</span></th>
                                        <th className="col-sm-1"><span>Số lượng bán</span></th>
                                        <th className="col-sm-6"><span>Diễn giải</span></th>
                                    </tr>
                                </thead>
                                <tbody id="list-container">
                                    {
                                        (this.props.retailers === 'undefined' || this.props.retailers.list === 'undefined' || this.props.retailers.list.length == 0)
                                                ?
                                                (<tr>
                                                    <td colSpan="6" className='text-center'>
                                            <Translate value="application.text.noItems"/>
                                            </td>
                                            </tr>
                                                    )
                                            :
                                            (
                                                    this.props.retailers.list.map((item, key) => {
                                                        return (
                                                        <tr key={key} className={this.state.selected} onClick={this._onClickRow.bind(this, item, key)}>
                                                            <td>{Helper.formatStringToDate(item.ngay_ban)}</td>
                                                            <td>{item.medicine_name}</td>
                                                            <td>{item.dvt}</td>
                                                            <td className="text-right">{Numeral(item.so_luong_ban).format('0,0')}</td>
                                                            <td></td>
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
                retailers
                }) => {
                    return {
                        retailers
                    };
                };

                const mapDispatchToProps = (dispatch) => {
                    return Redux.bindActionCreators({
                        ...ReactRouterRedux.routerActions,
                        ...RetailerListActions
                    }, dispatch);
                };

                module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchResult);
