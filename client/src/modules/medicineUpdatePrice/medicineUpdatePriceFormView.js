const {Translate, I18n} = ReactReduxI18n;

import * as medicineUpdatePriceFormActions from 'modules/medicineUpdatePrice/actions/form';
import * as medicineUpdatePriceListActions from 'modules/medicineUpdatePrice/actions/list';
import * as medicineUpdatePriceDetailActions from 'modules/medicineUpdatePrice/actions/detail';

import {loadList as medicineGroupLoadList} from 'modules/medicineGroup/actions/list';
import {loadOnlyMedicine as medicineLoadList, changeList as medicineChangeList} from 'modules/medicine/actions/list';

import DatepickerReadOnly from 'common/components/DatepickerReadOnly';

class MedicineUpdatePriceFormView extends React.Component{
    	
    	constructor(){
		super();
		this.state = {
			confirm: false,
			disabled: true, 
			defaultDate: moment().add(0, 'days')
		};
	}
	componentDidMount(){
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
		// Helper.CheckPageHeight();
	}
	componentWillUnmount(){
		Keyboard.unbind('f4');
		Keyboard.unbind('f6');
		Keyboard.unbind('f8');
		Keyboard.unbind('up');
		Keyboard.unbind('down');
		Keyboard.unbind('esc');
	}	
	_loadAll(){
		this.props.medicineGroupLoadList().then(() => {
			//$('#medicine_group_id').val('1').change();
		});
		this.props.medicineLoadList();
	}
	_loadLocalMedicine(medicine_group_id){
		if(typeof medicine_group_id === 'undefined'){
			this.props.medicineLoadList();
			return [];
		}
		else
			return Helper.GetListFilter(this.props.medicines.listRoot, {medicine_group_id});		
	}
	_onChangeField(field, value){
		let error = '';
		switch(field){
			case 'new_listed_price':
			case 'new_retail_price':
			case 'new_wholesale_price':
			case 'new_input_price':
			case 'medicine_update_price_date':
				if(Check.CheckEmpty(value))
					error = 'application.validation.required';
				else
					error = '';
				break;
			case 'medicine_id': {
				if(Check.CheckEmpty(value)){
					error = 'application.validation.required';
				}
				else
				{
					error = '';
				
				for(var i = 1; i < this.props.medicines.listRoot.length; i++){
						let medicine = this.props.medicines.listRoot[i];
						if(parseFloat(value) == medicine.id){
							this.props.formChange('input_price', medicine.input_price);
							this.props.formChange('retail_price', medicine.retail_price);
							this.props.formChange('wholesale_price', medicine.wholesale_price);
							this.props.formChange('medicine_group_id', medicine.medicine_group_id);
							this.props.formChange('listed_price', medicine.listed_price);
						}
					}
				}
				break;
			}
			case 'medicine_group_id':
			{
				if(Check.CheckEmpty(value)){
					error = 'application.validation.required';
				}
				else
				{
					error = '';
					const medicines = this._loadLocalMedicine(value);
					this.props.medicineChangeList(medicines);
				}
				break;
			}
		}
		this.props.formChange(field, value);
		this.props.formValidation(field, error);
	}
	_onClickAdd(){
		this._setFormMode('add');
		this.refs[this.props.medicineUpdatePriceForm.focus].focus();
		this.setState({disabled: false})

		// update value datepicker
		this.props.formChange('medicine_update_price_date', this.state.defaultDate);
	}
	_setFormMode(type){
		switch(type){
			case 'add':
				this.props.formChangeMode('add');
				this.refs[this.props.medicineUpdatePriceForm.focus].focus();
				this.props.formClear();
				break;
		}
	}
	_onValidationSubmit(){
		const {
			new_input_price, 
			medicine_update_price_date, 
			medicine_group_id, 
			new_listed_price, 
			new_retail_price,
			new_wholesale_price,
			medicine_id
		} = this.props.medicineUpdatePriceForm.values;

		this._onChangeField('new_input_price', new_input_price);
		this._onChangeField('new_wholesale_price', new_wholesale_price);
		this._onChangeField('new_retail_price', new_retail_price);
		this._onChangeField('new_listed_price', new_listed_price);
		this._onChangeField('medicine_group_id', medicine_group_id);
		this._onChangeField('medicine_id', medicine_id);
		this._onChangeField('medicine_update_price_date', medicine_update_price_date);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const errors = this.props.medicineUpdatePriceForm.errors;
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
		switch(this.props.medicineUpdatePriceForm.mode){
			case 'add':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.medicineUpdatePriceForm.values);
						delete values.key;
						this.props.formAdd(values)
						.then(obj => {
							this.props.formClear();
							toastr.success(I18n.t('success.add.message'), I18n.t('success.add.title'));
						})
					}
				})
				break;
		}
	}
        
	_onReviewAndPrint(){
    	axios.post(`${Config.API_URL}medicine-update-price/pdfExport`, null, {
			responseType: 'arraybuffer'
		})
		.then((response) => {
			let downloadLink = document.createElement('a');
  			downloadLink.target   = '_blank';

  			const date = Moment(new Date()).format('YYYY.MM.DD_HH.mm.ss');
  			const fileName = `medicines_update_price_report_${date}.pdf`;
			downloadLink.download = fileName;

			const blob = new Blob([response.data], { type: 'application/pdf' });
			var URL = window.URL || window.webkitURL;
  			var downloadUrl = URL.createObjectURL(blob);

  			downloadLink.href = downloadUrl;

			document.body.append(downloadLink);

			downloadLink.click();

			document.body.removeChild(downloadLink);
			URL.revokeObjectURL(downloadUrl);
		})
		.catch((error) => {
			
		})        
    }
        
        _onSearchNew(){
            
        }
        
	_onSearch(field, value){
		this.props.changeSearchList(field, value);
		setTimeout(() => {
			const list = Helper.GetListFilter(this.props.medicineUpdatePrices.listRoot, this.props.medicineUpdatePrices.search);
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
	_onExit(){
		this.props.push(Routes.dashboard.view);
	}
        
  	render(){
  		var disabled = this.state.disabled ? 'disabled' : ''
  		return (
                        <div className="page-content-inner">
				<div className="row">
					<div className="col-md-12">
						<div className="portlet box green">
			  				<div className="portlet-title">
			  					<div className="caption">
			  						<Translate value="medicineUpdatePrice.title"/>
			  					</div>
			  				</div>
			  				<div className="portlet-body">
			  					<div className="form-horizontal">
			  						<div className="form-body">
			  							<div className="row">
			  								<div className="col-md-12">
							  					<div className="form-group">
													<label className="control-label col-md-2">
														<Translate value="medicineUpdatePrice.search.name"/>
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
			  									<div className={this.props.medicineUpdatePriceForm.errors.medicine_group_id?'form-group has-error':'form-group'}>
                                                    <label className="control-label col-md-4">
                                                        <Translate value="medicineUpdatePrice.field.medicine_group_id"/>
                                                    </label>
                                                    <div className="col-md-8">
                                                        <select disabled={disabled} className="form-control" id="medicine_group_id" ref="code" onChange={event => this._onChangeField('medicine_group_id', event.target.value)}
                                                                value={this.props.medicineUpdatePriceForm.values.medicine_group_id}>
                                                                {
                                                                        this.props.medicineGroups.listRoot.map((medicineGroup, key) => {
                                                                                return (
                                                                                        <option key={key} value={medicineGroup.id}>{medicineGroup.name}</option>
                                                                                );
                                                                        })
                                                                }
                                                        </select>
                                                        <span className="help-block" style={{display: this.props.medicineUpdatePriceForm.errors.medicine_group_id ? 'block': 'none'}}>
															<Translate value={this.props.medicineUpdatePriceForm.errors.medicine_group_id}/>
														</span>
                                                    </div>
                                                </div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className={this.props.medicineUpdatePriceForm.errors.medicine_id?'form-group has-error':'form-group'}>
                                                    <label className="control-label col-md-4">
                                                        <Translate value="medicineUpdatePrice.field.medicine_code"/>
                                                    </label>
                                                    <div className="col-md-8">
                                                        <select disabled={disabled} className="form-control" onChange={event => this._onChangeField('medicine_id', event.target.value)}
                                                                value={this.props.medicineUpdatePriceForm.values.medicine_id}>
                                                                {
                                                                        this.props.medicines.list.map((medicine, key) => {
                                                                                return (
                                                                                        <option key={key} value={medicine.id}>{medicine.code}</option>
                                                                                );
                                                                        })
                                                                }
                                                        </select>
                                                        <span className="help-block" style={{display: this.props.medicineUpdatePriceForm.errors.medicine_id ? 'block': 'none'}}>
															<Translate value={this.props.medicineUpdatePriceForm.errors.medicine_id}/>
														</span>
                                                    </div>
                                                </div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className={this.props.medicineUpdatePriceForm.errors.medicine_id?'form-group has-error':'form-group'}>
                                                    <label className="control-label col-md-4">
                                                        <Translate value="medicineUpdatePrice.field.medicine_name"/>
                                                    </label>
                                                    <div className="col-md-8">
                                                        <select disabled={disabled} className="form-control" onChange={event => this._onChangeField('medicine_id', event.target.value)}
                                                                value={this.props.medicineUpdatePriceForm.values.medicine_id}>
                                                                {
                                                                        this.props.medicines.list.map((medicine, key) => {
                                                                                return (
                                                                                        <option key={key} value={medicine.id}>{medicine.name}</option>
                                                                                );
                                                                        })
                                                                }
                                                        </select>
                                                        <span className="help-block" style={{display: this.props.medicineUpdatePriceForm.errors.medicine_id ? 'block': 'none'}}>
															<Translate value={this.props.medicineUpdatePriceForm.errors.medicine_id}/>
														</span>
                                                    </div>
                                                </div>
			  								</div>
			  							</div>

			  							<div className="row">
			  								<div className="col-md-4">
			  									<div className={this.props.medicineUpdatePriceForm.errors.medicine_update_price_date?'form-group has-error':'form-group'}>
                                                    <label className="control-label col-md-4">
                                                        <Translate value="medicineUpdatePrice.field.medicine_update_price_date"/>
                                                    </label>
                                                    <div className="col-md-8">
                                                        <DatepickerReadOnly value={this.props.medicineUpdatePriceForm.values.medicine_update_price_date} onChange={(value) => this._onChangeField('medicine_update_price_date', value)}/>
                                                        <span className="help-block" style={{display: this.props.medicineUpdatePriceForm.errors.medicine_update_price_date ? 'block': 'none'}}>
															<Translate value={this.props.medicineUpdatePriceForm.errors.medicine_update_price_date}/>
														</span>
                                                    </div>
                                                </div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className='form-group'>
                                                    <label className="control-label col-md-4">
                                                        <Translate value="medicineUpdatePrice.field.input_price"/>
                                                    </label>
                                                    <div className="col-md-8">
                                                        <input type="text" className="form-control" readOnly value={this.props.medicineUpdatePriceForm.values.input_price}/>
                                                    </div>
                                                </div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className='form-group'>
                                                    <label className="control-label col-md-4">
                                                        <Translate value="medicineUpdatePrice.field.wholesale_price"/>
                                                    </label>
                                                    <div className="col-md-8">
                                                        <input type="text" className="form-control" readOnly value={this.props.medicineUpdatePriceForm.values.wholesale_price}/>
                                                    </div>
                                                </div>
			  								</div>
			  							</div>

			  							<div className="row">
			  								<div className="col-md-4">
			  									<div className='form-group'>
                                                    <label className="control-label col-md-4">
                                                        <Translate value="medicineUpdatePrice.field.retail_price"/>
                                                    </label>
                                                    <div className="col-md-8">
                                                        <input type="text" className="form-control" readOnly value={this.props.medicineUpdatePriceForm.values.retail_price}/>
                                                    </div>
                                                </div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className='form-group'>
                                                    <label className="control-label col-md-4">
                                                        <Translate value="medicineUpdatePrice.field.listed_price"/>
                                                    </label>
                                                    <div className="col-md-8">
                                                        <input type="text" className="form-control" readOnly value={this.props.medicineUpdatePriceForm.values.listed_price}/>
                                                    </div>
                                                </div>
			  								</div>
			  							</div>

			  							<div className="row">
			  								<div className="col-md-4">
			  									<div className={this.props.medicineUpdatePriceForm.errors.new_input_price?'form-group has-error':'form-group'}>
                                                    <label className="control-label col-md-4">
                                                        <Translate value="medicineUpdatePrice.field.new_input_price"/>
                                                    </label>
                                                    <div className="col-md-8">
                                                         <input disabled={disabled} type="number" min="0" className="form-control text-right" ref="new_input_price"
															value={this.props.medicineUpdatePriceForm.values.new_input_price}
															onChange={event => this._onChangeField('new_input_price', event.target.value)}/>
														<span className="help-block" style={{display: this.props.medicineUpdatePriceForm.errors.new_input_price ? 'block': 'none'}}>
															<Translate value={this.props.medicineUpdatePriceForm.errors.new_input_price}/>
														</span>
                                                    </div>
                                                </div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className={this.props.medicineUpdatePriceForm.errors.new_wholesale_price?'form-group has-error':'form-group'}>
                                                    <label className="control-label col-md-4">
                                                        <Translate value="medicineUpdatePrice.field.new_wholesale_price"/>
                                                    </label>
                                                    <div className="col-md-8">
                                                        <input disabled={disabled} type="number" min="0" className="form-control text-right" ref="new_wholesale_price"
															value={this.props.medicineUpdatePriceForm.values.new_wholesale_price}
															onChange={event => this._onChangeField('new_wholesale_price', event.target.value)}/>
														<span className="help-block" style={{display: this.props.medicineUpdatePriceForm.errors.new_wholesale_price ? 'block': 'none'}}>
															<Translate value={this.props.medicineUpdatePriceForm.errors.new_wholesale_price}/>
														</span>
                                                    </div>
                                                </div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className={this.props.medicineUpdatePriceForm.errors.new_retail_price?'form-group has-error':'form-group'}>
                                                    <label className="control-label col-md-4">
                                                        <Translate value="medicineUpdatePrice.field.new_retail_price"/>
                                                    </label>
                                                    <div className="col-md-8">
                                                        <input disabled={disabled} type="number" min="0" className="form-control text-right" ref="new_retail_price"
															value={this.props.medicineUpdatePriceForm.values.new_retail_price}
															onChange={event => this._onChangeField('new_retail_price', event.target.value)}/>
														<span className="help-block" style={{display: this.props.medicineUpdatePriceForm.errors.new_retail_price ? 'block': 'none'}}>
															<Translate value={this.props.medicineUpdatePriceForm.errors.new_retail_price}/>
														</span>
                                                    </div>
                                                </div>
			  								</div>
			  							</div>

			  							<div className="row">
			  								<div className="col-md-4">
			  									<div className={this.props.medicineUpdatePriceForm.errors.new_listed_price?'form-group has-error':'form-group'}>
                                                    <label className="control-label col-md-4">
                                                        <Translate value="medicineUpdatePrice.field.new_listed_price"/>
                                                    </label>
                                                    <div className="col-md-8">
                                                        <input disabled={disabled} type="number" min="0" className="form-control text-right" ref="new_listed_price"
															value={this.props.medicineUpdatePriceForm.values.new_listed_price}
															onChange={event => this._onChangeField('new_listed_price', event.target.value)}/>
														<span className="help-block" style={{display: this.props.medicineUpdatePriceForm.errors.new_listed_price ? 'block': 'none'}}>
															<Translate value={this.props.medicineUpdatePriceForm.errors.new_listed_price}/>
														</span>
                                                    </div>
                                                </div>
			  								</div>
			  								<div className="col-md-8">
			  									<div className='form-group'>
                                                    <label className="control-label col-md-2">
                                                        <Translate value="medicineUpdatePrice.field.description"/>
                                                    </label>
                                                    <div className="col-md-10">
                                                        <input disabled={disabled} type="text" className="form-control" ref="description"
															value={this.props.medicineUpdatePriceForm.values.description}
															onChange={event => this._onChangeField('description', event.target.value)}/>
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
						  									<button type="button" className="btn green btn-customer-size" disabled={disabled}
						  										onClick={this._onSave.bind(this)}>
						  										<Translate value="application.button.edit"/>
						  									</button>
						  									&nbsp;
						  									<button type="button" className="btn green btn-customer-size"
						  										onClick={this._onReviewAndPrint.bind(this)}>
						  										<Translate value="application.button.review_and_print"/>
						  									</button>
						  									&nbsp;
						  									<button type="button" className="btn green btn-customer-size"
						  										onClick={this._onSearchNew.bind(this)}>
						  										<Translate value="application.button.search"/>
						  									</button>
						  									&nbsp;
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

const mapStateToProps = ({medicineUpdatePriceForm, medicineUpdatePrices, medicineUpdatePrice, medicineGroups, medicines}) => {
	return {
		medicineUpdatePriceForm, medicineUpdatePrices, medicineUpdatePrice, medicineGroups, medicines
	};
};

const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		...medicineUpdatePriceFormActions,
		...medicineUpdatePriceListActions,
		...medicineUpdatePriceDetailActions,
		medicineGroupLoadList,
		medicineLoadList,
		medicineChangeList
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(MedicineUpdatePriceFormView);