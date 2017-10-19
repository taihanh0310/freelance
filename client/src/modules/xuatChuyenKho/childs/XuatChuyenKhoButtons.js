import * as XuatChuyenKhoListActions from 'modules/xuatChuyenKho/actions/list';
import * as XuatChuyenKhoFormActions from 'modules/xuatChuyenKho/actions/form';
import {formClear as formChildClear} from 'modules/xuatChuyenKho/actions/formChild';
import XuatChuyenKhoModelConfirm from 'modules/xuatChuyenKho/childs/XuatChuyenKhoModelConfirm';

const {Translate, I18n} = ReactReduxI18n;

class XuatChuyenKhoButtons extends React.Component{
        constructor(){
            super();
            this.state = {
                dateFrom: moment().add(-1, 'months'),
                dateTo: moment().add(0, 'days'),
                confirm: false
            };
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
                case 'to_drug_store_id':{
                    if(Check.CheckEmpty(value) || parseInt(value) == -1)
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
                input_output_form_type_id,
                to_drug_store_id
            } = this.props.xuatChuyenKhoForm.values;

            this._onChangeField('code', code);
            this._onChangeField('delivery_date', delivery_date);
            this._onChangeField('from_drug_store_id', from_drug_store_id);
            this._onChangeField('input_output_form_type_id', input_output_form_type_id);
            this._onChangeField('to_drug_store_id', to_drug_store_id);

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const errors = this.props.xuatChuyenKhoForm.errors;
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
            const data = this.props.xuatChuyenKhoForm.values;
            // Get form data detail
            const details = this.props.xuatChuyenKhos.listChild.list;

            switch(this.props.xuatChuyenKhoForm.mode){
                case 'add':{
                    this._onValidationSubmit()
                    .then(valid => {
                        if(valid){
                            axios.post(`${Config.API_URL}internal-stock-delivery`, {data, details})
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
                            axios.put(`${Config.API_URL}internal-stock-delivery/${data.id}`, {data, details})
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
            this.props.formClear(); //clear form cha
            this.props.formChildClear(); //clear form con
            this.props.clearListChild(); //clear list child
            this.props.clearSelectedDetail(); //clear detail form cha
            this.props.clearListChildSelectedDetail();

            switch(type){
                case 'add':
                    this.props.formChangeMode('add');
                    break;
                case 'edit':
                    this.props.formChangeMode('edit');
                    break;
            }
        }

        _onExit(){
            this.props.push(Routes.dashboard.view);
        }
        
        _onDelete(){
            axios.delete(`${Config.API_URL}internal-stock-delivery/${this.props.xuatChuyenKhos.selectedDetail.id}`)
                .then(response => {
                    toastr.success(I18n.t('success.delete.message'), I18n.t('success.delete.title'));
                    setTimeout(() => {
                                    location.reload();
                                }, 1000);
                });
        }

        render(){
        return (
                    <div className="portlet box">
                        <XuatChuyenKhoModelConfirm/>
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
        xuatChuyenKhos,
        xuatChuyenKhoForm,
        xuatChuyenKhoFormChild
    }) => {
    return {
        xuatChuyenKhos,
        xuatChuyenKhoForm,
        xuatChuyenKhoFormChild
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...XuatChuyenKhoListActions,
        ...XuatChuyenKhoFormActions,
        formChildClear
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(XuatChuyenKhoButtons);
