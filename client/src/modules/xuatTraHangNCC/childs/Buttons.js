const {Translate, I18n} = ReactReduxI18n;

import * as XuatTraHangNCCListActions from 'modules/xuatTraHangNCC/actions/list';
import * as XuatTraHangNCCFormActions from 'modules/xuatTraHangNCC/actions/form';
import {formClear as formChildClear} from 'modules/xuatTraHangNCC/actions/formChild';


class Buttons extends React.Component{
        constructor(){
            super();
            this.state = {
                dateFrom: moment().add(-1, 'months'),
                dateTo: moment().add(0, 'days'),
            }
        }

        _loadList(dateFrom, dateTo){
            Helper.PageBlock(I18n.t('application.text.loading'));
            this.props.loadList(moment(dateFrom).format('YYYY-MM-DD'), moment(dateTo).format('YYYY-MM-DD'))
            .then(() => {
                
            })
        }

        _onChangeField(field, value){
            let error = '';
            switch(field){
                case 'xuat_tra_hang_ncc_code':
                {
                    if(Check.CheckEmpty(value))
                        error = 'application.validation.required';
                    else
                        error = '';
                    break;
                }
                case 'delivery_date':{
                    if(Check.CheckEmpty(value))
                        error = 'application.validation.required';
                    else if(Check.soSanhHaiNgay(this.props.xuatTraHangNCCForm.values.date_input,value) == 1)
                        error = 'Ngày trả hàng phải lớn hơn hoặc bằng ngày nhập hàng';
                    else
                        error = '';
                    break;
                }
            }
            this.props.formValidation(field, error);
        }

        _onValidationSubmit(){
            const {
                xuat_tra_hang_ncc_code,
                delivery_date,
                input_output_form_type_id
            } = this.props.xuatTraHangNCCForm.values;

            this._onChangeField('xuat_tra_hang_ncc_code', xuat_tra_hang_ncc_code);
            this._onChangeField('delivery_date', delivery_date);
            this._onChangeField('input_output_form_type_id', input_output_form_type_id);

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const errors = this.props.xuatTraHangNCCForm.errors;
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

        _onSave(){
            // Get form data parent
            const data = this.props.xuatTraHangNCCForm.values;
            // Get form data detail
            const details = this.props.xuatTraHangNCCs.listChild.list;

            switch(this.props.xuatTraHangNCCForm.mode){
                case 'add':{
                    this._onValidationSubmit()
                    .then(valid => {
                        if(valid){
                            axios.post(`${Config.API_URL}xuat-tra-hang-ncc`, {data, details})
                            .then(response => {
                                toastr.success(I18n.t('success.add.message'), I18n.t('success.add.title'));
                        setTimeout(() => {
                                     location.reload();
                                }, 1000);
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
                case 'edit': {
                    this._onValidationSubmit()
                    .then(valid => {
                        if(valid){
                            axios.put(`${Config.API_URL}xuat-tra-hang-ncc/${data.id}`, {data, details})
                            .then(response => {
                                toastr.success(I18n.t('success.update.message'), I18n.t('success.update.title'));
                        setTimeout(() => {
                                     location.reload();
                                }, 1000);
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
        }

        // Khi nhan button Them moi
        _onAdd(){
            this._setFormMode('add');
        }

        // xet 
        _setFormMode(type){
            switch(type){
                case 'add':
                    this.props.formChangeMode('add');
                    // this.refs[this.props.internalStockDeliveryForm.focus].focus();
                    break;
                case 'edit':
                    this.props.formChangeMode('edit');
                    break;
            }
            this.props.formClear(); //clear form cha
            this.props.formChildClear(); //clear form con
            this.props.clearListChild(); //clear list child
            this.props.clearSelectedDetail(); //clear detail form cha
            this.props.clearListChildSelectedDetail();
        }

        _onExit(){
            this.props.push(Routes.dashboard.view);
        }

        _onDelete(){
            let id = this.props.xuatTraHangNCCs.selectedDetail.id;
            
            if (typeof id === "undefined" || id == -1) {
                Helper.warningAlert("Vui lòng chọn hóa đơn để thao tác");
            }
            else{
            
                this.props.formDelete(id)
                .then(() => {
                    toastr.success(I18n.t('success.delete.message'), I18n.t('success.delete.title'));
                    setTimeout(() => {
                         location.reload();
                    }, 1000);
                });
            }
        }
        
        _onPrintReview(){
            let id = this.props.xuatTraHangNCCs.selectedDetail.id;
            
            if (typeof id === "undefined" || id == -1) {
                Helper.alertSelectInvoiceBeforePrint();
            }else{   
                axios.post(`${Config.API_URL}xuat-tra-hang-ncc/pdfExport`, {id}, {
                responseType: 'arraybuffer'
        		})
        		.then((response) => {
        			let downloadLink = document.createElement('a');
          			downloadLink.target   = '_blank';

          			const date = Moment(new Date()).format('YYYY.MM.DD_HH.mm.ss');
          			const fileName = `xuat_tra_hang_cho_nha_cung_cap_${date}.pdf`;
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
                <button type="button" className="btn green btn-customer-size" onClick={this._onSave.bind(this)} disabled={this.props.xuatTraHangNCCForm.disabled}>
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
        xuatTraHangNCCs,
        xuatTraHangNCCForm,
        xuatTraHangNCCFormChild
    }) => {
    return {
        xuatTraHangNCCs,
        xuatTraHangNCCForm,
        xuatTraHangNCCFormChild
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...XuatTraHangNCCListActions,
        ...XuatTraHangNCCFormActions,
        formChildClear
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Buttons);
