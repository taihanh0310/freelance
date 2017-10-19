const {Translate, I18n} = ReactReduxI18n;

import * as PhieuChiListActions from 'modules/phieuChi/actions/list';
import * as PhieuChiFormActions from 'modules/phieuChi/actions/form';

class PhieuChiButtons extends React.Component{
    
    constructor(){
        super();
    }

    _onChangeField(field, value){
        let error = '';
        switch(field){
            case 'code':
            case 'date_input':
            case 'date_output':
            case 'supplier_id':
            case 'total_money':
            {
                if(Check.CheckEmpty(value))
                    error = 'application.validation.required';
                else
                    error = '';
                break;
            }
        }
        this.props.formValidation(field, error);
    }

    _onValidationSubmit(){
        const {
            code,
            date_input,
            date_output,
            supplier_id,
            total_money
        } = this.props.phieuChiForm.values;

        this._onChangeField('code', code);
        this._onChangeField('date_input', date_input);
        this._onChangeField('date_output', date_output);
        this._onChangeField('supplier_id', supplier_id);
        this._onChangeField('total_money', total_money);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const errors = this.props.phieuChiForm.errors;
                let valid = true;
                for(let field in errors){
                    let error = errors[field];
                    if(error){
                        valid = false;
                        break;
                    }
                }
                resolve(valid);
            }, 0);
        });
    }

    _onAdd(){
        this._setFormMode('add');
    }

    _setFormMode(type){
        switch(type){
            case 'add':
                this.props.formChangeMode('add');
                break;
            case 'edit':
                this.props.formChangeMode('edit');
                break;
        }

        this.props.formClear(); //clear form cha
        this.props.clearSelectedDetail(); //clear detail form cha
    }
    
    _onSave(){
        const values = this.props.phieuChiForm.values;
        switch(this.props.phieuChiForm.mode){
            case 'add':{
                this._onValidationSubmit()
                .then(valid => {
                    if(valid){
                        axios.post(`${Config.API_URL}phieu-thu-chi`, values)
                        .then(response => {
                            toastr.success(I18n.t('success.add.message'), I18n.t('success.add.title'));
                        })
                        .catch(error => {
                            toastr.error(I18n.t('errors.add.message'), I18n.t('errors.add.title'));
                        });
                    }
                });
                break;
            }
            case 'edit': {
                this._onValidationSubmit()
                .then(valid => {
                    if(valid){
                        axios.put(`${Config.API_URL}phieu-thu-chi/${values.id}`, values)
                        .then(response => {
                            toastr.success(I18n.t('success.update.message'), I18n.t('success.update.title'));
                        })
                        .catch(error => {
                            toastr.error(I18n.t('errors.add.message'), I18n.t('errors.add.title'), {
                                onclick: function() {
                                    resolve();
                            }});
                        });
                    }
                });
                break;
            }
        }

        location.reload();

    }
    
    _onDelete(){
        let id = this.props.phieuChis.selectedDetail.id;
        if (typeof id === "undefined" || id == -1) {
                Helper.alertSelectInvoiceBeforeDelete();
            }
        else{
            this.props.formDelete(id)
            .then(() => {
                toastr.success(I18n.t('success.delete.message'), I18n.t('success.delete.title'));
                location.reload();
            });
        }
    }
    
    _onPrintReview(){
        let id = this.props.phieuChis.selectedDetail.id;
        let type = 0;
            
        if (typeof id === "undefined" || id == -1) {
            Helper.alertSelectInvoiceBeforePrint();
        }else{   
            axios.post(`${Config.API_URL}phieu-thu-chi/pdfExportDetail`, {id,type}, {
            responseType: 'arraybuffer'
            })
            .then((response) => {
                let downloadLink = document.createElement('a');
                downloadLink.target   = '_blank';

                const date = Moment(new Date()).format('YYYY.MM.DD_HH.mm.ss');
                const fileName = `phieu_chi_chi_tiet_${date}.pdf`;
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

    _onPrintList(){
        let values = $.extend({}, this.props.phieuChis.search);
              
        axios.post(`${Config.API_URL}phieu-thu-chi/pdfListExport`, {values}, {
        responseType: 'arraybuffer'
        })
        .then((response) => {
            let downloadLink = document.createElement('a');
            downloadLink.target   = '_blank';

            const date = Moment(new Date()).format('YYYY.MM.DD_HH.mm.ss');
            const fileName = `bao_cao_thong_ke_phieu_chi_${date}.pdf`;
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

    _onPrintTongHopThuChi(){
        let values = $.extend({}, this.props.phieuChis.search);
              
        axios.post(`${Config.API_URL}phieu-thu-chi/pdfTotalExport`, {values}, {
        responseType: 'arraybuffer'
        })
        .then((response) => {
            let downloadLink = document.createElement('a');
            downloadLink.target   = '_blank';

            const date = Moment(new Date()).format('YYYY.MM.DD_HH.mm.ss');
            const fileName = `tong_hop_thu_chi_tien_mat_${date}.pdf`;
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
                            <button type="button" className="btn green btn-customer-size" onClick={this._onAdd.bind(this)}>
                                <Translate value="application.button.add"/>
                            </button>
                            &nbsp;
                            <button type="button" className="btn green btn-customer-size" onClick={this._onSave.bind(this)}>
                                <Translate value="application.button.edit"/>
                            </button>
                            &nbsp;
                            <button type="button" className="btn green btn-customer-size" onClick={this._onDelete.bind(this)}>
                                <Translate value="application.button.delete"/>
                            </button>
                            &nbsp;
                            <button type="button" className="btn green btn-customer-size" onClick={this._onPrintReview.bind(this)}>
                                <Translate value="application.button.review_and_print"/>
                            </button>
                            &nbsp;
                            <button type="button" className="btn green btn-customer-size" onClick={this._onPrintList.bind(this)}>
                                In danh sách
                            </button>
                            &nbsp;
                            <button type="button" className="btn green btn-customer-size" onClick={this._onPrintTongHopThuChi.bind(this)}>
                                In tổng hợp thu chi
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
        phieuChis,
        phieuChiForm
    }) => {
    return {
        phieuChis,
        phieuChiForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...PhieuChiListActions,
        ...PhieuChiFormActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PhieuChiButtons);
