const {Translate, I18n} = ReactReduxI18n;
import ParentSearchResult from 'modules/khachSiTraHang/childs/ParentSearchResult';
import ParentForm from 'modules/khachSiTraHang/childs/ParentForm';
import Buttons from 'modules/khachSiTraHang/childs/Buttons';

class KhachSiTraHangFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Khách sỉ trả hàng
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <ParentSearchResult/>
                                    </div>
                                    <div className="col-sm-9">
                                        <ParentForm/>
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
module.exports = KhachSiTraHangFormView;