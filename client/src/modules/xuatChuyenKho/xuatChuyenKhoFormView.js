const {Translate, I18n} = ReactReduxI18n;
import XuatChuyenKhoButtons from 'modules/xuatChuyenKho/childs/XuatChuyenKhoButtons';
import XuatChuyenKhoParentForm from 'modules/xuatChuyenKho/childs/XuatChuyenKhoParentForm';
import MedicineBarcodeForm from 'modules/xuatChuyenKho/childs/MedicineBarcodeForm';
import XuatChuyenKhoParentSearchResult from 'modules/xuatChuyenKho/childs/XuatChuyenKhoParentSearchResult';

class XuatChuyenKhoFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Xuất chuyển kho
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <MedicineBarcodeForm/>
                                        <XuatChuyenKhoParentSearchResult/>
                                    </div>
                                    <div className="col-sm-9">
                                        <XuatChuyenKhoParentForm/>
                                    </div>
                                </div>
                                <XuatChuyenKhoButtons/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
module.exports = XuatChuyenKhoFormView;