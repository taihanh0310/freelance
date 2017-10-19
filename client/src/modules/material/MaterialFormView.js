const {Translate, I18n} = ReactReduxI18n;

import * as materialFormActions from 'modules/material/actions/form';
import * as materialListActions from 'modules/material/actions/list';
import * as materialDetailActions from 'modules/material/actions/detail';

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
		if(!this.props.popup)
			Helper.PageBlock(I18n.t('application.text.loading'));
		this.props.loadList()
		.then(() => {
			if(this.props.materials.list.length === 1){
				this.props.selectDetail(this.props.materials.list[0], 0);
				this._setFormMode('add');
			}else{
				this.props.selectDetail(this.props.materials.list[1], 1);
				this._setFormMode('edit');
			}
		})
	}
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
				this.refs[this.props.materialForm.focus].focus();
				this.props.formClear();
				break;
			case 'edit':
				this.props.formChangeMode('edit');
				break;
		}
	}
	_onValidationSubmit(){
		const {code, name, description} = this.props.materialForm.values;
		this._onChangeField('name', name);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const errors = this.props.materialForm.errors;
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
		switch(this.props.materialForm.mode){
			case 'add':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.materialForm.values);
						delete values.key;
						this.props.formAdd(values)
						.then(obj => {
							if(!this.props.popup){
								this.props.formClear();
								this._loadUnitList();
							}else{
								this.props.onSelect(obj.data);
							}
							// this.props.pushList(obj.data);
							// const materials = this.props.materials.list;
							// this.props.selectDetail(materials[materials.length-1], materials.length-1);
							// this._setFormMode('edit');
							// this._scrollRow(this.props.materials.list.length-1, '+');
						})
					}
				})
				break;
			case 'edit':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.materialForm.values);
						let key = values.key;
						delete values.key;
						this.props.formEdit(values)
						.then(obj => {
							this._loadUnitList();
							// values.key = key;
							// this.props.updateList(values);
						})
					}
				})
				break;
		}
	}
	_onClickRow(material, key){
		this.props.formClear();
		this.props.selectDetail(material, key);
		this._setFormMode('edit');
	}
	_onClickDelete(){
		if(this.props.material.detail.id !== -1)
			this.setState({confirm: true})
	}
	_onDelete(){
		this.props.formDelete(this.props.material.detail.id)
		.then(() => {
			this.setState({confirm: false}, () => {
				this._loadUnitList();
			});
			// if(this.props.materials.list.length > 1)
			// 	this.props.selectDetail(this.props.materials.list[this.props.material.key-1], this.props.material.key-1);
			// else{
			// 	this.props.selectDetail(this.props.materials.list[0], 0);
			// 	this._setFormMode('add');
			// }
		});
	}
	_onSearch(field, value){
		this.props.changeSearchList(field, value);
		setTimeout(() => {
			const list = Helper.GetListFilter(this.props.materials.listRoot, this.props.materials.search);
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
		if(this.props.material.detail.id){
			const materials = this.props.materials.list;
			if(this.props.material.key > 1){
				this.props.selectDetail(materials[this.props.material.key-1], this.props.material.key-1);
				this._scrollIntoRow(this.props.material.key);
			}
				
		}
	}
	_onNextRow(){
		if(this.props.material.detail.id){
			if(this.props.material.key < this.props.materials.list.length-1){
				this.props.selectDetail(this.props.materials.list[this.props.material.key+1], this.props.material.key+1);
				this._scrollIntoRow(this.props.material.key);
			}
		}
	}
	_onFirstRow(){
		if(this.props.material.key !== 0){
			this.props.selectDetail(this.props.materials.list[1], 1);
			this._scrollRow(1, '-');
		}
	}
	_onLastRow(){
		if(this.props.material.key !== this.props.materials.list.length-1){
			this.props.selectDetail(this.props.materials.list[this.props.materials.list.length-1], this.props.materials.list.length-1);
			this._scrollRow(this.props.materials.list.length-1, '+');
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
		this.props.onSelect(this.props.material.detail);
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
			  						<Translate value="material.title"/>
			  					</div>
			  				</div>
			  				<div className="portlet-body">
			  					<div className="form-horizontal">
			  						<div className="form-body">
			  							<div className="row">
			  								<div className="col-md-12">
							  					<div className="form-group">
													<label className="control-label col-md-2">
														<Translate value="material.search.name"/>
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
			  									<th className='col-sm-4'><Translate value="material.field.name"/></th>
			  									<th className='col-sm-8'><Translate value="material.field.description"/></th>
			  								</tr>
			  							</thead>
			  							<tbody id="list-container">
			  								{
			  									this.props.materials.list.map((material, key) => {
			  										if(material.id !== -1){
				  										if(material.sorted || typeof material.sorted === 'undefined'){
					  										return (
					  											<tr key={key} className={this.props.material.detail.id === material.id ? 'row-active': ''}
					  												id={`row-${key}`}
					  												onClick={this._onClickRow.bind(this, material, key)}>
					  												<td>{material.name}</td>
					  												<td>{material.description}</td>
					  											</tr>
					  										);
					  									}
					  								}else{
					  									if(this.props.materials.list.length === 1){
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
									<li><a>{this.props.material.key} / {this.props.materials.list.length-1}</a></li>
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
			  									<div className={this.props.materialForm.errors.name?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-3">
			  											<Translate value="material.field.name"/>
			  										</label>
			  										<div className="col-md-9">
			  											<input type="text" className="form-control" ref="name"
			  												value={this.props.materialForm.values.name}
			  												onChange={event => this._onChangeField('name', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.materialForm.errors.name ? 'block': 'none'}}>
			  												<Translate value={this.props.materialForm.errors.name}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-6">
			  									<div className={this.props.materialForm.errors.description?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-3">
			  											<Translate value="material.field.description"/>
			  										</label>
			  										<div className="col-md-9">
			  											<input type="text" className="form-control"
			  												value={this.props.materialForm.values.description}
			  												onChange={event => this._onChangeField('description', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.materialForm.errors.description ? 'block': 'none'}}>
			  												<Translate value={this.props.materialForm.errors.description}/>
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

const mapStateToProps = ({materialForm, materials, material}) => {
	return {
		materialForm, materials, material
	};
};

const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		...materialFormActions,
		...materialListActions,
		...materialDetailActions
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(UnitFormView);