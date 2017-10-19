const {Translate, I18n} = ReactReduxI18n;
import MedicineBarcodeForm from 'modules/prescriptionRetail/childs/MedicineBarcodeForm';
import PrescriptionRetailParentSearchResult from 'modules/prescriptionRetail/childs/PrescriptionRetailParentSearchResult';
import PrescriptionRetailParentForm from 'modules/prescriptionRetail/childs/PrescriptionRetailParentForm';
import PrescriptionRetailButtons from 'modules/prescriptionRetail/childs/PrescriptionRetailButtons';

class PrescriptionRetailFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Xuất bán lẻ - không theo đơn
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <MedicineBarcodeForm/>
                                        <PrescriptionRetailParentSearchResult/>
                                    </div>
                                    <div className="col-sm-9">
                                        <PrescriptionRetailParentForm/>
                                    </div>
                                </div>
                                <PrescriptionRetailButtons/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
module.exports = PrescriptionRetailFormView;