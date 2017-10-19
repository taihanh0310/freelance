const {Translate, I18n} = ReactReduxI18n;

import * as countryFormActions from 'modules/country/actions/form';
import * as countryListActions from 'modules/country/actions/list';
import * as countryDetailActions from 'modules/country/actions/detail';

class CountryFormView extends React.Component{
	constructor(){
		super();
		this.state = {
			confirm: false
		};
	}
	componentDidMount(){
		this._loadCountryList();
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
	_loadCountryList(){
		Helper.PageBlock(I18n.t('application.text.loading'));
		this.props.loadList()
		.then(() => {
			if(this.props.countries.list.length === 1){
				this.props.selectDetail(this.props.countries.list[0], 0);
				this._setFormMode('add');
			}else{
				this.props.selectDetail(this.props.countries.list[1], 1);
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
				this.refs[this.props.countryForm.focus].focus();
				this.props.formClear();
				break;
			case 'edit':
				this.props.formChangeMode('edit');
				break;
		}
	}
	_onValidationSubmit(){
		const {code, name} = this.props.countryForm.values;
		this._onChangeField('code', code);
		this._onChangeField('name', name);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const errors = this.props.countryForm.errors;
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
		switch(this.props.countryForm.mode){
			case 'add':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.countryForm.values);
						delete values.key;
						this.props.formAdd(values)
						.then(obj => {
							this.props.formClear();
							this.props.pushList(obj.data);
							const countries = this.props.countries.list;
							this.props.selectDetail(countries[countries.length-1], countries.length-1);
							this._setFormMode('edit');
							this._scrollRow(this.props.countries.list.length-1, '+');
						})
					}
				})
				break;
			case 'edit':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.countryForm.values);
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
	_onClickRow(country, key){
		this.props.formClear();
		this.props.selectDetail(country, key);
		this._setFormMode('edit');
	}
	_onClickDelete(){
		if(this.props.country.detail.id !== -1)
			this.setState({confirm: true})
	}
	_onDelete(){
		this.props.formDelete(this.props.country.detail.id)
		.then(() => {
			this.props.removeList();
			this.setState({confirm: false});
			if(this.props.countries.list.length > 1)
				this.props.selectDetail(this.props.countries.list[this.props.country.key-1], this.props.country.key-1);
			else{
				this.props.selectDetail(this.props.countries.list[0], 0);
				this._setFormMode('add');
			}
		});
	}
	_onSearch(field, value){
		this.props.changeSearchList(field, value);
		setTimeout(() => {
			const list = Helper.GetListFilter(this.props.countries.listRoot, this.props.countries.search);
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
		if(this.props.country.detail.id){
			const countries = this.props.countries.list;
			if(this.props.country.key > 1){
				this.props.selectDetail(countries[this.props.country.key-1], this.props.country.key-1);
				this._scrollIntoRow(this.props.country.key);
			}
				
		}
	}
	_onNextRow(){
		if(this.props.country.detail.id){
			if(this.props.country.key < this.props.countries.list.length-1){
				this.props.selectDetail(this.props.countries.list[this.props.country.key+1], this.props.country.key+1);
				this._scrollIntoRow(this.props.country.key);
			}
		}
	}
	_onFirstRow(){
		if(this.props.country.key !== 0){
			this.props.selectDetail(this.props.countries.list[1], 1);
			this._scrollRow(1, '-');
		}
	}
	_onLastRow(){
		if(this.props.country.key !== this.props.countries.list.length-1){
			this.props.selectDetail(this.props.countries.list[this.props.countries.list.length-1], this.props.countries.list.length-1);
			this._scrollRow(this.props.countries.list.length-1, '+');
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
			  						<Translate value="country.title"/>
			  					</div>
			  				</div>
			  				<div className="portlet-body">
			  					<div className="form-horizontal">
			  						<div className="form-body">
			  							<div className="row">
			  								<div className="col-md-12">
							  					<div className="form-group">
													<label className="control-label col-md-2">
														<Translate value="country.field.name"/>
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
			  									<th className='col-sm-1'><Translate value="country.field.code"/></th>
			  									<th className='col-sm-4'><Translate value="country.field.name"/></th>
                                                                                                <th className='col-sm-7'><Translate value="country.field.description"/></th>
			  								</tr>
			  							</thead>
			  							<tbody id="list-container">
			  								{
			  									this.props.countries.list.map((country, key) => {
			  										if(country.id !== -1){
				  										if(country.sorted || typeof country.sorted === 'undefined'){
					  										return (
					  											<tr key={key} className={this.props.country.detail.id === country.id ? 'row-active': ''}
					  												id={`row-${key}`}
					  												onClick={this._onClickRow.bind(this, country, key)}>
					  												<td>{country.code}</td>
					  												<td>{country.name}</td>
					  												<td>{country.description}</td>
					  											</tr>
					  										);
					  									}
					  								}else{
					  									if(this.props.countries.list.length === 1){
					  										return (
					  											<tr key={key}>
					  												<td colSpan="3" className='text-center'>
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
									<li><a>{this.props.country.key} / {this.props.countries.list.length-1}</a></li>
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
			  									<div className={this.props.countryForm.errors.code?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-3">
			  											<Translate value="country.field.code"/>
			  										</label>
			  										<div className="col-md-9">
			  											<input type="text" className="form-control" ref="code"
			  												value={this.props.countryForm.values.code}
			  												onChange={event => this._onChangeField('code', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.countryForm.errors.code ? 'block': 'none'}}>
			  												<Translate value={this.props.countryForm.errors.code}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className={this.props.countryForm.errors.name?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-3">
			  											<Translate value="country.field.name"/>
			  										</label>
			  										<div className="col-md-9">
			  											<input type="text" className="form-control"
			  												value={this.props.countryForm.values.name}
			  												onChange={event => this._onChangeField('name', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.countryForm.errors.name ? 'block': 'none'}}>
			  												<Translate value={this.props.countryForm.errors.name}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className={this.props.countryForm.errors.description?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-3">
			  											<Translate value="country.field.description"/>
			  										</label>
			  										<div className="col-md-9">
			  											<input type="text" className="form-control" ref="address"
			  												value={this.props.countryForm.values.description}
			  												onChange={event => this._onChangeField('description', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.countryForm.errors.description ? 'block': 'none'}}>
			  												<Translate value={this.props.countryForm.errors.description}/>
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

const mapStateToProps = ({countryForm, countries, country}) => {
	return {
		countryForm, countries, country
	};
};

const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		...countryFormActions,
		...countryListActions,
		...countryDetailActions
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CountryFormView);