const {Translate, I18n} = ReactReduxI18n;

import * as retailCustomerFormActions from 'modules/retailCustomer/actions/form';
import * as retailCustomerListActions from 'modules/retailCustomer/actions/list';
import * as retailCustomerDetailActions from 'modules/retailCustomer/actions/detail';

class RetailCustomerFormView extends React.Component {
    constructor() {
        super();
        this.state = {
            confirm: false
        };
    }
    componentDidMount() {
        this._loadRetailCustomerList();
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
        Helper.CheckPageHeight(300);
    }
    componentWillUnmount() {
        Keyboard.unbind('f4');
        Keyboard.unbind('f6');
        Keyboard.unbind('f8');
        Keyboard.unbind('up');
        Keyboard.unbind('down');
        Keyboard.unbind('esc');
    }
    _loadRetailCustomerList() {
        Helper.PageBlock(I18n.t('application.text.loading'));
        this.props.loadList()
                .then(() => {
                    if (this.props.retailCustomers.list.length === 1) {
                        this.props.selectDetail(this.props.retailCustomers.list[0], 0);
                        this._setFormMode('add');
                    } else {
                        this.props.selectDetail(this.props.retailCustomers.list[1], 1);
                        this._setFormMode('edit');
                    }
                })
    }
    _onChangeField(field, value) {
        this.props.formChange(field, value);
        let error = '';
        switch (field) {
            case 'name':
                if (Check.CheckEmpty(value))
                    error = 'application.validation.required';
                else
                    error = '';
                break;
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
                this.refs[this.props.retailCustomerForm.focus].focus();
                this.props.formClear();
                break;
            case 'edit':
                this.props.formChangeMode('edit');
                break;
        }
    }
    _onValidationSubmit() {
        const {name} = this.props.retailCustomerForm.values;
        this._onChangeField('name', name);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const errors = this.props.retailCustomerForm.errors;
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
        switch (this.props.retailCustomerForm.mode) {
            case 'add':
                this._onValidationSubmit()
                        .then(valid => {
                            if (valid) {
                                let values = $.extend({}, this.props.retailCustomerForm.values);
                                delete values.key;
                                this.props.formAdd(values)
                                        .then(obj => {
                                            this.props.formClear();
                                            this._loadRetailCustomerList();
                                        })
                            }
                        })
                break;
            case 'edit':
                this._onValidationSubmit()
                        .then(valid => {
                            if (valid) {
                                let values = $.extend({}, this.props.retailCustomerForm.values);
                                let key = values.key;
                                delete values.key;
                                this.props.formEdit(values)
                                        .then(obj => {
                                            this._loadRetailCustomerList();
                                        })
                            }
                        })
                break;
        }
    }
    _onClickRow(retailCustomer, key) {
        this.props.formClear();
        this.props.selectDetail(retailCustomer, key);
        this._setFormMode('edit');
    }
    _onClickDelete() {
        if (this.props.retailCustomer.detail.id !== -1)
            this.setState({confirm: true})
    }
    _onDelete() {
        this.props.formDelete(this.props.retailCustomer.detail.id)
                .then(() => {
//			this.props.removeList();
                    this._loadRetailCustomerList(); // reload list api
                    this.setState({confirm: false});
                    if (this.props.retailCustomers.list.length > 1)
                        this.props.selectDetail(this.props.retailCustomers.list[this.props.retailCustomer.key - 1], this.props.retailCustomer.key - 1);
                    else {
                        this.props.selectDetail(this.props.retailCustomers.list[0], 0);
                        this._setFormMode('add');
                    }
                });
    }
    _onSearch(field, value) {
        this.props.changeSearchList(field, value);
        setTimeout(() => {
            const list = Helper.GetListFilter(this.props.retailCustomers.listRoot, this.props.retailCustomers.search);
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
        if (this.props.retailCustomer.detail.id) {
            const retailCustomers = this.props.retailCustomer.list;
            if (this.props.retailCustomer.key > 1) {
                this.props.selectDetail(retailCustomers[this.props.retailCustomer.key - 1], this.props.retailCustomer.key - 1);
                this._scrollIntoRow(this.props.retailCustomer.key);
            }

        }
    }
    _onNextRow() {
        if (this.props.retailCustomer.detail.id) {
            if (this.props.retailCustomer.key < this.props.retailCustomers.list.length - 1) {
                this.props.selectDetail(this.props.retailCustomer.list[this.props.retailCustomer.key + 1], this.props.retailCustomer.key + 1);
                this._scrollIntoRow(this.props.retailCustomer.key);
            }
        }
    }
    _onFirstRow() {
        if (this.props.retailCustomer.key !== 0) {
            this.props.selectDetail(this.props.retailCustomer.list[1], 1);
            this._scrollRow(1, '-');
        }
    }
    _onLastRow() {
        if (this.props.retailCustomer.key !== this.props.retailCustomers.list.length - 1) {
            this.props.selectDetail(this.props.retailCustomer.list[this.props.retailCustomers.list.length - 1], this.props.retailCustomers.list.length - 1);
            this._scrollRow(this.props.retailCustomers.list.length - 1, '+');
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
                                        <Translate value="retailCustomer.title"/>
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <div className="form-horizontal">
                                        <div className="form-body">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label className="control-label col-md-2">
                                                            <Translate value="retailCustomer.field.name"/>
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
                                            <th><Translate value="retailCustomer.field.name"/></th>
                                            <th><Translate value="retailCustomer.field.address"/></th>
                                            <th><Translate value="retailCustomer.field.phone_number"/></th>
                                            <th><Translate value="retailCustomer.field.years_old"/></th>
                                            </tr>
                                            </thead>
                                            <tbody id="list-container">
                                                {
                                                        this.props.retailCustomers.list.map((retailCustomer, key) => {
                                                            if (retailCustomer.id !== -1) {


                                                                if (retailCustomer.sorted || typeof retailCustomer.sorted === 'undefined') {

                                                                        return (
                                                        <tr key={key} className={this.props.retailCustomer.detail.id === retailCustomer.id ? 'row-active' : ''}
                                                            id={`row-${key}`}
                                                            onClick={this._onClickRow.bind(this, retailCustomer, key)}>
                                                            <td className='col-sm-3 text-left'>{retailCustomer.name}</td>
                                                            <td className='col-sm-5 text-left'>{retailCustomer.address}</td>
                                                            <td className='col-sm-2 text-left'>{retailCustomer.phone_number}</td>
                                                            <td className='col-sm-2 text-center'>{retailCustomer.years_old}</td>
                                                        </tr>
                                                                                );
                                                }
                                                }else{
                                                                        if (this.props.retailCustomers.list.length === 1) {
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
                                        <li><a>{this.props.retailCustomer.key} / {this.props.retailCustomers.list.length - 1}</a></li>
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
                                                    <div className={this.props.retailCustomerForm.errors.name ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-4">
                                                            <Translate value="retailCustomer.field.name"/>
                                                        </label>
                                                        <div className="col-md-8">
                                                            <input type="text" className="form-control" ref='name'
                                                                   value={this.props.retailCustomerForm.values.name}
                                                                   onChange={event => this._onChangeField('name', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.retailCustomerForm.errors.name ? 'block' : 'none'}}>
                                                                <Translate value={this.props.retailCustomerForm.errors.name}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.props.retailCustomerForm.errors.years_old ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-4">
                                                            <Translate value="retailCustomer.field.years_old"/>
                                                        </label>
                                                        <div className="col-md-8">
                                                            <input type="number" min="0" className="form-control text-right"
                                                                   value={this.props.retailCustomerForm.values.years_old}
                                                                   onChange={event => this._onChangeField('years_old', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.retailCustomerForm.errors.years_old ? 'block' : 'none'}}>
                                                                <Translate value={this.props.retailCustomerForm.errors.years_old}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.props.retailCustomerForm.errors.phone_number ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-4">
                                                            <Translate value="retailCustomer.field.phone_number"/>
                                                        </label>
                                                        <div className="col-md-8">
                                                            <input type="tel" className="form-control"
                                                                   value={this.props.retailCustomerForm.values.phone_number}
                                                                   onChange={event => this._onChangeField('phone_number', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.retailCustomerForm.errors.phone_number ? 'block' : 'none'}}>
                                                                <Translate value={this.props.retailCustomerForm.errors.phone_number}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className={this.props.retailCustomerForm.errors.sex ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-4">
                                                            <Translate value="retailCustomer.field.sex"/>
                                                        </label>
                                                        <div className="col-md-8">
                                                            <select className="form-control" onChange={event => this._onChangeField('sex', event.target.value)}
                                                                    value={this.props.retailCustomerForm.values.sex}>
                                                                        <option value="-1"></option>
                                                                        <option value="1">Nam</option>
                                                                        <option value="2">Nữ</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.props.retailCustomerForm.errors.address ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-4">
                                                            <Translate value="retailCustomer.field.address"/>
                                                        </label>
                                                        <div className="col-md-8">
                                                            <input type="text" className="form-control"
                                                                   value={this.props.retailCustomerForm.values.address}
                                                                   onChange={event => this._onChangeField('address', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.retailCustomerForm.errors.address ? 'block' : 'none'}}>
                                                                <Translate value={this.props.retailCustomerForm.errors.address}/>
                                                            </span>
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

                                    const mapStateToProps = ({retailCustomerForm, retailCustomers, retailCustomer}) => {
                                        return {
                                            retailCustomerForm, retailCustomers, retailCustomer
                                        };
                                    };

                                    const mapDispatchToProps = (dispatch) => {
                                        return Redux.bindActionCreators({
                                            ...ReactRouterRedux.routerActions,
                                            ...retailCustomerFormActions,
                                            ...retailCustomerListActions,
                                            ...retailCustomerDetailActions,
                                        }, dispatch);
                                    };

                                    module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(RetailCustomerFormView);