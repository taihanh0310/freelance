const {Translate, I18n} = ReactReduxI18n;

import Buttons from 'modules/soTheoDoiNhapXuatThuoc/childs/Buttons';
import SearchConditions from 'modules/soTheoDoiNhapXuatThuoc/childs/SearchConditions';
import SearchResult from 'modules/soTheoDoiNhapXuatThuoc/childs/SearchResult';

class SoTheoDoiNhapXuatThuocFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Sổ theo dõi nhập - xuất thuốc
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
module.exports = SoTheoDoiNhapXuatThuocFormView;
