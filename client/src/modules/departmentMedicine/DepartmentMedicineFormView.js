const {Translate, I18n} = ReactReduxI18n;

import * as departmentMedicineFormActions from 'modules/departmentMedicine/actions/form';
import * as departmentMedicineListActions from 'modules/departmentMedicine/actions/list';
import * as departmentMedicineDetailActions from 'modules/departmentMedicine/actions/detail';

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
			if(this.props.departmentMedicines.list.length === 1){
				this.props.selectDetail(this.props.departmentMedicines.list[0], 0);
				this._setFormMode('add');
			}else{
				this.props.selectDetail(this.props.departmentMedicines.list[1], 1);
				this.props.changeSelectedDoctors(this.props.departmentMedicines.list[1].doctors);
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
				this.refs[this.props.departmentMedicineForm.focus].focus();
				this.props.formClear();
				break;
			case 'edit':
				this.props.formChangeMode('edit');
				break;
		}
	}
	_onValidationSubmit(){
		const {name, description} = this.props.departmentMedicineForm.values;
		this._onChangeField('name', name);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const errors = this.props.departmentMedicineForm.errors;
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
		switch(this.props.departmentMedicineForm.mode){
			case 'add':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.departmentMedicineForm.values);
						delete values.key;
						delete values.medicines;
						this.props.formAdd(values)
						.then(obj => {
							this.props.formClear();
							// this.props.pushList(obj.data);
							// const departmentMedicines = this.props.departmentMedicines.list;
							// this.props.selectDetail(departmentMedicines[departmentMedicines.length-1], departmentMedicines.length-1);
							// this._setFormMode('edit');
							// this._scrollRow(this.props.departmentMedicines.list.length-1, '+');
							this._loadUnitList();
						})
					}
				})
				break;
			case 'edit':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.departmentMedicineForm.values);
						let key = values.key;
						delete values.key;
						delete values.medicines;
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
	_onClickRow(departmentMedicine, key){
		this.props.formClear();
		this.props.selectDetail(departmentMedicine, key);
		this.props.changeSelectedDoctors(departmentMedicine.doctors);
		this._setFormMode('edit');
	}
	_onClickDelete(){
		if(this.props.departmentMedicine.detail.id !== -1)
			this.setState({confirm: true})
	}
	_onDelete(){
		this.props.formDelete(this.props.departmentMedicine.detail.id)
		.then(() => {
			// this.props.removeList();
			this.setState({confirm: false});
			this._loadUnitList();
			// if(this.props.departmentMedicines.list.length > 1)
			// 	this.props.selectDetail(this.props.departmentMedicines.list[this.props.departmentMedicine.key-1], this.props.departmentMedicine.key-1);
			// else{
			// 	this.props.selectDetail(this.props.departmentMedicines.list[0], 0);
			// 	this._setFormMode('add');
			// }
		})
		.catch(() => {
			this.setState({confirm: false});
		});
	}
	_onSearch(field, value){
		this.props.changeSearchList(field, value);
		this.props.clearSelectedDoctors();
		setTimeout(() => {
			const list = Helper.GetListFilter(this.props.departmentMedicines.listRoot, this.props.departmentMedicines.search);
			this.props.changeList(list);
			if(list.length === 1){
				this.props.selectDetail(list[0], 0);
				this.props.formChangeMode('add');
			}else{
				this.props.selectDetail(list[1], 1);
				this.props.changeSelectedDoctors(list[1].doctors);
				this._setFormMode('edit');
			}
		}, 0);
	}
	_onPreviousRow(){
		if(this.props.departmentMedicine.detail.id){
			const departmentMedicines = this.props.departmentMedicines.list;
			if(this.props.departmentMedicine.key > 1){
				this.props.selectDetail(departmentMedicines[this.props.departmentMedicine.key-1], this.props.departmentMedicine.key-1);
				this._scrollIntoRow(this.props.departmentMedicine.key);
			}
				
		}
	}
	_onNextRow(){
		if(this.props.departmentMedicine.detail.id){
			if(this.props.departmentMedicine.key < this.props.departmentMedicines.list.length-1){
				this.props.selectDetail(this.props.departmentMedicines.list[this.props.departmentMedicine.key+1], this.props.departmentMedicine.key+1);
				this._scrollIntoRow(this.props.departmentMedicine.key);
			}
		}
	}
	_onFirstRow(){
		if(this.props.departmentMedicine.key !== 0){
			this.props.selectDetail(this.props.departmentMedicines.list[1], 1);
			this._scrollRow(1, '-');
		}
	}
	_onLastRow(){
		if(this.props.departmentMedicine.key !== this.props.departmentMedicines.list.length-1){
			this.props.selectDetail(this.props.departmentMedicines.list[this.props.departmentMedicines.list.length-1], this.props.departmentMedicines.list.length-1);
			this._scrollRow(this.props.departmentMedicines.list.length-1, '+');
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
			  						<Translate value="departmentMedicine.title"/>
			  					</div>
			  				</div>
			  				<div className="portlet-body">
			  					<div className="form-horizontal">
			  						<div className="form-body">
			  							<div className="row">
			  								<div className="col-md-12">
							  					<div className="form-group">
													<label className="control-label col-md-2">
														<Translate value="departmentMedicine.field.name"/>
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
			  					<div className="table-scrollable row">
			  						<div className="col-sm-9">
			  							<table className="table fixed-header table-bordered" id="list">
			  							<thead>
			  								<tr>
			  									<th className="col-md-3"><Translate value="departmentMedicine.field.name"/></th>
			  									<th className="col-md-9"><Translate value="departmentMedicine.field.description"/></th>
			  								</tr>
			  							</thead>
			  							<tbody id="list-container">
			  								{
			  									this.props.departmentMedicines.list.map((departmentMedicine, key) => {
			  										if(departmentMedicine.id !== -1){
				  										if(departmentMedicine.sorted || typeof departmentMedicine.sorted === 'undefined'){
					  										return (
					  											<tr key={key} className={this.props.departmentMedicine.detail.id === departmentMedicine.id ? 'row-active': ''}
					  												id={`row-${key}`}
					  												onClick={this._onClickRow.bind(this, departmentMedicine, key)}>
					  												<td>{departmentMedicine.name}</td>
					  												<td>{departmentMedicine.description}</td>
					  											</tr>
					  										);
					  									}
					  								}else{
					  									if(this.props.departmentMedicines.list.length === 1){
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
			  						<div className='col-sm-3'>
			  							<table className="table fixed-header table-bordered">
			  							<thead>
			  								<tr>
			  									<th className="col-md-12"><Translate value="departmentMedicine.field.doctor_name"/></th>
			  								</tr>
			  							</thead>
			  							<tbody>
			  									{
			  										this.props.departmentMedicines.selectedDoctors.map((d, keyD) => {
			  											return (<tr key={keyD}> <td> {d.name} </td></tr>);
			  										})
			  									}
			  							</tbody>
			  						</table>
			  						</div>
			  					</div>
			  					<ul className="pagination">
									<li><a onClick={this._onFirstRow.bind(this)}><i className="fa fa-angle-double-left"/></a></li>
									<li><a onClick={this._onPreviousRow.bind(this)}><i className="fa fa-angle-left"/></a></li>
									<li><a>{this.props.departmentMedicine.key} / {this.props.departmentMedicines.list.length-1}</a></li>
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
			  									<div className={this.props.departmentMedicineForm.errors.name?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-3">
			  											<Translate value="departmentMedicine.field.name"/>
			  										</label>
			  										<div className="col-md-9">
			  											<input type="text" className="form-control" ref="name"
			  												value={this.props.departmentMedicineForm.values.name}
			  												onChange={event => this._onChangeField('name', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.departmentMedicineForm.errors.name ? 'block': 'none'}}>
			  												<Translate value={this.props.departmentMedicineForm.errors.name}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-6">
			  									<div className={this.props.departmentMedicineForm.errors.description?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-3">
			  											<Translate value="departmentMedicine.field.description"/>
			  										</label>
			  										<div className="col-md-9">
			  											<input type="text" className="form-control" 
			  												value={this.props.departmentMedicineForm.values.description}
			  												onChange={event => this._onChangeField('description', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.departmentMedicineForm.errors.description ? 'block': 'none'}}>
			  												<Translate value={this.props.departmentMedicineForm.errors.description}/>
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
  	};
};

const mapStateToProps = ({departmentMedicineForm, departmentMedicines, departmentMedicine}) => {
	return {
		departmentMedicineForm, departmentMedicines, departmentMedicine
	};
};

const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		...departmentMedicineFormActions,
		...departmentMedicineListActions,
		...departmentMedicineDetailActions
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(UnitFormView);