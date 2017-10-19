const {Translate, I18n} = ReactReduxI18n;
import ParentSearchResult from 'modules/khachLeTraHang/childs/ParentSearchResult';
import ParentForm from 'modules/khachLeTraHang/childs/ParentForm';
import Buttons from 'modules/khachLeTraHang/childs/Buttons';

class KhachLeTraHangFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Khách lẻ trả hàng
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
module.exports = KhachLeTraHangFormView;