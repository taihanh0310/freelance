const {Translate, I18n} = ReactReduxI18n;

import Buttons from 'modules/baoCao/loiNhuanTheoDonHang/childs/Buttons';
import SearchConditions from 'modules/baoCao/loiNhuanTheoDonHang/childs/SearchConditions';
import SearchResult from 'modules/baoCao/loiNhuanTheoDonHang/childs/SearchResult';
import Childs from 'modules/baoCao/loiNhuanTheoDonHang/childs/Childs';

class LoiNhuanTheoDonHangFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Báo cáo lợi nhuận theo đơn hàng
                                </div>
                            </div>
                            <div className="portlet-body">                                
                                <div className="row">
                                    <div className="col-sm-12">
                                        <SearchConditions/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Kết quả tìm kiếm
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <SearchResult/>
                                    </div>
                                    <div className="col-sm-9">
                                        <Childs/>
                                    </div>
                                </div>
                                <Buttons/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
module.exports = LoiNhuanTheoDonHangFormView;
