const {Translate, I18n} = ReactReduxI18n;

import * as customerFormActions from 'modules/customer/actions/form';
import * as customerListActions from 'modules/customer/actions/list';
import * as customerDetailActions from 'modules/customer/actions/detail';
import {loadList as supplierGroupLoadList} from 'modules/supplierGroup/actions/list';

class CustomerFormView extends React.Component {
    constructor() {
        super();
        this.state = {
            confirm: false
        };
    }
    componentDidMount() {
        this._loadCustomerList();
        this._loadSupplierGroupList();
        Keyboard.bind('f4', event => {
            this._onClickAdd();
        });
        Keyboard.bind('f6', event => {
            this._onSave();
        });
        Keyboard.bind('f8', event => {
            this._onClickDelete();
        });
        Keyboard.bind('up', event => {
            this._onPreviousRow();
        });
        Keyboard.bind('down', event => {
            this._onNextRow();
        });
        Keyboard.bind('esc', event => {
            this._onExit();
        });
        Helper.CheckPageHeight();
    }
    componentWillUnmount() {
        Keyboard.unbind('f4');
        Keyboard.unbind('f6');
        Keyboard.unbind('f8');
        Keyboard.unbind('up');
        Keyboard.unbind('down');
        Keyboard.unbind('esc');
    }
    _loadCustomerList() {
        Helper.PageBlock(I18n.t('application.text.loading'));
        this.props.loadList()
                .then(() => {
                    if (this.props.customers.list.length === 1) {
                        this.props.selectDetail(this.props.customers.list[0], 0);
                        this._setFormMode('add');
                    } else {
                        this.props.selectDetail(this.props.customers.list[1], 1);
                        this._setFormMode('edit');
                    }
                })
    }
    _loadSupplierGroupList() {
        this.props.supplierGroupLoadList();
    }
    _onChangeField(field, value) {
        this.props.formChange(field, value);
        let error = '';
        switch (field) {
            case 'code':
                if (Check.CheckEmpty(value))
                    error = 'application.validation.required';
                else
                    error = '';
                break;
            case 'name':
                if (Check.CheckEmpty(value))
                    error = 'application.validation.required';
                else
                    error = '';
                break;
            case 'supplier_group_id':
                if (Check.CheckEmpty(value))
                    error = 'application.validation.required';
                else
                    error = '';
                break;
            // case 'phone_number':{
            //     if(!Check.CheckEmpty(value)){
            //         if(!Check.CheckPhoneNumber(value)){
            //             error = 'application.validation.phone';
            //         }else{
            //             error = '';
            //         }
            //     }else{
            //         error = '';
            //     }
            //     break;
            // }
            // case 'fax_number':{
            //     if(!Check.CheckEmpty(value)){
            //         if(!Check.CheckPhoneNumber(value)){
            //             error = 'application.validation.fax';
            //         }else{
            //             error = '';
            //         }
            //     }else{
            //         error = '';
            //     }
            //     break;
            // }
            case 'email':{
                if(!Check.CheckEmpty(value)){
                    if(!Check.CheckEmail(value)){
                        error = 'application.validation.email';
                    }else{
                        error = '';
                    }
                }else{
                    error = '';
                }
                break;
            }
        }
        this.props.formValidation(field, error);
    }
    _onClickAdd() {
        this._setFormMode('add');
    }
    _setFormMode(type) {
        switch (type) {
            case 'add':
                this.props.formChangeMode('add');
                this.refs[this.props.customerForm.focus].focus();
                this.props.formClear();
                break;
            case 'edit':
                this.props.formChangeMode('edit');
                break;
        }
    }
    _onValidationSubmit() {
        const {name, description, supplier_group_id, email} = this.props.customerForm.values;
        this._onChangeField('name', name);
        this._onChangeField('supplier_group_id', supplier_group_id);
        this._onChangeField('email', email);
        // this._onChangeField('phone_number', phone_number);
        // this._onChangeField('fax_number', fax_number);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const errors = this.props.customerForm.errors;
                let valid = true;
                for (let field in errors) {
                    let error = errors[field];
                    if (error) {
                        valid = false;
                        break;
                    }
                }
                resolve(valid);
            }, 0);
        });
    }
    _onSave() {
        switch (this.props.customerForm.mode) {
            case 'add':
                this._onValidationSubmit()
                        .then(valid => {
                            if (valid) {
                                let values = $.extend({}, this.props.customerForm.values);
                                delete values.key;
                                this.props.formAdd(values)
                                        .then(obj => {
                                            this.props.formClear();
                                            this._loadCustomerList(); // load lai api
                                            /*this.props.pushList(obj.data);
                                             const customers = this.props.customers.list;
                                             this.props.selectDetail(customers[customers.length-1], customers.length-1);
                                             this._setFormMode('edit');
                                             this._scrollRow(this.props.customers.list.length-1, '+');*/
                                        })
                            }
                        })
                break;
            case 'edit':
                this._onValidationSubmit()
                        .then(valid => {
                            if (valid) {
                                let values = $.extend({}, this.props.customerForm.values);
                                let key = values.key;
                                delete values.key;
                                this.props.formEdit(values)
                                        .then(obj => {
                                            // values.key = key;
                                            // this.props.updateList(values);
                                            this._loadCustomerList();
                                        })
                            }
                        })
                break;
        }
    }
    _onClickRow(customer, key) {
        this.props.formClear();
        this.props.selectDetail(customer, key);
        this._setFormMode('edit');
    }
    _onClickDelete() {
        if (this.props.customer.detail.id !== -1)
            this.setState({confirm: true})
    }
    _onDelete() {
        this.props.formDelete(this.props.customer.detail.id)
                .then(() => {
//			this.props.removeList();
                    this._loadCustomerList(); // reload list api
                    this.setState({confirm: false});
                    if (this.props.customers.list.length > 1)
                        this.props.selectDetail(this.props.customers.list[this.props.customer.key - 1], this.props.customer.key - 1);
                    else {
                        this.props.selectDetail(this.props.customers.list[0], 0);
                        this._setFormMode('add');
                    }
                });
    }
    _onSearch(field, value) {
        this.props.changeSearchList(field, value);
        setTimeout(() => {
            const list = Helper.GetListFilter(this.props.customers.listRoot, this.props.customers.search);
            this.props.changeList(list);
            if (list.length === 1) {
                this.props.selectDetail(list[0], 0);
                this.props.formChangeMode('add');
            } else {
                this.props.selectDetail(list[1], 1);
                this._setFormMode('edit');
            }
        }, 0);
    }
    _onPreviousRow() {
        if (this.props.customer.detail.id) {
            const customers = this.props.customer.list;
            if (this.props.customer.key > 1) {
                this.props.selectDetail(customers[this.props.customer.key - 1], this.props.customer.key - 1);
                this._scrollIntoRow(this.props.customer.key);
            }

        }
    }
    _onNextRow() {
        if (this.props.customer.detail.id) {
            if (this.props.customer.key < this.props.customers.list.length - 1) {
                this.props.selectDetail(this.props.customer.list[this.props.customer.key + 1], this.props.customer.key + 1);
                this._scrollIntoRow(this.props.customer.key);
            }
        }
    }
    _onFirstRow() {
        if (this.props.customer.key !== 0) {
            this.props.selectDetail(this.props.customer.list[1], 1);
            this._scrollRow(1, '-');
        }
    }
    _onLastRow() {
        if (this.props.customer.key !== this.props.customers.list.length - 1) {
            this.props.selectDetail(this.props.customer.list[this.props.customers.list.length - 1], this.props.customers.list.length - 1);
            this._scrollRow(this.props.customers.list.length - 1, '+');
        }
    }
    _scrollIntoRow(key, asterisk) {
        Helper.ScrollPerRow(`#row-${key}`, '#list-container', key);
    }
    _scrollRow(key, asterisk) {
        Helper.ScrollRow(`#row-${key}`, '#list-container', asterisk);
    }
    _onExit() {
        this.props.push(Routes.dashboard.view);
    }
    render() {
        return (
                <div className="page-content-inner">
                    <ConfirmModal
                        modal={this.state.confirm}
                        message={I18n.t('application.text.confirmDelete')}
                        onAccept={() => this._onDelete()}
                        onRequestClose={() => this.setState({confirm: false})}/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="portlet box green">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <Translate value="customer.title"/>
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <div className="form-horizontal">
                                        <div className="form-body">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label className="control-label col-md-2">
                                                            <Translate value="customer.field.name"/>
                                                        </label>
                                                        <div className="col-md-10">
                                                            <input type="text" className="form-control"
                                                                   onChange={(event => this._onSearch('name', event.target.value))}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-scrollable">
                                        <table className="table fixed-header table-bordered" id="list">
                                            <thead>
                                                <tr>
                                                    <th><Translate value="customer.field.code"/></th>
                                            <th><Translate value="customer.field.name"/></th>
                                            <th><Translate value="customer.field.address"/></th>
                                            <th><Translate value="customer.field.phone_number"/></th>
                                            </tr>
                                            </thead>
                                            <tbody id="list-container">
                                                {
                                                        this.props.customers.list.map((customer, key) => {
                                                            if (customer.id !== -1) {


                                                                if (customer.sorted || typeof customer.sorted === 'undefined') {

                                                                        return (
                                                        <tr key={key} className={this.props.customer.detail.id === customer.id ? 'row-active' : ''}
                                                            id={`row-${key}`}
                                                            onClick={this._onClickRow.bind(this, customer, key)}>
                                                            <td className='col-sm-1 text-left'>{customer.code}</td>
                                                            <td className='col-sm-4 text-left'>{customer.name}</td>
                                                            <td className='col-sm-6 text-left'>{customer.address}</td>
                                                            <td className='col-sm-1 text-left'>{customer.phone_number}</td>
                                                        </tr>
                                                                                );
                                                }
                                                }else{
                                                                        if (this.props.customers.list.length === 1) {
                                                                            return (
                                                            <tr key={key}>
                                                                <td colSpan="4" className='text-center'>
                                                        <Translate value="application.text.noItems"/>
                                                        </td>
                                                        </tr>
                                                                                );
                                            }
                                            }
                                            })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                    <ul className="pagination">
                                        <li><a onClick={
                                            this._onFirstRow.bind(this)}><i className="fa fa-angle-double-left"/></a></li>
                                        <li><a onClick={this._onPreviousRow.bind(this)}><i className="fa fa-angle-left"/></a></li>
                                        <li><a>{this.props.customer.key} / {this.props.customers.list.length - 1}</a></li>
                                        <li><a onClick={this._onNextRow.bind(this)}><i className="fa fa-angle-right"/></a></li>
                                        <li><a onClick={this._onLastRow.bind(this)}><i className="fa fa-angle-double-right"/></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" id="form-content">
                        <div className="col-md-12">
                            <div className="portlet box green">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <Translate value="application.text.formTitle"/>
                                    </div>
                                </div>
                                <div className="portlet-body form">
                                    <div className="form-horizontal">
                                        <div className="form-body">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className={this.props.customerForm.errors.code ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-4">
                                                            <Translate value="customer.field.code"/>
                                                        </label>
                                                        <div className="col-md-8">
                                                            <input type="text" className="form-control" ref="code"
                                                                   value={this.props.customerForm.values.code}
                                                                   onChange={event => this._onChangeField('code', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.customerForm.errors.code ? 'block' : 'none'}}>
                                                                <Translate value={this.props.customerForm.errors.code}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                
                                                <div className="col-md-4">
                                                    <div className={this.props.customerForm.errors.name ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-4">
                                                            <Translate value="customer.field.name"/>
                                                        </label>
                                                        <div className="col-md-8">
                                                            <input type="text" className="form-control" ref='name'
                                                                   value={this.props.customerForm.values.name}
                                                                   onChange={event => this._onChangeField('name', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.customerForm.errors.name ? 'block' : 'none'}}>
                                                                <Translate value={this.props.customerForm.errors.name}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.props.customerForm.errors.address ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-4">
                                                            <Translate value="customer.field.address"/>
                                                        </label>
                                                        <div className="col-md-8">
                                                            <input type="text" className="form-control"
                                                                   value={this.props.customerForm.values.address}
                                                                   onChange={event => this._onChangeField('address', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.customerForm.errors.address ? 'block' : 'none'}}>
                                                                <Translate value={this.props.customerForm.errors.address}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className={this.props.customerForm.errors.supplier_group_id ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-4">
                                                            <Translate value="customer.field.supplier_group_id"/>
                                                        </label>
                                                        <div className="col-md-8">
                                                            <select className="form-control" onChange={event => this._onChangeField('supplier_group_id', event.target.value)}
                                                                    value={this.props.customerForm.values.supplier_group_id}>
                                                                {
                                                                                                        this.props.supplierGroups.listRoot.map((supplierGroup, key) => {
                                                            return (
                                                                                                                            <option key={key} value={supplierGroup.id}>{supplierGroup.name}</option>
                                                                    );
                                                                })
                                                                }
                                                            </select>
                                                            <span className="help-block" style={{display: this.props.customerForm.errors.supplier_group_id ? 'block' : 'none'}}>
                                                                <Translate value={this.props.customerForm.errors.supplier_group_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                
                                                <div className="col-md-4">
                                                    <div className={this.props.customerForm.errors.phone_number ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-4">
                                                            <Translate value="customer.field.phone_number"/>
                                                        </label>
                                                        <div className="col-md-8">
                                                            <input type="tel" className="form-control"
                                                                   value={this.props.customerForm.values.phone_number}
                                                                   onChange={event => this._onChangeField('phone_number', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.customerForm.errors.phone_number ? 'block' : 'none'}}>
                                                                <Translate value={this.props.customerForm.errors.phone_number}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                
                                                <div className="col-md-4">
                                                    <div className={this.props.customerForm.errors.fax_number ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-4">
                                                            <Translate value="customer.field.fax_number"/>
                                                        </label>
                                                        <div className="col-md-8">
                                                            <input type="tel" className="form-control"
                                                                   value={this.props.customerForm.values.fax_number}
                                                                   onChange={event => this._onChangeField('fax_number', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.customerForm.errors.fax_number ? 'block' : 'none'}}>
                                                                <Translate value={this.props.customerForm.errors.fax_number}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                
                                            </div>
                                            <div className="row">
                
                                                <div className="col-md-4">
                                                    <div className={this.props.customerForm.errors.tax_number ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-4">
                                                            <Translate value="customer.field.tax_number"/>
                                                        </label>
                                                        <div className="col-md-8">
                                                            <input type="number" className="form-control"
                                                                   value={this.props.customerForm.values.tax_number}
                                                                   onChange={event => this._onChangeField('tax_number', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.customerForm.errors.tax_number ? 'block' : 'none'}}>
                                                                <Translate value={this.props.customerForm.errors.tax_number}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                
                                                <div className="col-md-4">
                                                    <div className={this.props.customerForm.errors.email ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-4">
                                                            <Translate value="customer.field.email"/>
                                                        </label>
                                                        <div className="col-md-8">
                                                            <input type="email" className="form-control"
                                                                   value={this.props.customerForm.values.email}
                                                                   onChange={event => this._onChangeField('email', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.customerForm.errors.email ? 'block' : 'none'}}>
                                                                <Translate value={this.props.customerForm.errors.email}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="control-label col-md-4">
                                                        &nbsp;
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="form-group">
                                                            <div className="checkbox-list">
                                                                <div className="checkbox-inline">
                                                                    <input type="checkbox" checked={parseInt(this.props.customerForm.values.is_customer) ? true : false} id="is_customer"
                                                                           onChange={event => {
                                                                                    const value = this.props.customerForm.values.is_customer === 0 ? 1 : 0;
                                                                                    this.props.formChange('is_customer', value);
                                                                }}/>
                                                                    <label htmlFor="is_customer"><Translate value="customer.field.is_customer"/></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-actions">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <div className="col-md-9">
                                                                <button type="button" className="btn green btn-customer-size"
                                                                        onClick={this._onClickAdd.bind(this)}>
                                                                    <Translate value="application.button.add"/>
                                                                </button>
                                                                &nbsp;
                                                                <button type="button" className="btn green btn-customer-size"
                                                                        onClick={this._onSave.bind(this)}>
                                                                    <Translate value="application.button.edit"/>
                                                                </button>
                                                                &nbsp;
                                                                <button type="button" className="btn green btn-customer-size"
                                                                        onClick={this._onClickDelete.bind(this)}>
                                                                    <Translate value="application.button.delete"/>
                                                                </button>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <button type="button" className="btn green pull-right btn-customer-size"
                                                                        onClick={this._onExit.bind(this)}>
                                                                    <Translate value="application.button.exit"/>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                                                                                );
                                        }
                                        ;
                                    }
                                    ;

                                    const mapStateToProps = ({customerForm, customers, customer, supplierGroups}) => {
                                        return {
                                            customerForm, customers, customer, supplierGroups
                                        };
                                    };

                                    const mapDispatchToProps = (dispatch) => {
                                        return Redux.bindActionCreators({
                                            ...ReactRouterRedux.routerActions,
                                            ...customerFormActions,
                                            ...customerListActions,
                                            ...customerDetailActions,
                                            supplierGroupLoadList
                                        }, dispatch);
                                    };

                                    module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CustomerFormView);