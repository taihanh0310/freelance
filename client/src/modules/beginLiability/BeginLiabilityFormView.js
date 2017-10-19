const {Translate, I18n} = ReactReduxI18n;

import * as beginLiabilityFormActions from 'modules/beginLiability/actions/form';
import * as beginLiabilityListActions from 'modules/beginLiability/actions/list';
import * as beginLiabilityDetailActions from 'modules/beginLiability/actions/detail';

class BeginLiabilityFormView extends React.Component{
	constructor(){
		super();
		this.state = {
			confirm: false
		};
	}
	componentDidMount(){
		this._loadBeginLiabilityList();
		Keyboard.bind('f6', event => {
			this._onSave();
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
		Keyboard.unbind('f6');
		Keyboard.unbind('up');
		Keyboard.unbind('down');
		Keyboard.unbind('esc');
	}
	_loadBeginLiabilityList(){
		Helper.PageBlock(I18n.t('application.text.loading'));
		this.props.loadList()
		.then(() => {
			if(this.props.beginLiabilities.list.length === 1){
				this.props.selectDetail(this.props.beginLiabilities.list[0], 0);
				this._setFormMode('add');
			}else{
				this.props.selectDetail(this.props.beginLiabilities.list[1], 1);
				this._setFormMode('edit');
			}
		})
	}
	_onChangeField(field, value){
		this.props.formChange(field, value);
		let error = '';
		switch(field){
			case 'begin_liability_money':
				if(Check.CheckEmpty(value))
					error = 'application.validation.required';
				else
					if(!Check.checkCurrency(value)){
	                    error = 'application.validation.currency';
	                }else{
	                    error = '';
	                }
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
				this.refs[this.props.beginLiabilityForm.focus].focus();
				this.props.formClear();
				break;
			case 'edit':
				this.props.formChangeMode('edit');
				break;
		}
	}
	_onValidationSubmit(){
		const {name, begin_liability_money} = this.props.beginLiabilityForm.values;
		this._onChangeField('begin_liability_money', begin_liability_money);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const errors = this.props.beginLiabilityForm.errors;
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
		switch(this.props.beginLiabilityForm.mode){
			case 'edit':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.beginLiabilityForm.values);
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
	_onClickRow(beginLiability, key){
		this.props.formClear();
		this.props.selectDetail(beginLiability, key);
		this._setFormMode('edit');
	}
	_onSearch(field, value){
		this.props.changeSearchList(field, value);
		setTimeout(() => {
			const list = Helper.GetListFilter(this.props.beginLiabilities.listRoot, this.props.beginLiabilities.search);
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
		if(this.props.beginLiability.detail.id){
			const beginLiabilities = this.props.beginLiabilities.list;
			if(this.props.beginLiability.key > 1){
				this.props.selectDetail(beginLiabilities[this.props.beginLiability.key-1], this.props.beginLiability.key-1);
				this._scrollIntoRow(this.props.beginLiability.key);
			}
				
		}
	}
	_onNextRow(){
		if(this.props.beginLiability.detail.id){
			if(this.props.beginLiability.key < this.props.beginLiabilities.list.length-1){
				this.props.selectDetail(this.props.beginLiabilities.list[this.props.beginLiability.key+1], this.props.beginLiability.key+1);
				this._scrollIntoRow(this.props.beginLiability.key);
			}
		}
	}
	_onFirstRow(){
		if(this.props.beginLiability.key !== 0){
			this.props.selectDetail(this.props.beginLiabilities.list[1], 1);
			this._scrollRow(1, '-');
		}
	}
	_onLastRow(){
		if(this.props.beginLiability.key !== this.props.beginLiabilities.list.length-1){
			this.props.selectDetail(this.props.beginLiabilities.list[this.props.beginLiabilities.list.length-1], this.props.beginLiabilities.list.length-1);
			this._scrollRow(this.props.beginLiabilities.list.length-1, '+');
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

	// Tim kim khach hang
	_onSearchType(value){
		if(value === 'customer'){
			this.props.loadListCustomer()
			.then(() => {
				if(this.props.beginLiabilities.list.length === 1){
					this.props.selectDetail(this.props.beginLiabilities.list[0], 0);
					this._setFormMode('add');
				}else{
					this.props.selectDetail(this.props.beginLiabilities.list[1], 1);
					this._setFormMode('edit');
				}
			});
		}
		else{
			this.props.loadListSupplier()
			.then(() => {
				if(this.props.beginLiabilities.list.length === 1){
					this.props.selectDetail(this.props.beginLiabilities.list[0], 0);
					this._setFormMode('add');
				}else{
					this.props.selectDetail(this.props.beginLiabilities.list[1], 1);
					this._setFormMode('edit');
				}
			});
		}
	}

	
  	render(){
  		return (
			<div className="page-content-inner">
				<div className="row">
					<div className="col-md-12">
						<div className="portlet box green">
			  				<div className="portlet-title">
			  					<div className="caption">
			  						<Translate value="beginLiability.title"/>
			  					</div>
			  				</div>
			  				<div className="portlet-body">
			  					<div className="form-horizontal">
			  						<div className="form-body">
			  							<div className="row">
                                                                                        <div className="col-md-3">
			  									<div className="form-group">
			  										<label className="control-label col-md-4">
			  											<Translate value="beginLiability.dropDownLabel"/>
			  										</label>
			  										<div className="col-md-8">
			  											<div className="input-group">
			  												<select className="form-control" onChange={event => this._onSearchType(event.target.value)}>
                                                                <option value="customer"><Translate value="beginLiability.dropDownCustomer"/></option>
                                                                <option value="supplier"><Translate value="beginLiability.dropDownSupplier"/></option>
			  												</select>
			  											</div>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-9">
							  					<div className="form-group">
													<label className="control-label col-md-2">
														<Translate value="beginLiability.field.nameSearch"/>
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
			  									<th className="col-md-2"><Translate value="beginLiability.field.name"/></th>
			  									<th className="col-md-6"><Translate value="beginLiability.field.address"/></th>
			  									<th className="col-md-2"><Translate value="beginLiability.field.phone"/></th>
			  									<th className="col-md-2"><Translate value="beginLiability.field.begin_liability_money"/></th>
			  								</tr>
			  							</thead>
			  							<tbody id="list-container">
			  								{
			  									this.props.beginLiabilities.list.map((beginLiability, key) => {
			  										if(beginLiability.id !== -1){
				  										if(beginLiability.sorted || typeof beginLiability.sorted === 'undefined'){
					  										return (
					  											<tr key={key} className={this.props.beginLiability.detail.id === beginLiability.id ? 'row-active': ''}
					  												id={`row-${key}`}
					  												onClick={this._onClickRow.bind(this, beginLiability, key)}>
					  												<td>{beginLiability.name}</td>
					  												<td>{beginLiability.address}</td>
					  												<td>{beginLiability.phone}</td>
					  												<td className="text-right">{Numeral(beginLiability.begin_liability_money).format('0,0')}</td>
					  											</tr>
					  										);
					  									}
					  								}else{
					  									if(this.props.beginLiabilities.list.length === 1){
					  										return (
					  											<tr key={key}>
					  												<td colSpan="4" className="text-center">
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
									<li><a>{this.props.beginLiability.key} / {this.props.beginLiabilities.list.length-1}</a></li>
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
			  								<div className="col-md-12">
			  									<div className={this.props.beginLiabilityForm.errors.begin_liability_money?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-2">
			  											<Translate value="beginLiability.field.begin_liability_money"/>
			  										</label>
			  										<div className="col-md-10">
			  											<input type="number" min="0" className="form-control text-right" ref="begin_liability_money"
			  												value={this.props.beginLiabilityForm.values.begin_liability_money}
			  												onChange={event => this._onChangeField('begin_liability_money', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.beginLiabilityForm.errors.begin_liability_money ? 'block': 'none'}}>
			  												<Translate value={this.props.beginLiabilityForm.errors.begin_liability_money}/>
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
						  										onClick={this._onSave.bind(this)}>
						  										<Translate value="application.button.edit"/>
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

const mapStateToProps = ({beginLiabilityForm, beginLiabilities, beginLiability}) => {
	return {
		beginLiabilityForm, beginLiabilities, beginLiability
	};
};

const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		...beginLiabilityFormActions,
		...beginLiabilityListActions,
		...beginLiabilityDetailActions
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(BeginLiabilityFormView);