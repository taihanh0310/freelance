const {Translate, I18n} = ReactReduxI18n;

import * as SoTheoDoiNhapXuatThuocListActions from 'modules/soTheoDoiNhapXuatThuoc/actions/list';

class Buttons extends React.Component{
    
    constructor(){
        super();
    }
    
    _onPrintReview(){
        let values = $.extend({}, this.props.soTheoDoiNhapXuatThuocs.search);
              
        axios.post(`${Config.API_URL}so-theo-doi-xuat-nhap-thuoc/pdfExport`, {values}, {
        responseType: 'arraybuffer'
        })
        .then((response) => {
            let downloadLink = document.createElement('a');
            downloadLink.target   = '_blank';

            const date = Moment(new Date()).format('YYYY.MM.DD_HH.mm.ss');
            const fileName = `so_theo_doi_xuat_nhap_${date}.pdf`;
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
};

const mapStateToProps = ({
        soTheoDoiNhapXuatThuocs
    }) => {
    return {
        soTheoDoiNhapXuatThuocs
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...SoTheoDoiNhapXuatThuocListActions,
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Buttons);
