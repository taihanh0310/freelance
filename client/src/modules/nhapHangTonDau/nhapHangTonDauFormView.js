const {Translate, I18n} = ReactReduxI18n;
import NhapHangTonDauParentSearchResult from 'modules/nhapHangTonDau/childs/nhapHangTonDauParentSearchResult';
import NhapHangTonDauParentForm from 'modules/nhapHangTonDau/childs/nhapHangTonDauParentForm';
import NhapHangTonDauButtons from 'modules/nhapHangTonDau/childs/nhapHangTonDauButtons';

class NhapHangTonDauFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Nhập hàng tồn đầu
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <NhapHangTonDauParentSearchResult/>
                                    </div>
                                    <div className="col-sm-9">
                                        <NhapHangTonDauParentForm/>
                                    </div>
                                </div>
                                <NhapHangTonDauButtons/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
module.exports = NhapHangTonDauFormView;