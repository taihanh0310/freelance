const {Translate, I18n} = ReactReduxI18n;
import MedicineExpireButtons from 'modules/medicineExpire/childs/MedicineExpireButtons';
import MedicineExpireResults from 'modules/medicineExpire/childs/MedicineExpireResults';
import MedicineExpireSearchCondition from 'modules/medicineExpire/childs/MedicineExpireSearchCondition';
import AlertMedicineExpireMessages from 'modules/medicineExpire/childs/AlertMedicineExpireMessages';

class MedicineExpireFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Thuốc sắp đến số lượng tồn tối thiểu
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <MedicineExpireSearchCondition/>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <AlertMedicineExpireMessages/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <MedicineExpireResults/>
                                    </div>
                                </div>
                                <MedicineExpireButtons/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
module.exports = MedicineExpireFormView;