const {Translate, I18n} = ReactReduxI18n;

import * as medicineFormActions from 'modules/medicine/actions/form';
import * as medicineListActions from 'modules/medicine/actions/list';
import * as medicineDetailActions from 'modules/medicine/actions/detail';
import {loadList as medicineGroupLoadList} from 'modules/medicineGroup/actions/list';
import {selectDetail as medicineGroupSelectDetail} from 'modules/medicineGroup/actions/detail';
import {loadList as materialLoadList} from 'modules/material/actions/list';
import MultiSelect from 'common/components/MultiSelect';
import Modal from 'common/components/Modal';		
import MaterialFormView from 'modules/material/MaterialFormView';

class MedicineInfoFormView extends React.Component{
	constructor(){
		super();
		this.state = {
			confirm: false,
			materialPopup: false
		};
	}
	componentDidMount(){
		this._loadMedicineGroupList();
                this.props.materialLoadList();
                
		Keyboard.bind('f6', event => {
			this._onSave();
		});
		Keyboard.bind('esc', event => {
			this._onExit();
		});
		Helper.CheckPageHeight(300);
	}
	_loadMedicineGroupList(){
		Helper.PageBlock(I18n.t('application.text.loading'));
		this.props.medicineGroupLoadList()
		.then(() => {
			if(this.props.medicineGroups.list.length === 1){
				this.props.medicineGroupSelectDetail(this.props.medicineGroups.list[0], 0);
			}else{
				this.props.medicineGroupSelectDetail(this.props.medicineGroups.list[1], 1);
				setTimeout(() => {
					this._loadMedicineList();
				}, 0);
			}
		});
	}
	componentWillUnmount(){
		Keyboard.unbind('f6');
		Keyboard.unbind('esc');
		this.props.clearSearchList();
	}
	_loadMedicineList(){
		const search = $.extend({}, this.props.medicine.search);
		search.medicine_group_id = this.props.medicineGroup.detail.id;
		this.props.loadListParams(search)
		.then(() => {
			if(this.props.medicines.list.length === 1){
				this.props.selectDetail(this.props.medicines.list[0], 0);
			}else{
				this.props.selectDetail(this.props.medicines.list[1], 1);
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
			case 'medicine_group_id':
				
					if(Check.CheckEmpty(value))
						error = 'application.validation.required';
					else
						error = '';
				break;
			case 'unit_parent_id':
				
					if(Check.CheckEmpty(value))
						error = 'application.validation.required';
					else
						error = '';
				break;
			case 'unit_children_id':
				
					if(Check.CheckEmpty(value))
						error = 'application.validation.required';
					else
						error = '';
				break;
			case 'producer_id':
				
					if(Check.CheckEmpty(value))
						error = 'application.validation.required';
					else
						error = '';
				break;
			case 'treatment_group_id':
				
					if(Check.CheckEmpty(value))
						error = 'application.validation.required';
					else
						error = '';
				break;
			case 'storage_position_id':
				
					if(Check.CheckEmpty(value))
						error = 'application.validation.required';
					else
						error = '';
				break;
			case 'storage_condition_id':
				
					if(Check.CheckEmpty(value))
						error = 'application.validation.required';
					else
						error = '';
				break;
//			case 'material_id':
//				
//					if(value.length === 0)
//						error = 'application.validation.required';
//					else
//						error = '';
//				break;
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
				this.refs[this.props.medicineForm.focus].focus();
				this.props.formClear();
				break;
			case 'edit':
				this.props.formChangeMode('edit');
				break;
		}
	}
	_onValidationSubmit(){
		const {code, name, medicine_group_id, unit_parent_id, unit_children_id, producer_id, treatment_group_id, storage_condition_id, storage_position_id, material_id} = this.props.medicineForm.values;
		this._onChangeField('code', code);
		this._onChangeField('name', name);
		this._onChangeField('medicine_group_id', medicine_group_id);
		this._onChangeField('unit_parent_id', unit_parent_id);
		this._onChangeField('unit_children_id', unit_children_id);
		this._onChangeField('producer_id', producer_id);
		this._onChangeField('treatment_group_id', treatment_group_id);
		this._onChangeField('storage_condition_id', storage_condition_id);
		this._onChangeField('storage_position_id', storage_position_id);
		this._onChangeField('material_id', material_id);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const errors = this.props.medicineForm.errors;
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
	_onRemoveValues(values){
		delete values.material;
		delete values.producer;
		delete values.storage_condition;
		delete values.storage_position;
		delete values.treatment_group;
		delete values.unit1;
		delete values.unit2;
		delete values.header;
		delete values.size;
		delete values.group;
		return values;
	}
	_onSave(){
		let values = $.extend({}, this.props.medicineForm.values);
		let key = values.key;
		delete values.key;
		delete values.materials;
		values = this._onRemoveValues(values);
		this.props.formEdit(values)
		.then(obj => {
			values.key = key;
			this._loadMedicineList();
		})
	}
	_onClickRow(medicine, key){
		this.props.selectDetail(medicine, key);
	}
	_onSearch(field, value){
		this.props.changeSearchList(field, value);
		setTimeout(() => {
			const list = Helper.GetListFilter(this.props.medicines.listRoot, this.props.medicines.search);
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
	
	_scrollIntoRow(key, asterisk){
		Helper.ScrollPerRow(`#row-${key}`, '#list-container', key);
	}
	_scrollRow(key, asterisk){
		Helper.ScrollRow(`#row-${key}`, '#list-container', asterisk);
	}
	_onExit(){
		this.props.push(Routes.dashboard.view);
	}
	_onClickExportPDF(){
		axios.post(`${Config.API_URL}medicine/pdfExport`, null, {
			responseType: 'arraybuffer'
		})
		.then((response) => {
			let downloadLink = document.createElement('a');
  			downloadLink.target   = '_blank';

  			const date = Moment(new Date()).format('YYYY.MM.DD_HH.mm.ss');
  			const fileName = `medicines_report_${date}.pdf`;
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
	_onClickExportExcel(){
		axios.post(`${Config.API_URL}medicine/excelExport`, null, {
			responseType: 'arraybuffer'
		})
		.then((response) => {
			let downloadLink = document.createElement('a');
  			downloadLink.target   = '_blank';

  			const date = Moment(new Date()).format('YYYY.MM.DD_HH.mm.ss');
  			const fileName = `medicines_report_${date}.xlsx`;
			downloadLink.download = fileName;

			const blob = new Blob([response.data], { type: 'application/xlsx' });
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
	_onClickRowMedicineGroup(medicineGroup, key){
		this.props.medicineGroupSelectDetail(medicineGroup, key);
		setTimeout(() => {
			this._loadMedicineList();
		}, 0);
	}
  	render(){
  		return (
			<div className="page-content-inner">
				<Modal
					modal={this.state.materialPopup}
					onRequestClose={()=>this.setState({materialPopup: false})}>
					<div className="modal-body">
						<MaterialFormView popup={true} onExit={()=>this.setState({materialPopup: false})} onSelect={(material) => {
							this.setState({materialPopup: false}, () => {
								this.props.materialLoadList().then(() => {
									const material_id = $.extend([], this.props.medicineForm.values.material_id);
									material_id.push(material.id);
									this.props.formChange('material_id', material_id);
								});
							});
						}}/>
					</div>
				</Modal>
				<div className="row">
					<div className="col-md-12">
						<div className="portlet box green">
			  				<div className="portlet-title">
			  					<div className="caption">
			  						<Translate value="medicine.nameInfo"/>
			  					</div>
			  				</div>
			  				<div className="portlet-body">
			  					<div className="row">
			  						<div className="col-md-3">
			  							<div className="table-scrollable">
					  						<table className="table fixed-header table-bordered" id="list-medicine-group">
					  							<thead>
					  								<tr>
					  									<th><Translate value="medicineGroup.field.name"/></th>
					  								</tr>
					  							</thead>
					  							<tbody>
					  								{
					  									this.props.medicineGroups.listRoot.map((medicineGroup, key) => {
					  										if(medicineGroup.id !== -1){
						  										if(medicineGroup.sorted || typeof medicineGroup.sorted === 'undefined'){
							  										return (
							  											<tr key={key} className={this.props.medicineGroup.detail.id === medicineGroup.id ? 'row-active': ''}
							  												id={`row-${key}`}
							  												onClick={this._onClickRowMedicineGroup.bind(this, medicineGroup, key)}>
							  												<td>{medicineGroup.name}</td>
							  											</tr>
							  										);
							  									}
							  								}else{
							  									if(this.props.medicineGroups.list.length === 1){
							  										return (
							  											<tr key={key}>
							  												<td className="text-center">
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
			  						</div>
			  						<div className="col-md-4">
			  							<div className="table-scrollable">
					  						<table className="table fixed-header table-bordered" id="list-medicine">
					  							<thead>
					  								<tr>
					  									<th><Translate value="medicine.field.name"/></th>
					  								</tr>
					  							</thead>
					  							<tbody>
					  								{
					  									this.props.medicines.list.map((medicine, key) => {
					  										if(medicine.id !== -1){
						  										if(medicine.sorted || typeof medicine.sorted === 'undefined'){
							  										return (
							  											<tr key={key} className={this.props.medicine.detail.id === medicine.id ? 'row-active': ''}
							  												id={`row-${key}`}
							  												onClick={this._onClickRow.bind(this, medicine, key)}>
							  												<td>{medicine.name}</td>
							  											</tr>
							  										);
							  									}
							  								}else{
							  									if(this.props.medicines.list.length === 1){
							  										return (
							  											<tr key={key}>
							  												<td colSpan="1" className="text-center">
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
			  						</div>
			  						<div className="col-md-5">
			  							<div className="form-horizontal">
					  						<div className="form-body">
					  							<div className="row">
					  								<div className="col-md-12">
					  									<center><h4><Translate value="medicine.nameInfo"/></h4></center>
					  								</div>
					  							</div>
					  							<div className="row">
					  								<div className="col-md-12">
					  									<div className={this.props.medicineForm.errors.name?'form-group has-error':'form-group'}>
					  										<label className="control-label col-md-3">
					  											<Translate value="medicine.field.name"/>
					  										</label>
					  										<div className="col-md-9">
					  											<p className="form-control-static">{this.props.medicineForm.values.name}</p>
					  										</div>
					  									</div>
					  								</div>
					  								<div className="col-md-12">
					  									<div className={this.props.medicineForm.errors.specification?'form-group has-error':'form-group'}>
					  										<label className="control-label col-md-3">
					  											<Translate value="medicine.field.specification"/>
					  										</label>
					  										<div className="col-md-9">
					  											<input type="number" min="0" className="form-control" ref="specification"
					  												value={this.props.medicineForm.values.specification}
					  												onChange={event => this._onChangeField('specification', event.target.value)}/>
					  											<span className="help-block" style={{display: this.props.medicineForm.errors.specification ? 'block': 'none'}}>
					  												<Translate value={this.props.medicineForm.errors.specification}/>
					  											</span>
					  										</div>
					  									</div>
					  								</div>
					  								<div className="col-md-12">
					  									<div className={this.props.medicineForm.errors.no_registration?'form-group has-error':'form-group'}>
					  										<label className="control-label col-md-3">
					  											<Translate value="medicine.field.no_registration"/>
					  										</label>
					  										<div className="col-md-9">
					  											<input type="text" className="form-control" ref="no_registration"
					  												value={this.props.medicineForm.values.no_registration}
					  												onChange={event => this._onChangeField('no_registration', event.target.value)}/>
					  											<span className="help-block" style={{display: this.props.medicineForm.errors.no_registration ? 'block': 'none'}}>
					  												<Translate value={this.props.medicineForm.errors.no_registration}/>
					  											</span>
					  										</div>
					  									</div>
					  								</div>
					  								<div className="col-md-12">
					  									<div className={this.props.medicineForm.errors.dosage_form?'form-group has-error':'form-group'}>
					  										<label className="control-label col-md-3">
					  											<Translate value="medicine.field.dosage_form"/>
					  										</label>
					  										<div className="col-md-9">
					  											<input type="text" className="form-control" ref="dosage_form"
					  												value={this.props.medicineForm.values.dosage_form}
					  												onChange={event => this._onChangeField('dosage_form', event.target.value)}/>
					  											<span className="help-block" style={{display: this.props.medicineForm.errors.dosage_form ? 'block': 'none'}}>
					  												<Translate value={this.props.medicineForm.errors.dosage_form}/>
					  											</span>
					  										</div>
					  									</div>
					  								</div>
					  								<div className="col-md-12">
					  									<div className={this.props.medicineForm.errors.company_registration?'form-group has-error':'form-group'}>
					  										<label className="control-label col-md-3">
					  											<Translate value="medicine.field.company_registration"/>
					  										</label>
					  										<div className="col-md-9">
					  											<input type="text" className="form-control" ref="company_registration"
					  												value={this.props.medicineForm.values.company_registration}
					  												onChange={event => this._onChangeField('company_registration', event.target.value)}/>
					  											<span className="help-block" style={{display: this.props.medicineForm.errors.company_registration ? 'block': 'none'}}>
					  												<Translate value={this.props.medicineForm.errors.company_registration}/>
					  											</span>
					  										</div>
					  									</div>
					  								</div>

                                                    <div className="col-md-12">
					  									<div className={this.props.medicineForm.errors.medicine_information?'form-group has-error':'form-group'}>
					  										<label className="control-label col-md-3">
					  											<Translate value="medicine.field.medicine_information"/>
					  										</label>
					  										<div className="col-md-9">
					  											<input type="text" className="form-control" ref="medicine_information"
					  												value={this.props.medicineForm.values.medicine_information}
					  												onChange={event => this._onChangeField('medicine_information', event.target.value)}/>
					  											<span className="help-block" style={{display: this.props.medicineForm.errors.medicine_information ? 'block': 'none'}}>
					  												<Translate value={this.props.medicineForm.errors.medicine_information}/>
					  											</span>
					  										</div>
					  									</div>
					  								</div>
                                                                                                        <div className="col-md-12">
                                                                                                            <div className={this.props.medicineForm.errors.material_id?'form-group has-error':'form-group'}>
                                                                                                                <label className="control-label col-md-3">
                                                                                                                        <Translate value="medicine.field.material_id"/>
                                                                                                                </label>
                                                                                                                <div className="col-md-9">
                                                                                                                                                                                                                                <div className="input-group">
                                                                                                                                                                                                                                        <MultiSelect code="id" display="name" list={this.props.materials.listRoot}
                                                                                                                                defaultValue={this.props.medicineForm.values.materials} value={this.props.medicineForm.values.material_id}
                                                                                                                                onChange={value => this._onChangeField('material_id', value)}/>
                                                                                                                        <span className="help-block" style={{display: this.props.medicineForm.errors.material_id ? 'block': 'none'}}>
                                                                                                                                <Translate value={this.props.medicineForm.errors.material_id}/>
                                                                                                                        </span>
                                                                                                                                                                                                                                        <span className="input-group-btn">
                                                                                                                                                                                                                                                <button className="btn btn-primary"
                                                                                                                                onClick={() => this.setState({materialPopup: true})}>
                                                                                                                                                                                                                                                        <span className="glyphicon glyphicon-plus" onClick={() => this.setState({materialPopup: true})}></span>
                                                                                                                                                                                                                                                </button>
                                                                                                                                                                                                                                        </span>
                                                                                                                                                                                                                                </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
					  							</div>
                                                                                                
					  							<div className="form-actions">
								  					<div className="row">
								  						<div className="col-md-3"></div>
								  						<div className="col-md-9">
								  							<div className="row">
								  								<div className="col-md-2">
								  									<button type="button" className="btn green btn-customer-size"
								  										onClick={this._onSave.bind(this)}>
								  										<Translate value="application.button.edit"/>
								  									</button>
								  								</div>
								  								<div className="col-md-1"></div>
								  								<div className="col-md-2">
								  								</div>
								  								<div className='col-sm-6'></div>
								  								<div className="col-md-1">
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
  		);
  	};
};

const mapStateToProps = ({medicineForm, medicines, medicine, medicineGroups, medicineGroup, materials}) => {
	return {
		medicineForm, medicines, medicine, medicineGroups, medicineGroup, materials
	};
};

const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		...medicineFormActions,
		...medicineListActions,
		...medicineDetailActions,
		medicineGroupLoadList,
		medicineGroupSelectDetail, 
                materialLoadList
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(MedicineInfoFormView);