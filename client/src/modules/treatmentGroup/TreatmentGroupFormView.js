const {Translate, I18n} = ReactReduxI18n;

import * as treatmentGroupFormActions from 'modules/treatmentGroup/actions/form';
import * as treatmentGroupListActions from 'modules/treatmentGroup/actions/list';
import * as treatmentGroupDetailActions from 'modules/treatmentGroup/actions/detail';

class UnitFormView extends React.Component{
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

		if(!this.props.popup)
			Helper.CheckPageHeight();
		else
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
	_loadUnitList(){
		Helper.PageBlock(I18n.t('application.text.loading'));
		this.props.loadList()
		.then(() => {
			if(this.props.treatmentGroups.list.length === 1){
				this.props.selectDetail(this.props.treatmentGroups.list[0], 0);
				this._setFormMode('add');
			}else{
				this.props.selectDetail(this.props.treatmentGroups.list[1], 1);
				this._setFormMode('edit');
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
				this.refs[this.props.treatmentGroupForm.focus].focus();
				this.props.formClear();
				break;
			case 'edit':
				this.props.formChangeMode('edit');
				break;
		}
	}
	_onValidationSubmit(){
		const {code, name, description} = this.props.treatmentGroupForm.values;
		this._onChangeField('code', code);
		this._onChangeField('name', name);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const errors = this.props.treatmentGroupForm.errors;
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
		switch(this.props.treatmentGroupForm.mode){
			case 'add':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.treatmentGroupForm.values);
						delete values.key;
						this.props.formAdd(values)
						.then(obj => {
							if(!this.props.popup){
								this.props.formClear();
								this._loadUnitList();
							}
							else{
								this.props.onSelect(obj.data);
							}
							// this.props.formClear();
							// this.props.pushList(obj.data);
							// const treatmentGroups = this.props.treatmentGroups.list;
							// this.props.selectDetail(treatmentGroups[treatmentGroups.length-1], treatmentGroups.length-1);
							// this._setFormMode('edit');
							// this._scrollRow(this.props.treatmentGroups.list.length-1, '+');
						})
					}
				})
				break;
			case 'edit':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.treatmentGroupForm.values);
						let key = values.key;
						delete values.key;
						this.props.formEdit(values)
						.then(obj => {
							// values.key = key;
							// this.props.updateList(values);
							this._loadUnitList();
						})
					}
				})
				break;
		}
	}
	_onClickRow(treatmentGroup, key){
		this.props.formClear();
		this.props.selectDetail(treatmentGroup, key);
		this._setFormMode('edit');
	}
	_onClickDelete(){
		if(this.props.treatmentGroup.detail.id !== -1)
			this.setState({confirm: true})
	}
	_onDelete(){
		this.props.formDelete(this.props.treatmentGroup.detail.id)
		.then(() => {
			this._loadUnitList();
			// this.props.removeList();
			 this.setState({confirm: false});
			// if(this.props.treatmentGroups.list.length > 1)
			// 	this.props.selectDetail(this.props.treatmentGroups.list[this.props.treatmentGroup.key-1], this.props.treatmentGroup.key-1);
			// else{
			// 	this.props.selectDetail(this.props.treatmentGroups.list[0], 0);
			// 	this._setFormMode('add');
			// }
		});
	}
	_onSearch(field, value){
		this.props.changeSearchList(field, value);
		setTimeout(() => {
			const list = Helper.GetListFilter(this.props.treatmentGroups.listRoot, this.props.treatmentGroups.search);
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
		if(this.props.treatmentGroup.detail.id){
			const treatmentGroups = this.props.treatmentGroups.list;
			if(this.props.treatmentGroup.key > 1){
				this.props.selectDetail(treatmentGroups[this.props.treatmentGroup.key-1], this.props.treatmentGroup.key-1);
				this._scrollIntoRow(this.props.treatmentGroup.key);
			}
				
		}
	}
	_onNextRow(){
		if(this.props.treatmentGroup.detail.id){
			if(this.props.treatmentGroup.key < this.props.treatmentGroups.list.length-1){
				this.props.selectDetail(this.props.treatmentGroups.list[this.props.treatmentGroup.key+1], this.props.treatmentGroup.key+1);
				this._scrollIntoRow(this.props.treatmentGroup.key);
			}
		}
	}
	_onFirstRow(){
		if(this.props.treatmentGroup.key !== 0){
			this.props.selectDetail(this.props.treatmentGroups.list[1], 1);
			this._scrollRow(1, '-');
		}
	}
	_onLastRow(){
		if(this.props.treatmentGroup.key !== this.props.treatmentGroups.list.length-1){
			this.props.selectDetail(this.props.treatmentGroups.list[this.props.treatmentGroups.list.length-1], this.props.treatmentGroups.list.length-1);
			this._scrollRow(this.props.treatmentGroups.list.length-1, '+');
		}
	}
	_scrollIntoRow(key, asterisk){
		Helper.ScrollPerRow(`#row-${key}`, '#list-container', key);
	}
	_scrollRow(key, asterisk){
		Helper.ScrollRow(`#row-${key}`, '#list-container', asterisk);
	}
	_onExit(){
		if(!this.props.popup)
			this.props.push(Routes.dashboard.view);
		else
			this.props.onExit();
	}
	_onClickSelect(){
		this.props.onSelect(this.props.treatmentGroup.detail);
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
			  						<Translate value="treatmentGroup.title"/>
			  					</div>
			  				</div>
			  				<div className="portlet-body">
			  					<div className="form-horizontal">
			  						<div className="form-body">
			  							<div className="row">
			  								<div className="col-md-12">
							  					<div className="form-group">
													<label className="control-label col-md-2">
														<Translate value="treatmentGroup.search.name"/>
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
			  									<th className="col-sm-2"><Translate value="treatmentGroup.field.code"/></th>
			  									<th className="col-sm-4"><Translate value="treatmentGroup.field.name"/></th>
			  									<th className="col-sm-6"><Translate value="treatmentGroup.field.description"/></th>
			  								</tr>
			  							</thead>
			  							<tbody id="list-container">
			  								{
			  									this.props.treatmentGroups.list.map((treatmentGroup, key) => {
			  										if(treatmentGroup.id !== -1){
				  										if(treatmentGroup.sorted || typeof treatmentGroup.sorted === 'undefined'){
					  										return (
					  											<tr key={key} className={this.props.treatmentGroup.detail.id === treatmentGroup.id ? 'row-active': ''}
					  												id={`row-${key}`}
					  												onClick={this._onClickRow.bind(this, treatmentGroup, key)}>
					  												<td>{treatmentGroup.code}</td>
					  												<td>{treatmentGroup.name}</td>
					  												<td>{treatmentGroup.description}</td>
					  											</tr>
					  										);
					  									}
					  								}else{
					  									if(this.props.treatmentGroups.list.length === 1){
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
									<li><a>{this.props.treatmentGroup.key} / {this.props.treatmentGroups.list.length-1}</a></li>
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
			  									<div className={this.props.treatmentGroupForm.errors.code?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-3">
			  											<Translate value="treatmentGroup.field.code"/>
			  										</label>
			  										<div className="col-md-9">
			  											<input type="text" className="form-control" ref="code"
			  												value={this.props.treatmentGroupForm.values.code}
			  												onChange={event => this._onChangeField('code', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.treatmentGroupForm.errors.code ? 'block': 'none'}}>
			  												<Translate value={this.props.treatmentGroupForm.errors.code}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-6">
			  									<div className={this.props.treatmentGroupForm.errors.name?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-3">
			  											<Translate value="treatmentGroup.field.name"/>
			  										</label>
			  										<div className="col-md-9">
			  											<input type="text" className="form-control"
			  												value={this.props.treatmentGroupForm.values.name}
			  												onChange={event => this._onChangeField('name', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.treatmentGroupForm.errors.name ? 'block': 'none'}}>
			  												<Translate value={this.props.treatmentGroupForm.errors.name}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  							</div>
			  							<div className="row">
			  								<div className="col-md-6">
			  									<div className={this.props.treatmentGroupForm.errors.description?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-3">
			  											<Translate value="treatmentGroup.field.description"/>
			  										</label>
			  										<div className="col-md-9">
			  											<input type="text" className="form-control"
			  												value={this.props.treatmentGroupForm.values.description}
			  												onChange={event => this._onChangeField('description', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.treatmentGroupForm.errors.description ? 'block': 'none'}}>
			  												<Translate value={this.props.treatmentGroupForm.errors.description}/>
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
						  									{
						  										!this.props.popup?
						  										null
								  								:
								  								<span>
								  									&nbsp;
								  									<button type="button" className="btn green btn-customer-size"
								  										onClick={this._onClickSelect.bind(this)}>
								  										<Translate value="application.button.select"/>
								  									</button>
								  								</span>
							  								}

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

const mapStateToProps = ({treatmentGroupForm, treatmentGroups, treatmentGroup}) => {
	return {
		treatmentGroupForm, treatmentGroups, treatmentGroup
	};
};

const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		...treatmentGroupFormActions,
		...treatmentGroupListActions,
		...treatmentGroupDetailActions
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(UnitFormView);