const {Translate, I18n} = ReactReduxI18n;

import * as supplierFormActions from 'modules/supplier/actions/form';
import * as supplierListActions from 'modules/supplier/actions/list';
import * as supplierDetailActions from 'modules/supplier/actions/detail';
import {loadList as supplierGroupLoadList} from 'modules/supplierGroup/actions/list';

class UnitFormView extends React.Component{
	constructor(){
		super();
		this.state = {
			confirm: false
		};
	}
	componentDidMount(){
		this._loadSupplierList();
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
		Helper.CheckPageHeight(300);
	}
	componentWillUnmount(){
		Keyboard.unbind('f4');
		Keyboard.unbind('f6');
		Keyboard.unbind('f8');
		Keyboard.unbind('up');
		Keyboard.unbind('down');
		Keyboard.unbind('esc');
	}
	_loadSupplierList(){
		Helper.PageBlock(I18n.t('application.text.loading'));
		this.props.loadList()
		.then(() => {
			if(this.props.suppliers.list.length === 1){
				this.props.selectDetail(this.props.suppliers.list[0], 0);
				this._setFormMode('add');
			}else{
				this.props.selectDetail(this.props.suppliers.list[1], 1);
			}
		})
	}
	_loadSupplierGroupList(){
		this.props.supplierGroupLoadList();
	}
	_onChangeField(field, value){
		this.props.formChange(field, value);
		let error = '';
		switch(field){
			case 'code':
				if(Check.CheckEmpty(value))
					error = 'application.validation.required';
				else
					error = '';
				break;
			case 'name':
				if(Check.CheckEmpty(value))
					error = 'application.validation.required';
				else
					error = '';
				break;
			case 'supplier_group_id':
				if(Check.CheckEmpty(value))
					error = 'application.validation.required';
				else
					error = '';
				break;
			// case 'phone':{
   //              if(!Check.CheckEmpty(value)){
   //                  if(!Check.CheckPhoneNumber(value)){
   //                      error = 'application.validation.phone';
   //                  }else{
   //                      error = '';
   //                  }
   //              }else{
   //                  error = '';
   //              }
   //              break;
   //          }
   //          case 'fax':{
   //              if(!Check.CheckEmpty(value)){
   //                  if(!Check.CheckPhoneNumber(value)){
   //                      error = 'application.validation.fax';
   //                  }else{
   //                      error = '';
   //                  }
   //              }else{
   //                  error = '';
   //              }
   //              break;
   //          }
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
            case 'website':{
                if(!Check.CheckEmpty(value)){
                    if(!Check.CheckUrl(value)){
                        error = 'application.validation.url';
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
	_onClickAdd(){
		this._setFormMode('add');
	}
	_setFormMode(type){
		switch(type){
			case 'add':
				this.props.formChangeMode('add');
				this.refs[this.props.supplierForm.focus].focus();
				this.props.formClear();
				break;
			case 'edit':
				this.props.formChangeMode('edit');
				break;
		}
	}
	_onValidationSubmit(){
		const {code, name, supplier_group_id, website, email} = this.props.supplierForm.values;
		this._onChangeField('code', code);
		this._onChangeField('name', name);
		this._onChangeField('supplier_group_id', supplier_group_id);
		this._onChangeField('website', website);
		this._onChangeField('email', email);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const errors = this.props.supplierForm.errors;
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
		switch(this.props.supplierForm.mode){
			case 'add':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.supplierForm.values);
						delete values.key;
						this.props.formAdd(values)
						.then(obj => {
                                                    
                                                        this._loadSupplierList();
//							this.props.formClear();
//							this.props.pushList(obj.data);
//							const suppliers = this.props.suppliers.list;
//							this.props.selectDetail(suppliers[suppliers.length-1], suppliers.length-1);
							this._setFormMode('edit');
//							this._scrollRow(this.props.suppliers.list.length-1, '+');
						})
					}
				})
				break;
			case 'edit':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.supplierForm.values);
						let key = values.key;
						delete values.key;
						this.props.formEdit(values)
						.then(obj => {
                                                    
                                                        this._loadSupplierList();
//							values.key = key;
//							this.props.updateList(values);
						})
					}
				})
				break;
		}
	}
	_onClickRow(supplier, key){
		this.props.formClear();
		this.props.selectDetail(supplier, key);
		this._setFormMode('edit');
	}
	_onClickDelete(){
		if(this.props.supplier.detail.id !== -1)
			this.setState({confirm: true})
	}
	_onDelete(){
		this.props.formDelete(this.props.supplier.detail.id)
		.then(() => {
                    
                        this._loadSupplierList();
//			this.props.removeList();
			this.setState({confirm: false});
			if(this.props.suppliers.list.length > 1)
				this.props.selectDetail(this.props.suppliers.list[this.props.supplier.key-1], this.props.supplier.key-1);
			else{
				this.props.selectDetail(this.props.suppliers.list[0], 0);
				this._setFormMode('add');
			}
		});
	}
	_onSearch(field, value){
		this.props.changeSearchList(field, value);
		setTimeout(() => {
			const list = Helper.GetListFilter(this.props.suppliers.listRoot, this.props.suppliers.search);
			this.props.changeList(list);
			if(list.length === 1){
				this.props.selectDetail(list[0], 0);
				this.props.formChangeMode('add');
			}else{
				this.props.selectDetail(list[1], 1);
				this._setFormMode('edit');
			}
		}, 0);
	}
	_onPreviousRow(){
		if(this.props.supplier.detail.id){
			const suppliers = this.props.suppliers.list;
			if(this.props.supplier.key > 1){
				this.props.selectDetail(suppliers[this.props.supplier.key-1], this.props.supplier.key-1);
				this._scrollIntoRow(this.props.supplier.key);
			}
				
		}
	}
	_onNextRow(){
		if(this.props.supplier.detail.id){
			if(this.props.supplier.key < this.props.suppliers.list.length-1){
				this.props.selectDetail(this.props.suppliers.list[this.props.supplier.key+1], this.props.supplier.key+1);
				this._scrollIntoRow(this.props.supplier.key);
			}
		}
	}
	_onFirstRow(){
		if(this.props.supplier.key !== 0){
			this.props.selectDetail(this.props.suppliers.list[1], 1);
			this._scrollRow(1, '-');
		}
	}
	_onLastRow(){
		if(this.props.supplier.key !== this.props.suppliers.list.length-1){
			this.props.selectDetail(this.props.suppliers.list[this.props.suppliers.list.length-1], this.props.suppliers.list.length-1);
			this._scrollRow(this.props.suppliers.list.length-1, '+');
		}
	}
	_scrollIntoRow(key, asterisk){
		Helper.ScrollPerRow(`#row-${key}`, '#list-container', key);
	}
	_scrollRow(key, asterisk){
		Helper.ScrollRow(`#row-${key}`, '#list-container', asterisk);
	}
	_onExit(){
		this.props.push(Routes.dashboard.view);
	}
  	render(){
  		return (
			<div className="page-content-inner">
				<ConfirmModal
  					modal={this.state.confirm}
  					message={I18n.t('application.text.confirmDelete')}
  					onAccept={() => this._onDelete()}
  					onRequestClose={()=>this.setState({confirm: false})}/>
				<div className="row">
					<div className="col-md-12">
						<div className="portlet box green">
			  				<div className="portlet-title">
			  					<div className="caption">
			  						<Translate value="supplier.title"/>
			  					</div>
			  				</div>
			  				<div className="portlet-body">
			  					<div className="form-horizontal">
			  						<div className="form-body">
			  							<div className="row">
			  								<div className="col-md-12">
							  					<div className="form-group">
													<label className="control-label col-md-2">
														<Translate value="supplier.search.name"/>
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
			  									<th className='col-md-1'><Translate value="supplier.field.code"/></th>
			  									<th className='col-md-5'><Translate value="supplier.field.name"/></th>
			  									<th className='col-md-6'><Translate value="supplier.field.address"/></th>
			  								</tr>
			  							</thead>
			  							<tbody id="list-container">
			  								{
			  									this.props.suppliers.list.map((supplier, key) => {
			  										if(supplier.id !== -1){
				  										if(supplier.sorted || typeof supplier.sorted === 'undefined'){
					  										return (
					  											<tr key={key} className={this.props.supplier.detail.id === supplier.id ? 'row-active': ''}
					  												id={`row-${key}`}
					  												onClick={this._onClickRow.bind(this, supplier, key)}>
					  												<td>{supplier.code}</td>
					  												<td>{supplier.name}</td>
					  												<td>{supplier.address}</td>
					  											</tr>
					  										);
					  									}
					  								}else{
					  									if(this.props.suppliers.list.length === 1){
					  										return (
					  											<tr key={key}>
					  												<td colSpan="3" className="text-center">
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
									<li><a onClick={this._onFirstRow.bind(this)}><i className="fa fa-angle-double-left"/></a></li>
									<li><a onClick={this._onPreviousRow.bind(this)}><i className="fa fa-angle-left"/></a></li>
									<li><a>{this.props.supplier.key} / {this.props.suppliers.list.length-1}</a></li>
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
			  									<div className={this.props.supplierForm.errors.code?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="supplier.field.code"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control" ref="code"
			  												value={this.props.supplierForm.values.code}
			  												onChange={event => this._onChangeField('code', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.supplierForm.errors.code ? 'block': 'none'}}>
			  												<Translate value={this.props.supplierForm.errors.code}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className={this.props.supplierForm.errors.name?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="supplier.field.name"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control"
			  												value={this.props.supplierForm.values.name}
			  												onChange={event => this._onChangeField('name', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.supplierForm.errors.name ? 'block': 'none'}}>
			  												<Translate value={this.props.supplierForm.errors.name}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className={this.props.supplierForm.errors.supplier_group_id?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="supplier.field.supplier_group_id"/>
			  										</label>
			  										<div className="col-md-8">
			  											<select className="form-control" onChange={event => this._onChangeField('supplier_group_id', event.target.value)}
			  												value={this.props.supplierForm.values.supplier_group_id}>
			  												{
			  													this.props.supplierGroups.listRoot.map((supplierGroup, key) => {
			  														return (
			  															<option key={key} value={supplierGroup.id}>{supplierGroup.name}</option>
			  														);
			  													})
			  												}
			  											</select>
			  											<span className="help-block" style={{display: this.props.supplierForm.errors.supplier_group_id ? 'block': 'none'}}>
			  												<Translate value={this.props.supplierForm.errors.supplier_group_id}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  							</div>

			  							<div className="row">
			  								<div className="col-md-4">
			  									<div className={this.props.supplierForm.errors.address?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="supplier.field.address"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control"
			  												value={this.props.supplierForm.values.address}
			  												onChange={event => this._onChangeField('address', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.supplierForm.errors.address ? 'block': 'none'}}>
			  												<Translate value={this.props.supplierForm.errors.address}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>

			  								<div className="col-md-4">
			  									<div className={this.props.supplierForm.errors.phone?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="supplier.field.phone"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control"
			  												value={this.props.supplierForm.values.phone}
			  												onChange={event => this._onChangeField('phone', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.supplierForm.errors.phone ? 'block': 'none'}}>
			  												<Translate value={this.props.supplierForm.errors.phone}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>			  								
			  								<div className="col-md-4">
			  									<div className={this.props.supplierForm.errors.fax?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="supplier.field.fax"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control"
			  												value={this.props.supplierForm.values.fax}
			  												onChange={event => this._onChangeField('fax', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.supplierForm.errors.fax ? 'block': 'none'}}>
			  												<Translate value={this.props.supplierForm.errors.fax}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  							</div>

			  							<div className="row">
			  								<div className="col-md-4">
			  									<div className={this.props.supplierForm.errors.email?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="supplier.field.email"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control"
			  												value={this.props.supplierForm.values.email}
			  												onChange={event => this._onChangeField('email', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.supplierForm.errors.email ? 'block': 'none'}}>
			  												<Translate value={this.props.supplierForm.errors.email}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>

			  								<div className="col-md-4">
			  									<div className={this.props.supplierForm.errors.website?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="supplier.field.website"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control"
			  												value={this.props.supplierForm.values.website}
			  												onChange={event => this._onChangeField('website', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.supplierForm.errors.website ? 'block': 'none'}}>
			  												<Translate value={this.props.supplierForm.errors.website}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>

			  								<div className="col-md-4">
			  									<div className={this.props.supplierForm.errors.tax_code?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="supplier.field.tax_code"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="number" className="form-control"
			  												value={this.props.supplierForm.values.tax_code}
			  												onChange={event => this._onChangeField('tax_code', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.supplierForm.errors.tax_code ? 'block': 'none'}}>
			  												<Translate value={this.props.supplierForm.errors.tax_code}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  							</div>

			  							<div className="row">
			  								<div className="col-md-4">
			  									<div className={this.props.supplierForm.errors.peole_contact?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="supplier.field.peole_contact"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control"
			  												value={this.props.supplierForm.values.peole_contact}
			  												onChange={event => this._onChangeField('peole_contact', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.supplierForm.errors.peole_contact ? 'block': 'none'}}>
			  												<Translate value={this.props.supplierForm.errors.peole_contact}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>

			  								<div className="col-md-4">
			  									<div className={this.props.supplierForm.errors.description?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="supplier.field.description"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control"
			  												value={this.props.supplierForm.values.description}
			  												onChange={event => this._onChangeField('description', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.supplierForm.errors.description ? 'block': 'none'}}>
			  												<Translate value={this.props.supplierForm.errors.description}/>
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
					  											<input type="checkbox" checked={parseInt(this.props.supplierForm.values.is_customer)?true:false} id="is_customer"
					  												onChange={event => {
					  													const value = this.props.supplierForm.values.is_customer === 0 ? 1: 0;
					  													this.props.formChange('is_customer', value);
					  												}}/>
					  											<label htmlFor="is_customer"><Translate value="supplier.field.is_customer"/></label>
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
  	};
};

const mapStateToProps = ({supplierForm, suppliers, supplier, supplierGroups}) => {
	return {
		supplierForm, suppliers, supplier, supplierGroups
	};
};

const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		...supplierFormActions,
		...supplierListActions,
		...supplierDetailActions,
		supplierGroupLoadList
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(UnitFormView);