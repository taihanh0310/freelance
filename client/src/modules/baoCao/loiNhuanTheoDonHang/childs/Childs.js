const {Translate, I18n} = ReactReduxI18n;


import * as LoiNhuanTheoDonHangListActions from 'modules/baoCao/loiNhuanTheoDonHang/actions/list';
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
                                        <th className="col-sm-1"><span>Số lô</span></th>
                                        <th className="col-sm-2"><span>Sản phẩm</span></th>
                                        <th className="col-sm-1"><span>ĐVT</span></th>
                                        <th className="col-sm-1"><span>SL Bán</span></th>
                                        <th className="col-sm-1"><span>Giá nhập</span></th>
                                        <th className="col-sm-1"><span>TT nhập</span></th>
                                        <th className="col-sm-1"><span>Giá bán</span></th>
                                        <th className="col-sm-1"><span>TT bán</span></th>
                                        <th className="col-sm-1"><span>SL trả</span></th>
                                        <th className="col-sm-1"><span>TT trả</span></th>
                                        <th className="col-sm-1"><span>Lợi nhuận</span></th>
                                    </tr>
                                </thead>
                                <tbody id="list-container">
                                    <tr>
                                        <td>sads</td>
                                        <td>dá</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>ds</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>ds</td>
                                        <td>dsad</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>dsa</td>
                                        <td>dsa</td>
                                        <td>ds</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>ssds</td>
                                        <td>sds</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                )
    }
}
const mapStateToProps = ({
loiNhuanTheoDonHangs
        }) => {
    return {
        loiNhuanTheoDonHangs
    };
};
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...LoiNhuanTheoDonHangListActions
    }, dispatch);
};
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Childs);