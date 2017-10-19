const {Translate, I18n} = ReactReduxI18n;

import AlertMessages from 'modules/phieuChi/childs/AlertMessages';
import PhieuChiButtons from 'modules/phieuChi/childs/PhieuChiButtons';
import PhieuChiParentForm from 'modules/phieuChi/childs/PhieuChiParentForm';
import PhieuChiSearchConditions from 'modules/phieuChi/childs/PhieuChiSearchConditions';
import PhieuChiSearchResult from 'modules/phieuChi/childs/PhieuChiSearchResult';

class PhieuChiFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Phiếu chi tiền
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <PhieuChiSearchConditions/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <PhieuChiSearchResult/>
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
                                        <PhieuChiParentForm/>
                                    </div>
                                </div>
                                <PhieuChiButtons/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
module.exports = PhieuChiFormView;
