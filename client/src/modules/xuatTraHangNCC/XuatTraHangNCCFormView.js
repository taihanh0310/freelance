const {Translate, I18n} = ReactReduxI18n;
import ParentSearchResult from 'modules/xuatTraHangNCC/childs/ParentSearchResult';
import ParentForm from 'modules/xuatTraHangNCC/childs/ParentForm';
import Buttons from 'modules/xuatTraHangNCC/childs/Buttons';

class XuatTraHangNCCFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Xuất trả hàng cho nhà cung cấp
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
module.exports = XuatTraHangNCCFormView;