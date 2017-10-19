const {Translate, I18n} = ReactReduxI18n;

import * as pharmacyWarehouseFormActions from 'modules/pharmacyWarehouse/actions/form';
import * as pharmacyWarehouseListActions from 'modules/pharmacyWarehouse/actions/list';
import * as pharmacyWarehouseDetailActions from 'modules/pharmacyWarehouse/actions/detail';
import {loadWareHouseKepperList as loadWareHouseKepperList} from 'modules/user/actions/list';

class CustomerFormView extends React.Component {
    constructor() {
        super();
        this.state = {
            confirm: false
        };
    }
    componentDidMount() {
        this._loadpharmacyWarehouseList();
        this._loadAll();
        
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
    _loadpharmacyWarehouseList() {
        Helper.PageBlock(I18n.t('application.text.loading'));
        this.props.loadList()
                .then(() => {
                    if (this.props.pharmacyWarehouses.list.length === 1) {
                        this.props.selectDetail(this.props.pharmacyWarehouses.list[0], 0);
                        this._setFormMode('add');
                    } else {
                        this.props.selectDetail(this.props.pharmacyWarehouses.list[1], 1);
                        this._setFormMode('edit');
                    }
                })
    }
    
    _loadAll(){
        this.props.loadWareHouseKepperList();
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
            case 'warehouse_keeper_id':
                if (Check.CheckEmpty(value))
                    error = 'application.validation.required';
                else
                    error = '';
                break;
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
                this.refs[this.props.pharmacyWarehouseForm.focus].focus();
                this.props.formClear();
                break;
            case 'edit':
                this.props.formChangeMode('edit');
                break;
        }
    }
    _onValidationSubmit() {
        const {name, code, warehouse_keeper_id, email} = this.props.pharmacyWarehouseForm.values;
        this._onChangeField('code', code);
        this._onChangeField('name', name);
        this._onChangeField('warehouse_keeper_id', warehouse_keeper_id);
        this._onChangeField('email', email);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const errors = this.props.pharmacyWarehouseForm.errors;
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
        switch (this.props.pharmacyWarehouseForm.mode) {
            case 'add':
                this._onValidationSubmit()
                        .then(valid => {
                            if (valid) {
                                let values = $.extend({}, this.props.pharmacyWarehouseForm.values);
                                delete values.key;
                                this.props.formAdd(values)
                                        .then(obj => {
                                            this.props.formClear();
                                            this._loadpharmacyWarehouseList();

                                        })
                            }
                        })
                break;
            case 'edit':
                this._onValidationSubmit()
                        .then(valid => {
                            if (valid) {
                                let values = $.extend({}, this.props.pharmacyWarehouseForm.values);
                                let key = values.key;
                                delete values.key;
                                this.props.formEdit(values)
                                        .then(obj => {
                                             values.key = key;
                                                this._loadpharmacyWarehouseList();
                                        })
                            }
                        })
                break;
        }
    }
    _onClickRow(pharmacyWarehouse, key) {
        this.props.formClear();
        this.props.selectDetail(pharmacyWarehouse, key);
        this._setFormMode('edit');
    }
    _onClickDelete() {
        if (this.props.pharmacyWarehouse.detail.id !== -1)
            this.setState({confirm: true})
    }
    _onDelete() {
        this.props.formDelete(this.props.pharmacyWarehouse.detail.id)
                .then(() => {
                    // this.props.removeList();
                    this._loadpharmacyWarehouseList();
                    this.setState({confirm: false});
                    if (this.props.pharmacyWarehouses.list.length > 1)
                        this.props.selectDetail(this.props.pharmacyWarehouses.list[this.props.pharmacyWarehouse.key - 1], this.props.pharmacyWarehouse.key - 1);
                    else {
                        this.props.selectDetail(this.props.pharmacyWarehouses.list[0], 0);
                        this._setFormMode('add');
                    }
                });
    }
    _onSearch(field, value) {
        this.props.changeSearchList(field, value);
        setTimeout(() => {
            const list = Helper.GetListFilter(this.props.pharmacyWarehouses.listRoot, this.props.pharmacyWarehouses.search);
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
        if (this.props.pharmacyWarehouse.detail.id) {
            const pharmacyWarehouses = this.props.pharmacyWarehouses.list;
            if (this.props.pharmacyWarehouse.key > 1) {
                this.props.selectDetail(pharmacyWarehouses[this.props.pharmacyWarehouse.key - 1], this.props.pharmacyWarehouse.key - 1);
                this._scrollIntoRow(this.props.pharmacyWarehouse.key);
            }

        }
    }
    _onNextRow() {
        if (this.props.pharmacyWarehouse.detail.id) {
            if (this.props.pharmacyWarehouse.key < this.props.pharmacyWarehouses.list.length - 1) {
                this.props.selectDetail(this.props.pharmacyWarehouses.list[this.props.pharmacyWarehouse.key + 1], this.props.pharmacyWarehouse.key + 1);
                this._scrollIntoRow(this.props.pharmacyWarehouse.key);
            }
        }
    }
    _onFirstRow() {
        if (this.props.pharmacyWarehouse.key !== 0) {
            this.props.selectDetail(this.props.pharmacyWarehouses.list[1], 1);
            this._scrollRow(1, '-');
        }
    }
    _onLastRow() {
        if (this.props.pharmacyWarehouse.key !== this.props.pharmacyWarehouses.list.length - 1) {
            this.props.selectDetail(this.props.pharmacyWarehouses.list[this.props.pharmacyWarehouses.list.length - 1], this.props.pharmacyWarehouses.list.length - 1);
            this._scrollRow(this.props.pharmacyWarehouses.list.length - 1, '+');
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
                                        <Translate value="pharmacyWarehouse.title"/>
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <div className="form-horizontal">
                                        <div className="form-body">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label className="control-label col-md-2">
                                                            <Translate value="pharmacyWarehouse.field.name"/>
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
                                                    <th><Translate value="pharmacyWarehouse.field.code"/></th>
                                            <th><Translate value="pharmacyWarehouse.field.name"/></th>
                                            <th><Translate value="pharmacyWarehouse.field.warehouse_keeper_id"/></th>
                                            <th><Translate value="pharmacyWarehouse.field.address"/></th>
                                            </tr>
                                            </thead>
                                            <tbody id="list-container">
                                                {
                                                        this.props.pharmacyWarehouses.list.map((pharmacyWarehouse, key) => {
                                                            if (pharmacyWarehouse.id !== -1) {


                                                                if (pharmacyWarehouse.sorted || typeof pharmacyWarehouse.sorted === 'undefined') {

                                                                        return (
                                                        <tr key={key} className={this.props.pharmacyWarehouse.detail.id === pharmacyWarehouse.id ? 'row-active' : ''}
                                                            id={`row-${key}`}
                                                            onClick={this._onClickRow.bind(this, pharmacyWarehouse, key)}>
                                                            <td className='col-sm-1 text-left'>{pharmacyWarehouse.code}</td>
                                                            <td className='col-sm-3 text-left'>{pharmacyWarehouse.name}</td>
                                                            <td className='col-sm-3 text-left'>{pharmacyWarehouse.warehouse_keeper.fullname}</td>
                                                            <td className='col-sm-5 text-left'>{pharmacyWarehouse.address}</td>
                                                        </tr>
                                                                                );
                                                }
                                                }else{
                                                                        if (this.props.pharmacyWarehouses.list.length === 1) {
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
                                        <li><a>{this.props.pharmacyWarehouse.key} / {this.props.pharmacyWarehouses.list.length - 1}</a></li>
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
                                                    <div className={this.props.pharmacyWarehouseForm.errors.code ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-3">
                                                            <Translate value="pharmacyWarehouse.field.code"/>
                                                        </label>
                                                        <div className="col-md-9">
                                                            <input type="text" className="form-control" ref="code"
                                                                   value={this.props.pharmacyWarehouseForm.values.code}
                                                                   onChange={event => this._onChangeField('code', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.pharmacyWarehouseForm.errors.code ? 'block' : 'none'}}>
                                                                <Translate value={this.props.pharmacyWarehouseForm.errors.code}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                
                                                <div className="col-md-4">
                                                    <div className={this.props.pharmacyWarehouseForm.errors.name ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-3">
                                                            <Translate value="pharmacyWarehouse.field.name"/>
                                                        </label>
                                                        <div className="col-md-9">
                                                            <input type="text" className="form-control" ref='name'
                                                                   value={this.props.pharmacyWarehouseForm.values.name}
                                                                   onChange={event => this._onChangeField('name', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.pharmacyWarehouseForm.errors.name ? 'block' : 'none'}}>
                                                                <Translate value={this.props.pharmacyWarehouseForm.errors.name}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.props.pharmacyWarehouseForm.errors.address ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-3">
                                                            <Translate value="pharmacyWarehouse.field.address"/>
                                                        </label>
                                                        <div className="col-md-9">
                                                            <input type="text" className="form-control"
                                                                   value={this.props.pharmacyWarehouseForm.values.address}
                                                                   onChange={event => this._onChangeField('address', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.pharmacyWarehouseForm.errors.address ? 'block' : 'none'}}>
                                                                <Translate value={this.props.pharmacyWarehouseForm.errors.address}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                
                                                <div className="col-md-4">
                                                    <div className={this.props.pharmacyWarehouseForm.errors.phone_number ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-3">
                                                            <Translate value="pharmacyWarehouse.field.phone_number"/>
                                                        </label>
                                                        <div className="col-md-9">
                                                            <input type="text" className="form-control"
                                                                   value={this.props.pharmacyWarehouseForm.values.phone_number}
                                                                   onChange={event => this._onChangeField('phone_number', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.pharmacyWarehouseForm.errors.phone_number ? 'block' : 'none'}}>
                                                                <Translate value={this.props.pharmacyWarehouseForm.errors.phone_number}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className={this.props.pharmacyWarehouseForm.errors.fax_number ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-3">
                                                            <Translate value="pharmacyWarehouse.field.fax_number"/>
                                                        </label>
                                                        <div className="col-md-9">
                                                            <input type="text" className="form-control"
                                                                   value={this.props.pharmacyWarehouseForm.values.fax_number}
                                                                   onChange={event => this._onChangeField('fax_number', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.pharmacyWarehouseForm.errors.fax_number ? 'block' : 'none'}}>
                                                                <Translate value={this.props.pharmacyWarehouseForm.errors.fax_number}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            <div className="col-md-4">
                                                    <div className={this.props.pharmacyWarehouseForm.errors.email ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-3">
                                                            <Translate value="pharmacyWarehouse.field.email"/>
                                                        </label>
                                                        <div className="col-md-9">
                                                            <input type="text" className="form-control"
                                                                   value={this.props.pharmacyWarehouseForm.values.email}
                                                                   onChange={event => this._onChangeField('email', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.pharmacyWarehouseForm.errors.email ? 'block' : 'none'}}>
                                                                <Translate value={this.props.pharmacyWarehouseForm.errors.email}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                
                                            </div>
                                            <div className="row">
                                            <div className="col-md-4">
                                                    <div className={this.props.pharmacyWarehouseForm.errors.warehouse_keeper_id ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-3">
                                                            <Translate value="pharmacyWarehouse.field.warehouse_keeper_id"/>
                                                        </label>
                                                        <div className="col-md-9">
                                                            <select className="form-control" onChange={event => this._onChangeField('warehouse_keeper_id', event.target.value)}
                                                                    value={this.props.pharmacyWarehouseForm.values.warehouse_keeper_id}>
                                                                    {
                                                                            this.props.users.listRoot.map((user, key) => {
                                                                                    return (
                                                                                            <option key={key} value={user.id}>{user.fullname}</option>
                                                                                    );
                                                                            })
                                                                    }
                                                            </select>
                                                            <span className="help-block" style={{display: this.props.pharmacyWarehouseForm.errors.warehouse_keeper_id ? 'block' : 'none'}}>
                                                                <Translate value={this.props.pharmacyWarehouseForm.errors.warehouse_keeper_id}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                
                
                                                <div className="col-md-4">
                                                    <div className={this.props.pharmacyWarehouseForm.errors.description ? 'form-group has-error' : 'form-group'}>
                                                        <label className="control-label col-md-3">
                                                            <Translate value="pharmacyWarehouse.field.description"/>
                                                        </label>
                                                        <div className="col-md-9">
                                                            <input type="text" className="form-control"
                                                                   value={this.props.pharmacyWarehouseForm.values.description}
                                                                   onChange={event => this._onChangeField('description', event.target.value)}/>
                                                            <span className="help-block" style={{display: this.props.pharmacyWarehouseForm.errors.description ? 'block' : 'none'}}>
                                                                <Translate value={this.props.pharmacyWarehouseForm.errors.description}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                                        <div className="col-md-4">
                                                    <div className="control-label col-md-3">
                                                        &nbsp;
                                                    </div>
                                                    <div className="col-md-9">
                                                        <div className="form-group">
                                                            <div className="checkbox-list">
                                                                <div className="checkbox-inline">
                                                                    <input type="checkbox" checked={parseInt(this.props.pharmacyWarehouseForm.values.is_main_pharmacies_warehouse) ? true : false} id="is_pharmacyWarehouse"
                                                                           onChange={event => {
                                                                                    const value = this.props.pharmacyWarehouseForm.values.is_main_pharmacies_warehouse === 0 ? 1 : 0;
                                                                                    this.props.formChange('is_main_pharmacies_warehouse', value);
                                                                }}/>
                                                                    <label htmlFor="is_pharmacyWarehouse"><Translate value="pharmacyWarehouse.field.is_main_pharmacies_warehouse"/></label>
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

                                    const mapStateToProps = ({pharmacyWarehouseForm, pharmacyWarehouses, pharmacyWarehouse, users}) => {
                                        return {
                                            pharmacyWarehouseForm, pharmacyWarehouses, pharmacyWarehouse, users
                                        };
                                    };

                                    const mapDispatchToProps = (dispatch) => {
                                        return Redux.bindActionCreators({
                                            ...ReactRouterRedux.routerActions,
                                            ...pharmacyWarehouseFormActions,
                                            ...pharmacyWarehouseListActions,
                                            ...pharmacyWarehouseDetailActions,
                                            loadWareHouseKepperList
                                        }, dispatch);
                                    };

                                    module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CustomerFormView);