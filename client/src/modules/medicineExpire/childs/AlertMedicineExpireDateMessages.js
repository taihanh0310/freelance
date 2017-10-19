const {Translate, I18n} = ReactReduxI18n;
import * as MedicineExpireListActions from 'modules/medicineExpire/actions/list';
import * as MedicineExpireFormActions from 'modules/medicineExpire/actions/form';

class AlertMedicineExpireDateMessages extends React.Component{
    render(){
        return (
            <div className="alert alert-danger">CÓ <strong>{(this.props.medicineExpires === 'undefined' || this.props.medicineExpires.list === 'undefined' || this.props.medicineExpires.list.length == 0) ? 0 : this.props.medicineExpires.list.length }</strong> SẢN PHẨM SẼ HẾT HẠN SỬ DỤNG TRONG {this.props.medicineExpireForm.values.limit_warning} NGÀY TỚI. </div>
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

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(AlertMedicineExpireDateMessages);