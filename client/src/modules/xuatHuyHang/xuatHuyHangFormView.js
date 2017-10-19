const {Translate, I18n} = ReactReduxI18n;
import MedicineBarcodeForm from 'modules/xuatHuyHang/childs/MedicineBarcodeForm';
import XuatHuyHangParentSearchResult from 'modules/xuatHuyHang/childs/XuatHuyHangParentSearchResult';
import XuatHuyHangParentForm from 'modules/xuatHuyHang/childs/XuatHuyHangParentForm';
import XuatHuyHangButtons from 'modules/xuatHuyHang/childs/XuatHuyHangButtons';

class XuatHuyHangFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Xuất hủy hàng
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <MedicineBarcodeForm/>
                                        <XuatHuyHangParentSearchResult/>
                                    </div>
                                    <div className="col-sm-9">
                                        <XuatHuyHangParentForm/>
                                    </div>
                                </div>
                                <XuatHuyHangButtons/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
module.exports = XuatHuyHangFormView;