const {Translate, I18n} = ReactReduxI18n;

import * as LoiNhuanTheoMatHangListActions from 'modules/baoCao/loiNhuanTheoMatHang/actions/list';
import SummariesReport from 'modules/baoCao/loiNhuanTheoMatHang/childs/SummariesReport';

class Buttons extends React.Component{
    
    constructor(){
        super();
    }
    
    _onPrintReview(){
        let values = $.extend({}, this.props.loiNhuanTheoMatHangs.search);
        
        if (typeof values.medicine_group_id === "undefined" || values.medicine_group_id == -1) {
            Helper.warningAlert("Vui lòng chọn nhóm thuốc!");
        } else {

            axios.post(`${Config.API_URL}bao-cao-loi-nhuan-theo-mat-hang-chi-tiet/pdfExport`, {values}, {
            responseType: 'arraybuffer'
            })
            .then((response) => {
                let downloadLink = document.createElement('a');
                downloadLink.target   = '_blank';

                const date = Moment(new Date()).format('YYYY.MM.DD_HH.mm.ss');
                const fileName = `bao_cao_loi_nhuan_theo_mat_hang_${date}.pdf`;
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
    }

    _onExcelExport(){
        let values = $.extend({}, this.props.loiNhuanTheoMatHangs.search);
        
        if (typeof values.medicine_group_id === "undefined" || values.medicine_group_id == -1) {
            Helper.warningAlert("Vui lòng chọn nhóm thuốc!");
        } else {

            axios.post(`${Config.API_URL}bao-cao-loi-nhuan-theo-mat-hang-chi-tiet/excelExport`, {values}, {
            responseType: 'arraybuffer'
            })
            .then((response) => {
                let downloadLink = document.createElement('a');
                downloadLink.target   = '_blank';

                const date = Moment(new Date()).format('YYYY.MM.DD_HH.mm.ss');
                const fileName = `bao_cao_loi_nhuan_theo_mat_hang_${date}.xlsx`;
                downloadLink.download = fileName;

                const blob = new Blob([response.data], { type: 'application/xlsx' });
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
    }

    _onExit(){
        this.props.push(Routes.dashboard.view);
    }
    
    render(){
        return (
            <div className="portlet box">
                <div className="portlet-body row">
                        <div className="col-md-3">
                            <button type="button" className="btn green btn-customer-size" onClick={this._onPrintReview.bind(this)}>
                                    <Translate value="application.button.review_and_print"/>
                            </button>
                            &nbsp;
                            <button type="button" className="btn green btn-customer-size" onClick={this._onExcelExport.bind(this)}>
                                    <Translate value="application.button.excel_output"/>
                            </button>
                        </div>

                        <SummariesReport/>

                        <div className="col-md-1">
                            <button type="button" className="btn green pull-right btn-customer-size" onClick={this._onExit.bind(this)}>
                                <Translate value="application.button.exit"/>
                            </button>
                        </div>
                </div>
            </div>
            );
    };
};

const mapStateToProps = ({
        loiNhuanTheoMatHangs
    }) => {
    return {
        loiNhuanTheoMatHangs
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...LoiNhuanTheoMatHangListActions,
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Buttons);
