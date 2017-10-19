const {Translate, I18n} = ReactReduxI18n;

import * as producerFormActions from 'modules/producer/actions/form';
import * as producerListActions from 'modules/producer/actions/list';
import * as producerDetailActions from 'modules/producer/actions/detail';

class ProducerFormView extends React.Component{
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
			if(this.props.producers.list.length === 1){
				this.props.selectDetail(this.props.producers.list[0], 0);
				this._setFormMode('add');
			}else{
				this.props.selectDetail(this.props.producers.list[1], 1);
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
				this.refs[this.props.producerForm.focus].focus();
				this.props.formClear();
				break;
			case 'edit':
				this.props.formChangeMode('edit');
				break;
		}
	}
	_onValidationSubmit(){
		const {code, name, email, website} = this.props.producerForm.values;
		this._onChangeField('code', code);
		this._onChangeField('name', name);
		this._onChangeField('email', email);
		this._onChangeField('website', website);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const errors = this.props.producerForm.errors;
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
		switch(this.props.producerForm.mode){
			case 'add':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.producerForm.values);
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
						})
					}
				})
				break;
			case 'edit':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.producerForm.values);
						let key = values.key;
						delete values.key;
						this.props.formEdit(values)
						.then(obj => {
							this._loadUnitList();
						})
					}
				})
				break;
		}
	}
	_onClickRow(producer, key){
		this.props.formClear();
		this.props.selectDetail(producer, key);
		this._setFormMode('edit');
	}
	_onClickDelete(){
		if(this.props.producer.detail.id !== -1)
			this.setState({confirm: true})
	}
	_onDelete(){
		this.props.formDelete(this.props.producer.detail.id)
		.then(() => {
			this._loadUnitList();
		});
	}
	_onSearch(field, value){
		this.props.changeSearchList(field, value);
		setTimeout(() => {
			const list = Helper.GetListFilter(this.props.producers.listRoot, this.props.producers.search);
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
		if(this.props.producer.detail.id){
			const producers = this.props.producers.list;
			if(this.props.producer.key > 1){
				this.props.selectDetail(producers[this.props.producer.key-1], this.props.producer.key-1);
				this._scrollIntoRow(this.props.producer.key);
			}
				
		}
	}
	_onNextRow(){
		if(this.props.producer.detail.id){
			if(this.props.producer.key < this.props.producers.list.length-1){
				this.props.selectDetail(this.props.producers.list[this.props.producer.key+1], this.props.producer.key+1);
				this._scrollIntoRow(this.props.producer.key);
			}
		}
	}
	_onFirstRow(){
		if(this.props.producer.key !== 0){
			this.props.selectDetail(this.props.producers.list[1], 1);
			this._scrollRow(1, '-');
		}
	}
	_onLastRow(){
		if(this.props.producer.key !== this.props.producers.list.length-1){
			this.props.selectDetail(this.props.producers.list[this.props.producers.list.length-1], this.props.producers.list.length-1);
			this._scrollRow(this.props.producers.list.length-1, '+');
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
		this.props.onSelect(this.props.producer.detail);
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
			  						<Translate value="producer.title"/>
			  					</div>
			  				</div>
			  				<div className="portlet-body">
			  					<div className="form-horizontal">
			  						<div className="form-body">
			  							<div className="row">
			  								<div className="col-md-12">
							  					<div className="form-group">
													<label className="control-label col-md-2">
														<Translate value="producer.search.name"/>
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
			  									<th className='col-sm-2'><Translate value="producer.field.code"/></th>
			  									<th className='col-sm-3'><Translate value="producer.field.name"/></th>
			  									<th className='col-sm-4'><Translate value="producer.field.address"/></th>
			  									<th className='col-sm-3'><Translate value="producer.field.description"/></th>
			  								</tr>
			  							</thead>
			  							<tbody id="list-container">
			  								{
			  									this.props.producers.list.map((producer, key) => {
			  										if(producer.id !== -1){
				  										if(producer.sorted || typeof producer.sorted === 'undefined'){
					  										return (
					  											<tr key={key} className={this.props.producer.detail.id === producer.id ? 'row-active': ''}
					  												id={`row-${key}`}
					  												onClick={this._onClickRow.bind(this, producer, key)}>
					  												<td>{producer.code}</td>
					  												<td>{producer.name}</td>
					  												<td>{producer.address}</td>
					  												<td>{producer.description}</td>
					  											</tr>
					  										);
					  									}
					  								}else{
					  									if(this.props.producers.list.length === 1){
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
									<li><a onClick={this._onFirstRow.bind(this)}><i className="fa fa-angle-double-left"/></a></li>
									<li><a onClick={this._onPreviousRow.bind(this)}><i className="fa fa-angle-left"/></a></li>
									<li><a>{this.props.producer.key} / {this.props.producers.list.length-1}</a></li>
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
			  									<div className={this.props.producerForm.errors.code?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="producer.field.code"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control" ref="code"
			  												value={this.props.producerForm.values.code}
			  												onChange={event => this._onChangeField('code', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.producerForm.errors.code ? 'block': 'none'}}>
			  												<Translate value={this.props.producerForm.errors.code}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className={this.props.producerForm.errors.name?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="producer.field.name"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control"
			  												value={this.props.producerForm.values.name}
			  												onChange={event => this._onChangeField('name', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.producerForm.errors.name ? 'block': 'none'}}>
			  												<Translate value={this.props.producerForm.errors.name}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className={this.props.producerForm.errors.email?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="producer.field.email"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control" ref="email"
			  												value={this.props.producerForm.values.email}
			  												onChange={event => this._onChangeField('email', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.producerForm.errors.email ? 'block': 'none'}}>
			  												<Translate value={this.props.producerForm.errors.email}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  							</div>
			  							<div className="row">
			  								<div className="col-md-4">
			  									<div className={this.props.producerForm.errors.address?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="producer.field.address"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control" ref="address"
			  												value={this.props.producerForm.values.address}
			  												onChange={event => this._onChangeField('address', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.producerForm.errors.address ? 'block': 'none'}}>
			  												<Translate value={this.props.producerForm.errors.address}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className={this.props.producerForm.errors.phone?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="producer.field.phone"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control" ref="phone"
			  												value={this.props.producerForm.values.phone}
			  												onChange={event => this._onChangeField('phone', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.producerForm.errors.phone ? 'block': 'none'}}>
			  												<Translate value={this.props.producerForm.errors.phone}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className={this.props.producerForm.errors.fax?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="producer.field.fax"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control" ref="fax"
			  												value={this.props.producerForm.values.fax}
			  												onChange={event => this._onChangeField('fax', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.producerForm.errors.fax ? 'block': 'none'}}>
			  												<Translate value={this.props.producerForm.errors.fax}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  							</div>
			  							<div className="row">
			  								<div className="col-md-4">
			  									<div className={this.props.producerForm.errors.website?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="producer.field.website"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control" ref="website"
			  												value={this.props.producerForm.values.website}
			  												onChange={event => this._onChangeField('website', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.producerForm.errors.website ? 'block': 'none'}}>
			  												<Translate value={this.props.producerForm.errors.website}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className={this.props.producerForm.errors.description?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="producer.field.description"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control"
			  												value={this.props.producerForm.values.description}
			  												onChange={event => this._onChangeField('description', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.producerForm.errors.description ? 'block': 'none'}}>
			  												<Translate value={this.props.producerForm.errors.description}/>
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

const mapStateToProps = ({producerForm, producers, producer}) => {
	return {
		producerForm, producers, producer
	};
};

const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		...producerFormActions,
		...producerListActions,
		...producerDetailActions
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ProducerFormView);