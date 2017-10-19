const {Translate, I18n} = ReactReduxI18n;
import * as MedicineExpireListActions from 'modules/phieuChi/actions/list';
import * as MedicineExpireFormActions from 'modules/medicineExpire/actions/form';

class AlertMedicineExpireMessages extends React.Component{
    render(){
        return (
            <div className="alert alert-danger">CÓ <strong>{(this.props.medicineExpires === 'undefined' || this.props.medicineExpires.list === 'undefined' || this.props.medicineExpires.list.length == 0) ? 0 : this.props.medicineExpires.list.length }</strong> SẢN PHẨM CÓ SỐ LƯỢNG TỒN TRÊN MỨC TỐI THIỂU {this.props.medicineExpireForm.values.limit_warning} SẢN PHẨM. </div>
        );
    };
}


const mapStateToProps = ({
        medicineExpires,
        medicineExpireForm
    }) => {
    return {
        medicineExpires,
        medicineExpireForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...MedicineExpireListActions,
        ...MedicineExpireFormActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(AlertMedicineExpireMessages);