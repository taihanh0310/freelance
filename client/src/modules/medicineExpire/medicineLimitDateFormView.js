const {Translate, I18n} = ReactReduxI18n;
import MedicineExpireDateButtons from 'modules/medicineExpire/childs/MedicineExpireDateButtons';
import MedicineExpireDateResults from 'modules/medicineExpire/childs/MedicineExpireDateResults';
import MedicineExpireDateSearchCondition from 'modules/medicineExpire/childs/MedicineExpireDateSearchCondition';
import AlertMedicineExpireDateMessages from 'modules/medicineExpire/childs/AlertMedicineExpireDateMessages';

class MedicineLimitDateFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Thuốc sắp hết hạn sử dụng
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <MedicineExpireDateSearchCondition/>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <AlertMedicineExpireDateMessages/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <MedicineExpireDateResults/>
                                    </div>
                                </div>
                                <MedicineExpireDateButtons/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
module.exports = MedicineLimitDateFormView;