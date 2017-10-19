const {Translate, I18n} = ReactReduxI18n;

import * as drugStoreFormActions from 'modules/drugStore/actions/form';
import * as drugStoreListActions from 'modules/drugStore/actions/list';
import * as drugStoreDetailActions from 'modules/drugStore/actions/detail';

class DrugStoreView extends React.Component{
	constructor(){
		super();
		this.state = {
			confirm: false
		};
	}
	componentDidMount(){
		this._loadUnitList();
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
	componentWillUnmount(){
		Keyboard.unbind('f4');
		Keyboard.unbind('f6');
		Keyboard.unbind('f8');
		Keyboard.unbind('up');
		Keyboard.unbind('down');
		Keyboard.unbind('esc');
	}
	_loadUnitList(){
		Helper.PageBlock(I18n.t('application.text.loading'));
		this.props.loadList()
		.then(() => {
			if(this.props.drugStores.list.length === 1){
				this.props.selectDetail(this.props.drugStores.list[0], 0);
				this._setFormMode('add');
			}else{
				this.props.selectDetail(this.props.drugStores.list[1], 1);
			}
		})
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
                        case 'phone_number': {
//                                if(!Check.CheckPhoneNumber(value)){
//                                    error = 'application.validation.phone';
//                                }
//                                else{
//                                    error = '';
//                                }
                            break;
                        }
                        
                        case 'fax_number': {
//                                if(!Check.CheckPhoneNumber(value)){
//                                    error = 'application.validation.fax';
//                                }
//                                else{
//                                    error = '';
//                                }
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
				this.refs[this.props.drugStoreForm.focus].focus();
				this.props.formClear();
				break;
			case 'edit':
				this.props.formChangeMode('edit');
				break;
		}
	}
	_onValidationSubmit(){
		const {code, name, email, phone_number,fax_number} = this.props.drugStoreForm.values;
		this._onChangeField('code', code);
		this._onChangeField('name', name);
                // this._onChangeField('phone_number', phone_number);
                // this._onChangeField('fax_number', fax_number);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const errors = this.props.drugStoreForm.errors;
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
		switch(this.props.drugStoreForm.mode){
			case 'add':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.drugStoreForm.values);
						delete values.key;
						this.props.formAdd(values)
						.then(obj => {
							this.props.formClear();
                                                        //this._loadUnitList();
							this.props.pushList(obj.data);
							const drugStores = this.props.drugStores.list;
							this.props.selectDetail(drugStores[drugStores.length-1], drugStores.length-1);
							this._setFormMode('edit');
							this._scrollRow(this.props.drugStores.list.length-1, '+');
						})
					}
				})
				break;
			case 'edit':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.drugStoreForm.values);
						let key = values.key;
						delete values.key;
						this.props.formEdit(values)
						.then(obj => {
							values.key = key;
							this.props.updateList(values);
						})
					}
				})
				break;
		}
	}
	_onClickRow(drugStore, key){
		this.props.formClear();
		this.props.selectDetail(drugStore, key);
		this._setFormMode('edit');
	}
	_onClickDelete(){
		if(this.props.drugStore.detail.id !== -1)
			this.setState({confirm: true})
	}
	_onDelete(){
		this.props.formDelete(this.props.drugStore.detail.id)
		.then(() => {
			this.props.removeList();
			this.setState({confirm: false});
			if(this.props.drugStores.list.length > 1)
				this.props.selectDetail(this.props.drugStores.list[this.props.drugStore.key-1], this.props.drugStore.key-1);
			else{
				this.props.selectDetail(this.props.drugStores.list[0], 0);
				this._setFormMode('add');
			}
		});
	}
	_onSearch(field, value){
		this.props.changeSearchList(field, value);
		setTimeout(() => {
			const list = Helper.GetListFilter(this.props.drugStores.listRoot, this.props.drugStores.search);
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
		if(this.props.drugStore.detail.id){
			const drugStores = this.props.drugStores.list;
			if(this.props.drugStore.key > 1){
				this.props.selectDetail(drugStores[this.props.drugStore.key-1], this.props.drugStore.key-1);
				this._scrollIntoRow(this.props.drugStore.key);
			}
				
		}
	}
	_onNextRow(){
		if(this.props.drugStore.detail.id){
			if(this.props.drugStore.key < this.props.drugStores.list.length-1){
				this.props.selectDetail(this.props.drugStores.list[this.props.drugStore.key+1], this.props.drugStore.key+1);
				this._scrollIntoRow(this.props.drugStore.key);
			}
		}
	}
	_onFirstRow(){
		if(this.props.drugStore.key !== 0){
			this.props.selectDetail(this.props.drugStores.list[1], 1);
			this._scrollRow(1, '-');
		}
	}
	_onLastRow(){
		if(this.props.drugStore.key !== this.props.drugStores.list.length-1){
			this.props.selectDetail(this.props.drugStores.list[this.props.drugStores.list.length-1], this.props.drugStores.list.length-1);
			this._scrollRow(this.props.drugStores.list.length-1, '+');
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
			  						<Translate value="drugStore.title"/>
			  					</div>
			  				</div>
			  				<div className="portlet-body">
			  					<div className="form-horizontal">
			  						<div className="form-body">
			  							<div className="row">
			  								<div className="col-md-12">
							  					<div className="form-group">
													<label className="control-label col-md-2">
														<Translate value="drugStore.field.nameShow"/>
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
			  									<th className='col-sm-1'><Translate value="drugStore.field.code"/></th>
			  									<th className='col-sm-3'><Translate value="drugStore.field.nameShow"/></th>
                                                                                                <th className='col-sm-6'><Translate value="drugStore.field.address"/></th>
			  									<th className='col-sm-1'><Translate value="drugStore.field.phone_number"/></th>
			  									<th className='col-sm-1'><Translate value="drugStore.field.fax_number"/></th>
			  								</tr>
			  							</thead>
			  							<tbody id="list-container">
			  								{
			  									this.props.drugStores.list.map((drugStore, key) => {
			  										if(drugStore.id !== -1){
				  										if(drugStore.sorted || typeof drugStore.sorted === 'undefined'){
					  										return (
					  											<tr key={key} className={this.props.drugStore.detail.id === drugStore.id ? 'row-active': ''}
					  												id={`row-${key}`}
					  												onClick={this._onClickRow.bind(this, drugStore, key)}>
					  												<td>{drugStore.code}</td>
					  												<td>{drugStore.name}</td>
					  												<td>{drugStore.address}</td>
                                                                                                                                        <td>{drugStore.phone_number}</td>
					  												<td>{drugStore.fax_number}</td>
					  											</tr>
					  										);
					  									}
					  								}else{
					  									if(this.props.drugStores.list.length === 1){
					  										return (
					  											<tr key={key}>
					  												<td colSpan="5" className='text-center'>
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
									<li><a>{this.props.drugStore.key} / {this.props.drugStores.list.length-1}</a></li>
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
			  									<div className={this.props.drugStoreForm.errors.code?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-3">
			  											<Translate value="drugStore.field.code"/>
			  										</label>
			  										<div className="col-md-9">
			  											<input type="text" className="form-control" ref="code"
			  												value={this.props.drugStoreForm.values.code}
			  												onChange={event => this._onChangeField('code', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.drugStoreForm.errors.code ? 'block': 'none'}}>
			  												<Translate value={this.props.drugStoreForm.errors.code}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className={this.props.drugStoreForm.errors.name?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-3">
			  											<Translate value="drugStore.field.nameInput"/>
			  										</label>
			  										<div className="col-md-9">
			  											<input type="text" className="form-control"
			  												value={this.props.drugStoreForm.values.name}
			  												onChange={event => this._onChangeField('name', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.drugStoreForm.errors.name ? 'block': 'none'}}>
			  												<Translate value={this.props.drugStoreForm.errors.name}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className={this.props.drugStoreForm.errors.address?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-3">
			  											<Translate value="drugStore.field.address"/>
			  										</label>
			  										<div className="col-md-9">
			  											<input type="text" className="form-control" ref="address"
			  												value={this.props.drugStoreForm.values.address}
			  												onChange={event => this._onChangeField('address', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.drugStoreForm.errors.address ? 'block': 'none'}}>
			  												<Translate value={this.props.drugStoreForm.errors.address}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  							</div>
			  							<div className="row">
			  								<div className="col-md-4">
			  									<div className={this.props.drugStoreForm.errors.phone_number?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-3">
			  											<Translate value="drugStore.field.phone_number"/>
			  										</label>
			  										<div className="col-md-9">
			  											<input type="text" className="form-control" ref="phone_number"
			  												value={this.props.drugStoreForm.values.phone_number}
			  												onChange={event => this._onChangeField('phone_number', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.drugStoreForm.errors.phone_number ? 'block': 'none'}}>
			  												<Translate value={this.props.drugStoreForm.errors.phone_number}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className={this.props.drugStoreForm.errors.fax_number?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-3">
			  											<Translate value="drugStore.field.fax_number"/>
			  										</label>
			  										<div className="col-md-9">
			  											<input type="text" className="form-control" ref="fax_number"
			  												value={this.props.drugStoreForm.values.fax_number}
			  												onChange={event => this._onChangeField('fax_number', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.drugStoreForm.errors.fax_number ? 'block': 'none'}}>
			  												<Translate value={this.props.drugStoreForm.errors.fax_number}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
                                                                                        <div className="col-md-4">
			  									<div className={this.props.drugStoreForm.errors.description?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-3">
			  											<Translate value="drugStore.field.description"/>
			  										</label>
			  										<div className="col-md-9">
			  											<input type="text" className="form-control"
			  												value={this.props.drugStoreForm.values.description}
			  												onChange={event => this._onChangeField('description', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.drugStoreForm.errors.description ? 'block': 'none'}}>
			  												<Translate value={this.props.drugStoreForm.errors.description}/>
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
						  									<button type="button" className="btn green"
						  										onClick={this._onClickAdd.bind(this)}>
						  										<Translate value="application.button.add"/>
						  									</button>
						  									&nbsp;
						  									<button type="button" className="btn green"
						  										onClick={this._onSave.bind(this)}>
						  										<Translate value="application.button.edit"/>
						  									</button>
						  									&nbsp;
						  									<button type="button" className="btn green"
						  										onClick={this._onClickDelete.bind(this)}>
						  										<Translate value="application.button.delete"/>
						  									</button>
						  								</div>
						  								<div className="col-md-3">
						  									<button type="button" className="btn green pull-right"
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

const mapStateToProps = ({drugStoreForm, drugStores, drugStore}) => {
	return {
		drugStoreForm, drugStores, drugStore
	};
};

const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		...drugStoreFormActions,
		...drugStoreListActions,
		...drugStoreDetailActions
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DrugStoreView);