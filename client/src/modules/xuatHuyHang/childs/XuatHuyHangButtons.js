const {Translate, I18n} = ReactReduxI18n;

import * as XuatHuyHangListActions from 'modules/xuatHuyHang/actions/list';
import * as XuatHuyHangFormActions from 'modules/xuatHuyHang/actions/form';
import {formClear as formChildClear} from 'modules/xuatHuyHang/actions/formChild';


class XuatHuyHangButtons extends React.Component{
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
                case 'code':
                case 'delivery_date':
                case 'from_drug_store_id':
                case 'input_output_form_type_id':
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
                delivery_date,
                from_drug_store_id,
                input_output_form_type_id
            } = this.props.xuatHuyHangForm.values;

            this._onChangeField('code', code);
            this._onChangeField('delivery_date', delivery_date);
            this._onChangeField('from_drug_store_id', from_drug_store_id);
            this._onChangeField('input_output_form_type_id', input_output_form_type_id);

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const errors = this.props.xuatHuyHangForm.errors;
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
            const data = this.props.xuatHuyHangForm.values;
            // Get form data detail
            const details = this.props.xuatHuyHangs.listChild.list;

            switch(this.props.xuatHuyHangForm.mode){
                case 'add':{
                    this._onValidationSubmit()
                    .then(valid => {
                        if(valid){
                            axios.post(`${Config.API_URL}xuat-huy-hang`, {data, details})
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
                            axios.put(`${Config.API_URL}xuat-huy-hang/${data.id}`, {data, details})
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
            
            this.props.formDelete(this.props.xuatHuyHangs.selectedDetail.id)
            .then(() => {
                toastr.success(I18n.t('success.delete.message'), I18n.t('success.delete.title'));
                setTimeout(() => {
                    location.reload();
                }, 1000);
            });
        }

        _onPrintReview(){
            let id = this.props.xuatHuyHangs.selectedDetail.id;
            
            if (typeof id === "undefined" || id == -1) {
                Helper.alertSelectInvoiceBeforePrint();
            }else{   
                axios.post(`${Config.API_URL}xuat-huy-hang/pdfExport`, {id}, {
                responseType: 'arraybuffer'
                })
                .then((response) => {
                    let downloadLink = document.createElement('a');
                    downloadLink.target   = '_blank';

                    const date = Moment(new Date()).format('YYYY.MM.DD_HH.mm.ss');
                    const fileName = `hoa_don_ban_le_theo_don_${date}.pdf`;
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
                <button type="button" className="btn green btn-customer-size" onClick={this._onSave.bind(this)}>
                    <Translate value="application.button.edit"/>
                </button>
                &nbsp;
                <button type="button" className="btn green btn-customer-size" onClick={this._onDelete.bind(this)}>
                    <Translate value="application.button.delete"/>
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
        xuatHuyHangs,
        xuatHuyHangForm,
        xuatHuyHangFormChild
    }) => {
    return {
        xuatHuyHangs,
        xuatHuyHangForm,
        xuatHuyHangFormChild
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...XuatHuyHangListActions,
        ...XuatHuyHangFormActions,
        formChildClear
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(XuatHuyHangButtons);
