const {Translate, I18n} = ReactReduxI18n;

import Buttons from 'modules/baoCao/baoCaoXuatHang/childs/Buttons';
import SearchConditions from 'modules/baoCao/baoCaoXuatHang/childs/SearchConditions';
import SearchResult from 'modules/baoCao/baoCaoXuatHang/childs/SearchResult';

class BaoCaoXuatHangTongHopFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Báo cáo xuất hàng tổng hợp
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <SearchConditions/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <SearchResult/>
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
module.exports = BaoCaoXuatHangTongHopFormView;
