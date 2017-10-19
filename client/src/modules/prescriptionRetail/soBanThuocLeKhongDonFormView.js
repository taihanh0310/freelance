const {Translate, I18n} = ReactReduxI18n;

import Buttons from 'modules/prescriptionRetail/childs/Buttons';
import SearchConditions from 'modules/prescriptionRetail/childs/SearchConditions';
import SearchResult from 'modules/prescriptionRetail/childs/SearchResult';

class SoBanThuocLeKhongDonFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Sổ bán lẻ không theo đơn
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
module.exports = SoBanThuocLeKhongDonFormView;
