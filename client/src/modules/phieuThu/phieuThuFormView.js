const {Translate, I18n} = ReactReduxI18n;

import AlertMessages from 'modules/phieuThu/childs/AlertMessages';
import PhieuThuButtons from 'modules/phieuThu/childs/PhieuThuButtons';
import PhieuThuParentForm from 'modules/phieuThu/childs/PhieuThuParentForm';
import PhieuThuSearchConditions from 'modules/phieuThu/childs/PhieuThuSearchConditions';
import PhieuThuSearchResult from 'modules/phieuThu/childs/PhieuThuSearchResult';

class PhieuThuFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Phiếu thu tiền
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <PhieuThuSearchConditions/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <PhieuThuSearchResult/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <br></br>
                                        <AlertMessages/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <PhieuThuParentForm/>
                                    </div>
                                </div>
                                <PhieuThuButtons/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
module.exports = PhieuThuFormView;
