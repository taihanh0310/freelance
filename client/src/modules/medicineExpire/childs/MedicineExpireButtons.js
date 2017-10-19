const {Translate, I18n} = ReactReduxI18n;
import * as MedicineExpireListActions from 'modules/medicineExpire/actions/list';
import * as MedicineExpireFormActions from 'modules/medicineExpire/actions/form';

class MedicineExpireButtons extends React.Component{
    
    _onExit(){
            this.props.push(Routes.dashboard.view);
    }

    _onPrintReview(){
            let values = this.props.medicineExpireForm.values;
            axios.post(`${Config.API_URL}medicine/thuocSapHetSoLuongTonPDFReport`, {values}, {
            responseType: 'arraybuffer'
            })
            .then((response) => {
                let downloadLink = document.createElement('a');
                downloadLink.target   = '_blank';

                const date = Moment(new Date()).format('YYYY.MM.DD_HH.mm.ss');
                const fileName = `thuoc_sap_het_so_luong_ton_${date}.pdf`;
                downloadLink.download = fileName;

                const blob = new Blob([response.data], { type: 'application/pdf' });
                var URL = window.URL || window.webkitURL;
                var downloadUrl = URL.createObjectURL(blob);

                downloadLink.href = downloadUrl;

                document.body.append(downloadLink);

                downloadLink.click();

                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(downloadUrl);
            })
            .catch((error) => {
                Helper.alertErrorAferPrint();
            });
    }

    render(){
        return (
            <div className="portlet box">
                <div className="portlet-body">
                    <div className="row">
                        <div className="col-md-8">
                            <button type="button" className="btn green btn-customer-size" onClick={this._onPrintReview.bind(this)}>
                                <Translate value="application.button.review_and_print"/>
                            </button>
                        </div>

                        <div className="col-md-3 text-center">
                        
                        </div>

                        <div className="col-md-1">
                            <button type="button" className="btn green pull-right btn-customer-size" onClick={this._onExit.bind(this)}>
                                <Translate value="application.button.exit"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

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

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(MedicineExpireButtons);