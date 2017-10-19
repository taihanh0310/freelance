const {Translate, I18n} = ReactReduxI18n;
import * as HoaDonNhapXuatListActions from 'modules/hoaDonNhapXuat/actions/list';

class HoaDonNhapXuatButtons extends React.Component {
    _onPrintReview(){
        let seeDetail = this.props.hoaDonNhapXuats.selectedDetail;
        let id = this.props.hoaDonNhapXuats.selectedDetail.id;
        
        if (typeof id === "undefined" || id == -1) {
            Helper.alertSelectInvoiceBeforePrint();
        }else{
            const date = Moment(new Date()).format('YYYY.MM.DD_HH.mm.ss');
            var url = "";
            var fileName = "";
            switch (Object.keys(seeDetail).sort().pop()){
                case 'nhap': {
                     url = `${Config.API_URL}product-input/pdfExport`;
                     fileName = `phieu_nhap_kho_${date}.pdf`;
                     break;
                }
                case 'le': {
                    url = `${Config.API_URL}retailer/pdfExport`;
                    fileName = `hoa_don_ban_le_${date}.pdf`;
                    break;    
                }
                default: {
                    url = `${Config.API_URL}whole-saler/pdfExport`;
                    fileName = `hoa_don_ban_si_${date}.pdf`;
                        break;
                }
            }
            
            axios.post(url, {id}, {
                responseType: 'arraybuffer'
            })
            .then((response) => {
                let downloadLink = document.createElement('a');
                downloadLink.target   = '_blank';                
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

    _onExit(){
        this.props.push(Routes.dashboard.view);
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

                            <div className="col-md-3 text-right">

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
}

const mapStateToProps = ({
        hoaDonNhapXuats
    }) => {
    return {
        hoaDonNhapXuats
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
                ...HoaDonNhapXuatListActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(HoaDonNhapXuatButtons);