const {Translate, I18n} = ReactReduxI18n;

import * as inputOutputTypeFormActions from 'modules/inputOutputTypeForm/actions/form';
import * as inputOutputTypeFormListActions from 'modules/inputOutputTypeForm/actions/list';
import * as inputOutputTypeFormDetailActions from 'modules/inputOutputTypeForm/actions/detail';

class InputOutputTypeFormView extends React.Component{
	constructor(){
		super();
		this.state = {
			confirm: false
		};
	}
	componentDidMount(){
		this._loadInputOutputTypeList();
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
	_loadInputOutputTypeList(){
		Helper.PageBlock(I18n.t('application.text.loading'));
		this.props.loadInputFormList()
		.then(() => {
			if(this.props.inputOutputTypeForms.list.length === 1){
				this.props.selectDetail(this.props.inputOutputTypeForms.list[0], 0);
				this._setFormMode('add');
			}else{
				this.props.selectDetail(this.props.inputOutputTypeForms.list[1], 1);
				this._setFormMode('edit');
			}
		})
	}
	// change click event
	_onChangeInputType(){
		Helper.PageBlock(I18n.t('application.text.loading'));
		this.props.loadInputFormList()
		.then(() => {
			if(this.props.inputOutputTypeForms.list.length === 1){
				this.props.selectDetail(this.props.inputOutputTypeForms.list[0], 0);
				this._setFormMode('add');
			}else{
				this.props.selectDetail(this.props.inputOutputTypeForms.list[1], 1);
				this._setFormMode('edit');
			}
            this.props.formChange('type', 1);
		})
	}

	_onChangeOutputType(){
		Helper.PageBlock(I18n.t('application.text.loading'));
		this.props.loadOutputFormList()
		.then(() => {
			if(this.props.inputOutputTypeForms.list.length === 1){
				this.props.selectDetail(this.props.inputOutputTypeForms.list[0], 0);
				this._setFormMode('add');
			}else{
				this.props.selectDetail(this.props.inputOutputTypeForms.list[1], 1);
				this._setFormMode('edit');
			}
                        // set change tupe
            this.props.formChange('type', 0);            
            
		})
	}

	// end click tab change

	_onChangeField(field, value){
		this.props.formChange(field, value);
		let error = '';
		switch(field){
			case 'name':
				if(Check.CheckEmpty(value))
					error = 'application.validation.required';
				else
					error = '';
				break;
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
				this.refs[this.props.inputOutputTypeFormForm.focus].focus();
				this.props.formClear();
				break;
			case 'edit':
				this.props.formChangeMode('edit');
				break;
		}
	}
	_onValidationSubmit(){
		const {code, name} = this.props.inputOutputTypeFormForm.values;
		this._onChangeField('name', name);
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const errors = this.props.inputOutputTypeFormForm.errors;
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
		switch(this.props.inputOutputTypeFormForm.mode){
			case 'add':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.inputOutputTypeFormForm.values);
						delete values.key;
						this.props.formAdd(values)
						.then(obj => {
							this.props.formClear();
							this.props.pushList(obj.data);
							const inputOutputTypeForms = this.props.inputOutputTypeForms.list;
							this.props.selectDetail(inputOutputTypeForms[inputOutputTypeForms.length-1], inputOutputTypeForms.length-1);
							this._setFormMode('edit');
							this._scrollRow(this.props.inputOutputTypeForms.list.length-1, '+');
						})
					}
				})
				break;
			case 'edit':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.inputOutputTypeFormForm.values);
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
	_onClickRow(inputOutputTypeForm, key){
		this.props.formClear();
		this.props.selectDetail(inputOutputTypeForm, key);
		this._setFormMode('edit');
	}
	_onClickDelete(){
		if(this.props.inputOutputTypeForm.detail.id !== -1)
			this.setState({confirm: true})
	}
	_onDelete(){
		this.props.formDelete(this.props.inputOutputTypeForm.detail.id)
		.then(() => {
			this.props.removeList();
			this.setState({confirm: false});
			if(this.props.inputOutputTypeForms.list.length > 1)
				this.props.selectDetail(this.props.inputOutputTypeForms.list[this.props.inputOutputTypeForm.key-1], this.props.inputOutputTypeForm.key-1);
			else{
				this.props.selectDetail(this.props.inputOutputTypeForms.list[0], 0);
				this._setFormMode('add');
			}
		});
	}
	_onSearch(field, value){
		this.props.changeSearchList(field, value);
		setTimeout(() => {
			const list = Helper.GetListFilter(this.props.inputOutputTypeForms.listRoot, this.props.inputOutputTypeForms.search);
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
		if(this.props.inputOutputTypeForm.detail.id){
			const inputOutputTypeForms = this.props.inputOutputTypeForms.list;
			if(this.props.inputOutputTypeForm.key > 1){
				this.props.selectDetail(inputOutputTypeForms[this.props.inputOutputTypeForm.key-1], this.props.inputOutputTypeForm.key-1);
				this._scrollIntoRow(this.props.inputOutputTypeForm.key);
			}
				
		}
	}
	_onNextRow(){
		if(this.props.inputOutputTypeForm.detail.id){
			if(this.props.inputOutputTypeForm.key < this.props.inputOutputTypeForms.list.length-1){
				this.props.selectDetail(this.props.inputOutputTypeForms.list[this.props.inputOutputTypeForm.key+1], this.props.inputOutputTypeForm.key+1);
				this._scrollIntoRow(this.props.inputOutputTypeForm.key);
			}
		}
	}
	_onFirstRow(){
		if(this.props.inputOutputTypeForm.key !== 0){
			this.props.selectDetail(this.props.inputOutputTypeForms.list[1], 1);
			this._scrollRow(1, '-');
		}
	}
	_onLastRow(){
		if(this.props.inputOutputTypeForm.key !== this.props.inputOutputTypeForms.list.length-1){
			this.props.selectDetail(this.props.inputOutputTypeForms.list[this.props.inputOutputTypeForms.list.length-1], this.props.inputOutputTypeForms.list.length-1);
			this._scrollRow(this.props.inputOutputTypeForms.list.length-1, '+');
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
				<div className="tabbable-custom nav-justified">
					<ul className="nav nav-tabs nav-justified">
						<li className="active">
	                        <a href="#tab11" data-toggle="tab" aria-expanded="true" onClick={event => this._onChangeInputType()}>
	                        	<Translate value="inputOutputTypeFormTrans.inputTabTitle"/>
	                        </a>
	                    </li>
	                    <li>
	                        <a href="#tab13" data-toggle="tab" onClick={event => this._onChangeOutputType()}>
	                        	<Translate value="inputOutputTypeFormTrans.outputTabTitle"/>
	                        </a>
	                    </li>
					</ul>
					<div className="tab-content">
	                    <div className="tab-pane active" id="tab11">
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
						  						<Translate value="inputOutputTypeFormTrans.title"/>
						  					</div>
						  				</div>
						  				<div className="portlet-body">
						  					<div className="form-horizontal">
						  						<div className="form-body">
						  							<div className="row">
						  								<div className="col-md-12">
										  					<div className="form-group">
																<label className="control-label col-md-2">
																	<Translate value="inputOutputTypeFormTrans.searchName"/>
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
						  									<th className="col-sm-4"><Translate value="inputOutputTypeFormTrans.field.inputNameTitle"/></th>
						  									<th className="col-sm-8"><Translate value="inputOutputTypeFormTrans.field.description"/></th>
						  								</tr>
						  							</thead>
						  							<tbody id="list-container">
						  								{
						  									this.props.inputOutputTypeForms.list.map((inputOutputTypeForm, key) => {
						  										if(inputOutputTypeForm.id !== -1){
							  										if(inputOutputTypeForm.sorted || typeof inputOutputTypeForm.sorted === 'undefined'){
								  										return (
								  											<tr key={key} className={this.props.inputOutputTypeForm.detail.id === inputOutputTypeForm.id ? 'row-active': ''}
								  												id={`row-${key}`}
								  												onClick={this._onClickRow.bind(this, inputOutputTypeForm, key)}>
								  												<td>{inputOutputTypeForm.name}</td>
								  												<td>{inputOutputTypeForm.description}</td>
								  											</tr>
								  										);
								  									}
								  								}else{
								  									if(this.props.inputOutputTypeForms.list.length === 1){
								  										return (
								  											<tr key={key}>
								  												<td colSpan="2" className="text-center">
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
												<li><a>{this.props.inputOutputTypeForm.key} / {this.props.inputOutputTypeForms.list.length-1}</a></li>
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
						  								<div className="col-md-6">
						  									<div className={this.props.inputOutputTypeFormForm.errors.name?'form-group has-error':'form-group'}>
						  										<label className="control-label col-md-3">
						  											<Translate value="inputOutputTypeFormTrans.field.inputNameTitle"/>
						  										</label>
						  										<div className="col-md-9">
						  											<input type="text" className="form-control" ref="name"
						  												value={this.props.inputOutputTypeFormForm.values.name}
						  												onChange={event => this._onChangeField('name', event.target.value)}/>
						  											<span className="help-block" style={{display: this.props.inputOutputTypeFormForm.errors.name ? 'block': 'none'}}>
						  												<Translate value={this.props.inputOutputTypeFormForm.errors.name}/>
						  											</span>
						  										</div>
						  									</div>
						  								</div>

						  								<div className="col-md-6">
						  									<div className={this.props.inputOutputTypeFormForm.errors.description?'form-group has-error':'form-group'}>
						  										<label className="control-label col-md-3">
						  											<Translate value="inputOutputTypeFormTrans.field.description"/>
						  										</label>
						  										<div className="col-md-9">
						  											<input type="text" className="form-control"
						  												value={this.props.inputOutputTypeFormForm.values.description}
						  												onChange={event => this._onChangeField('description', event.target.value)}/>
						  											<span className="help-block" style={{display: this.props.inputOutputTypeFormForm.errors.description ? 'block': 'none'}}>
						  												<Translate value={this.props.inputOutputTypeFormForm.errors.description}/>
						  											</span>
						  										</div>
						  									</div>
                                                                                                                        <input type="hidden" className="form-control" ref="type" id="type" value={this.props.inputOutputTypeFormForm.values.type}/>
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
	                    <div className="tab-pane" id="tab13">
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
						  						<Translate value="inputOutputTypeFormTrans.title"/>
						  					</div>
						  				</div>
						  				<div className="portlet-body">
						  					<div className="form-horizontal">
						  						<div className="form-body">
						  							<div className="row">
						  								<div className="col-md-12">
										  					<div className="form-group">
																<label className="control-label col-md-2">
																	<Translate value="inputOutputTypeFormTrans.searchName"/>
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
						  									<th className="col-sm-4"><Translate value="inputOutputTypeFormTrans.field.outputNameTitle"/></th>
						  									<th className="col-sm-8"><Translate value="inputOutputTypeFormTrans.field.description"/></th>
						  								</tr>
						  							</thead>
						  							<tbody id="list-container">
						  								{
						  									this.props.inputOutputTypeForms.list.map((inputOutputTypeForm, key) => {
						  										if(inputOutputTypeForm.id !== -1){
							  										if(inputOutputTypeForm.sorted || typeof inputOutputTypeForm.sorted === 'undefined'){
								  										return (
								  											<tr key={key} className={this.props.inputOutputTypeForm.detail.id === inputOutputTypeForm.id ? 'row-active': ''}
								  												id={`row-${key}`}
								  												onClick={this._onClickRow.bind(this, inputOutputTypeForm, key)}>
								  												<td>{inputOutputTypeForm.name}</td>
								  												<td>{inputOutputTypeForm.description}</td>
								  											</tr>
								  										);
								  									}
								  								}else{
								  									if(this.props.inputOutputTypeForms.list.length === 1){
								  										return (
								  											<tr key={key}>
								  												<td colSpan="2" className="text-center">
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
												<li><a>{this.props.inputOutputTypeForm.key} / {this.props.inputOutputTypeForms.list.length-1}</a></li>
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
						  								<div className="col-md-6">
						  									<div className={this.props.inputOutputTypeFormForm.errors.name?'form-group has-error':'form-group'}>
						  										<label className="control-label col-md-3">
						  											<Translate value="inputOutputTypeFormTrans.field.outputNameTitle"/>
						  										</label>
						  										<div className="col-md-9">
						  											<input type="text" className="form-control" ref="name"
						  												value={this.props.inputOutputTypeFormForm.values.name}
						  												onChange={event => this._onChangeField('name', event.target.value)}/>
						  											<span className="help-block" style={{display: this.props.inputOutputTypeFormForm.errors.name ? 'block': 'none'}}>
						  												<Translate value={this.props.inputOutputTypeFormForm.errors.name}/>
						  											</span>
						  										</div>
						  									</div>
						  								</div>

						  								<div className="col-md-6">
						  									<div className={this.props.inputOutputTypeFormForm.errors.description?'form-group has-error':'form-group'}>
						  										<label className="control-label col-md-3">
						  											<Translate value="inputOutputTypeFormTrans.field.description"/>
						  										</label>
						  										<div className="col-md-9">
						  											<input type="text" className="form-control"
						  												value={this.props.inputOutputTypeFormForm.values.description}
						  												onChange={event => this._onChangeField('description', event.target.value)}/>
						  											<span className="help-block" style={{display: this.props.inputOutputTypeFormForm.errors.description ? 'block': 'none'}}>
						  												<Translate value={this.props.inputOutputTypeFormForm.errors.description}/>
						  											</span>
						  										</div>
						  									</div>
                                                                                                                        <input type="hidden" className="form-control" ref="type" id="type" value={this.props.inputOutputTypeFormForm.values.type}/>
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
	                </div>
                </div>
  			</div>
  		);
  	};
};

const mapStateToProps = ({inputOutputTypeFormForm, inputOutputTypeForms, inputOutputTypeForm}) => {
	return {
		inputOutputTypeFormForm, inputOutputTypeForms, inputOutputTypeForm
	};
};

const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		...inputOutputTypeFormActions,
		...inputOutputTypeFormListActions,
		...inputOutputTypeFormDetailActions
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(InputOutputTypeFormView);