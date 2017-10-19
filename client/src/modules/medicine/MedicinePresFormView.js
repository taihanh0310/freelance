const {Translate, I18n} = ReactReduxI18n;

import * as medicineFormActions from 'modules/medicine/actions/form';
import * as medicineListActions from 'modules/medicine/actions/list';
import * as medicineDetailActions from 'modules/medicine/actions/detail';
import {loadList as medicineGroupLoadList} from 'modules/medicineGroup/actions/list';
import {loadList as storagePositionLoadList} from 'modules/storagePosition/actions/list';
import {loadList as storageConditionLoadList} from 'modules/storageCondition/actions/list';
import {loadList as treatmentGroupLoadList} from 'modules/treatmentGroup/actions/list';
import {loadList as materialLoadList} from 'modules/material/actions/list';
import {loadList as producerLoadList} from 'modules/producer/actions/list';
import {loadList as unitLoadList} from 'modules/unit/actions/list';
import MultiSelect from 'common/components/MultiSelect';
import Modal from 'common/components/Modal';		
import MaterialFormView from 'modules/material/MaterialFormView';
import MedicineGroupFormView from 'modules/medicineGroup/MedicineGroupFormView';
import UnitFormView from 'modules/unit/UnitFormView';
import ProducerFormView from 'modules/producer/ProducerFormView';
import StorageConditionFormView from 'modules/storageCondition/StorageConditionFormView';
import StoragePositionFormView from 'modules/storagePosition/StoragePositionFormView';
import TreatmentGroupFormView from 'modules/treatmentGroup/TreatmentGroupFormView';

class MedicinePresFormView extends React.Component{
	constructor(){
		super();
		this.state = {
			confirm: false,
			materialPopup: false,
			medicineGroupPopup: false,
			unitParentPopup: false,
            unitChildPopup: false,
            treatmentGroupPopup: false,
            producerPopup: false,
            storageConditionPopup: false,
            storagePositionPopup: false
		};
	}
	componentDidMount(){
		this._loadMedicineList();
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
		Helper.CheckPageHeight(300);
	}
	_loadAll(){
		const self = this;
		this.props.medicineGroupLoadList();
		this.props.storagePositionLoadList();
		this.props.storageConditionLoadList();
		this.props.treatmentGroupLoadList();
		this.props.producerLoadList();
		this.props.materialLoadList().then(() => {

		});
		this.props.unitLoadList();
	}
	componentWillUnmount(){
		Keyboard.unbind('f4');
		Keyboard.unbind('f6');
		Keyboard.unbind('f8');
		Keyboard.unbind('up');
		Keyboard.unbind('down');
		Keyboard.unbind('esc');
		this.props.clearSearchList();
	}
	_loadMedicineList(){
		Helper.PageBlock(I18n.t('application.text.loading'));
		this.props.loadListPres()
		.then(() => {
			if(this.props.medicines.list.length === 1){
				this.props.selectDetail(this.props.medicines.list[0], 0);
				this._setFormMode('add');
			}else{
				this.props.selectDetail(this.props.medicines.list[1], 1);
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
			case 'listed_price':
			case 'wholesale_price':
			case 'retail_price': 
			case 'input_price':{
				if(!Check.CheckEmpty(value)){
					if(!Check.checkCurrency(value)){
	                    error = 'application.validation.currency';
	                }else{
	                    error = '';
	                }
				}
				else{
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
				this.refs[this.props.medicineForm.focus].focus();
				this.props.formClear();
				break;
			case 'edit':
				this.props.formChangeMode('edit');
				break;
		}
	}
	_onValidationSubmit(){
		const {
				code, 
				name, 
				medicine_group_id, 
				unit_parent_id, 
				unit_children_id, 
				producer_id, 
				treatment_group_id, 
				storage_condition_id, 
				storage_position_id, 
				material_id,
				listed_price,
				input_price,
				wholesale_price,
				retail_price
			} = this.props.medicineForm.values;

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
		this._onChangeField('listed_price', listed_price);
		this._onChangeField('input_price', input_price);
		this._onChangeField('wholesale_price', wholesale_price);
		this._onChangeField('retail_price', retail_price);

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
		switch(this.props.medicineForm.mode){
			case 'add':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.medicineForm.values);
						delete values.key;
						values = this._onRemoveValues(values);
						this.props.formAdd(values)
						.then(obj => {
							this.props.formClear();
							this._loadMedicineList();
						})
					}
				})
				break;
			case 'edit':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.medicineForm.values);
						let key = values.key;
						delete values.materials;
						delete values.key;
						values = this._onRemoveValues(values);
						this.props.formEdit(values)
						.then(obj => {
							values.key = key;
							this._loadMedicineList();
						})
					}
				})
				break;
		}
	}
	_onClickRow(medicine, key){
		this.props.formClear();
		this.props.selectDetail(medicine, key);
		this._setFormMode('edit');
	}
	_onClickDelete(){
		if(this.props.medicine.detail.id !== -1)
			this.setState({confirm: true})
	}
	_onDelete(){
		this.props.formDelete(this.props.medicine.detail.id)
		.then(() => {
			this._loadMedicineList();
			this.setState({confirm: false});
		});
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
	_onPreviousRow(){
		if(this.props.medicine.detail.id){
			const medicines = this.props.medicines.list;
			if(this.props.medicine.key > 1){
				this.props.selectDetail(medicines[this.props.medicine.key-1], this.props.medicine.key-1);
				this._scrollIntoRow(this.props.medicine.key);
			}
				
		}
	}
	_onNextRow(){
		if(this.props.medicine.detail.id){
			if(this.props.medicine.key < this.props.medicines.list.length-1){
				this.props.selectDetail(this.props.medicines.list[this.props.medicine.key+1], this.props.medicine.key+1);
				this._scrollIntoRow(this.props.medicine.key);
			}
		}
	}
	_onFirstRow(){
		if(this.props.medicine.key !== 0){
			this.props.selectDetail(this.props.medicines.list[1], 1);
			this._scrollRow(1, '-');
		}
	}
	_onLastRow(){
		if(this.props.medicine.key !== this.props.medicines.list.length-1){
			this.props.selectDetail(this.props.medicines.list[this.props.medicines.list.length-1], this.props.medicines.list.length-1);
			this._scrollRow(this.props.medicines.list.length-1, '+');
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

				<Modal
		          modal={this.state.medicineGroupPopup}
		          onRequestClose={()=>this.setState({medicineGroupPopup: false})}>
		          <div className="modal-body">
		            <MedicineGroupFormView popup={true} onExit={()=>this.setState({medicineGroupPopup: false})} onSelect={(medicineGroup) => {
		              this.setState({medicineGroupPopup: false}, () => {
		                this.props.medicineGroupLoadList().then(() => {
		                  this.props.formChange('medicine_group_id', medicineGroup.id);
		                });
		              });
		            }}/>
		          </div>
		        </Modal>

		        <Modal modal={this.state.unitParentPopup} onRequestClose={()=>this.setState({unitParentPopup: false})}>
		          <div className="modal-body">
		            <UnitFormView popup={true} onExit={()=>this.setState({unitParentPopup: false})} onSelect={(unit) => {
		              this.setState({unitParentPopup: false}, () => {
		                this.props.unitLoadList().then(() => {
		                  this.props.formChange('unit_parent_id', unit.id);
		                });
		              });
		            }}/>
		          </div>
		        </Modal>
                        
                <Modal modal={this.state.unitChildPopup} onRequestClose={()=>this.setState({unitChildPopup: false})}>
		          <div className="modal-body">
		            <UnitFormView popup={true} onExit={()=>this.setState({unitChildPopup: false})} onSelect={(unit) => {
		              this.setState({unitChildPopup: false}, () => {
		                this.props.unitLoadList().then(() => {
		                  this.props.formChange('unit_children_id', unit.id);
		                });
		              });
		            }}/>
		          </div>
		        </Modal>

		        <Modal modal={this.state.treatmentGroupPopup} onRequestClose={()=>this.setState({treatmentGroupPopup: false})}>
		          <div className="modal-body">
		            <TreatmentGroupFormView popup={true} onExit={()=>this.setState({treatmentGroupPopup: false})} onSelect={(treatmentGroup) => {
		              this.setState({treatmentGroupPopup: false}, () => {
		                this.props.treatmentGroupLoadList().then(() => {
		                  this.props.formChange('treatment_group_id', treatmentGroup.id);
		                });
		              });
		            }}/>
		          </div>
		        </Modal>

		        <Modal modal={this.state.producerPopup} onRequestClose={()=>this.setState({producerPopup: false})}>
		          <div className="modal-body">
		            <ProducerFormView popup={true} onExit={()=>this.setState({producerPopup: false})} onSelect={(producer) => {
		              this.setState({producerPopup: false}, () => {
		                this.props.producerLoadList().then(() => {
		                  this.props.formChange('producer_id', producer.id);
		                });
		              });
		            }}/>
		          </div>
		        </Modal>

		        <Modal modal={this.state.storageConditionPopup} onRequestClose={()=>this.setState({storageConditionPopup: false})}>
		          <div className="modal-body">
		            <StorageConditionFormView popup={true} onExit={()=>this.setState({storageConditionPopup: false})} onSelect={(storageCondition) => {
		              this.setState({storageConditionPopup: false}, () => {
		                this.props.storageConditionLoadList().then(() => {
		                  this.props.formChange('storage_condition_id', storageCondition.id);
		                });
		              });
		            }}/>
		          </div>
		        </Modal>

		        <Modal modal={this.state.storagePositionPopup} onRequestClose={()=>this.setState({storagePositionPopup: false})}>
		          <div className="modal-body">
		            <StoragePositionFormView popup={true} onExit={()=>this.setState({storagePositionPopup: false})} onSelect={(storagePosition) => {
		              this.setState({storagePositionPopup: false}, () => {
		                this.props.storagePositionLoadList().then(() => {
		                  this.props.formChange('storage_position_id', storagePosition.id);
		                });
		              });
		            }}/>
		          </div>
		        </Modal>
				
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
			  						<Translate value="medicine.namePres"/>
			  					</div>
			  				</div>
			  				<div className="portlet-body">
			  					<div className="form-horizontal">
			  						<div className="form-body">
			  							<div className="row">
			  								<div className="col-md-12">
							  					<div className="form-group">
													<label className="control-label col-md-2">
														<Translate value="medicine.search.name"/>
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
			  									<th><Translate value="medicine.field.medicine_group_id"/></th>
												<th><Translate value="medicine.field.name"/></th>
                                                <th><Translate value="medicine.field.unit_name"/></th>
												<th><Translate value="medicine.field.input_price"/></th>
												<th><Translate value="medicine.field.wholesale_price"/></th>
												<th><Translate value="medicine.field.retail_price"/></th>
												<th><Translate value="medicine.field.listed_price"/></th>
												<th><Translate value="medicine.field.prescription_drug"/></th>
												<th><Translate value="medicine.field.max_number"/></th>
												<th><Translate value="medicine.field.min_number"/></th>
			  								</tr>
			  							</thead>
			  							<tbody id="list-container">
			  								{
												this.props.medicines.list.map((l, key) => {
													if(l.id !== -1){
														let header = null;
														if(key === 0 || l.header === 0){
															header = <td rowSpan={l.size}>{l.group.name}</td>;
														}
														const selectedMedicine = (this.props.medicine.detail.id === l.id) ? 'cell-active': '';
														return (
															<tr key={l.id} onClick={this._onClickRow.bind(this, l, key)} id={`row-${key}`}>
																{header}
																<td className={selectedMedicine}>{l.name}</td>
																<td className={selectedMedicine}>{l.unit2.name}</td>
																<td className={selectedMedicine}>{Numeral(l.input_price).format('0,0')}</td>
																<td className={selectedMedicine}>{Numeral(l.wholesale_price).format('0,0')}</td>
																<td className={selectedMedicine}>{Numeral(l.retail_price).format('0,0')}</td>
																<td className={selectedMedicine}>{Numeral(l.listed_price).format('0,0')}</td>
																<td className={selectedMedicine}>
																	<i className="fa fa-check" style={{display: parseInt(l.prescription_drug) === 1 ? 'inline-block': 'none'}}/>
																	<i className="fa fa-remove" style={{display: parseInt(l.prescription_drug) === 0 ? 'inline-block': 'none'}}/>
																</td>
																<td className={selectedMedicine}>{l.max_number}</td>
																<td className={selectedMedicine}>{l.min_number}</td>
															</tr>
														);
													}else{
					  									if(this.props.medicines.list.length === 1){
					  										return (
					  											<tr key={key}>
					  												<td colSpan="10" className='text-center'>
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
			  									<div className={this.props.medicineForm.errors.medicine_group_id?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="medicine.field.medicine_group_id"/>
			  										</label>
			  										<div className="col-md-8">
                                                        <div className="input-group">
                                                            <select className="form-control" onChange={event => this._onChangeField('medicine_group_id', event.target.value)}
                                                                    value={this.props.medicineForm.values.medicine_group_id}>
                                                                    {
                                                                            this.props.medicineGroups.listRoot.map((medicineGroup, key) => {
                                                                                    return (
                                                                                            <option key={key} value={medicineGroup.id}>{medicineGroup.name}</option>
                                                                                    );
                                                                            })
                                                                    }
                                                            </select>
                                                            <span className="help-block" style={{display: this.props.medicineForm.errors.medicine_group_id ? 'block': 'none'}}>
                                                                    <Translate value={this.props.medicineForm.errors.medicine_group_id}/>
                                                            </span>
                                                            
                                                            <span className="input-group-btn">
                                                                <button className="btn btn-primary" onClick={() => this.setState({medicineGroupPopup: true})}>
                                                                    <span className="glyphicon glyphicon-plus"></span>
                                                                </button>
                                                            </span>
                                                        </div>
			  										</div>
			  									</div>
			  								</div>

			  								<div className="col-md-4">
			  									<div className={this.props.medicineForm.errors.treatment_group_id?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="medicine.field.treatment_group_id"/>
			  										</label>
			  										<div className="col-md-8">
			  											<div className="input-group">
				  											<select className="form-control" onChange={event => this._onChangeField('treatment_group_id', event.target.value)}
				  												value={this.props.medicineForm.values.treatment_group_id}>
				  												{
				  													this.props.treatmentGroups.listRoot.map((medicineGroup, key) => {
				  														return (
				  															<option key={key} value={medicineGroup.id}>{medicineGroup.name}</option>
				  														);
				  													})
				  												}
				  											</select>
				  											<span className="help-block" style={{display: this.props.medicineForm.errors.treatment_group_id ? 'block': 'none'}}>
				  												<Translate value={this.props.medicineForm.errors.treatment_group_id}/>
				  											</span>

				  											<span className="input-group-btn">
																<button className="btn btn-primary" onClick={() => this.setState({treatmentGroupPopup: true})}>
																	<span className="glyphicon glyphicon-plus"></span>
																</button>
															</span>
			  											</div>
			  										</div>
			  									</div>
			  								</div>

											<div className="col-md-4">
			  									<div className={this.props.medicineForm.errors.producer_id?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="medicine.field.producer_id"/>
			  										</label>
			  										<div className="col-md-8">
			  											<div className="input-group">
				  											<select className="form-control" onChange={event => this._onChangeField('producer_id', event.target.value)}
				  												value={this.props.medicineForm.values.producer_id}>
				  												{
				  													this.props.producers.listRoot.map((medicineGroup, key) => {
				  														return (
				  															<option key={key} value={medicineGroup.id}>{medicineGroup.name}</option>
				  														);
				  													})
				  												}
				  											</select>
				  											<span className="help-block" style={{display: this.props.medicineForm.errors.producer_id ? 'block': 'none'}}>
				  												<Translate value={this.props.medicineForm.errors.producer_id}/>
				  											</span>
				  											<span className="input-group-btn">
																<button className="btn btn-primary" onClick={() => this.setState({producerPopup: true})}>
																	<span className="glyphicon glyphicon-plus"></span>
																</button>
															</span>
														</div>
			  										</div>
			  									</div>
			  								</div>
			  								
			  							</div>
			  							<div className="row">
										  	<div className="col-md-4">
			  									<div className={this.props.medicineForm.errors.code?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="medicine.field.code"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="text" className="form-control" ref="code"
			  												value={this.props.medicineForm.values.code}
			  												onChange={event => this._onChangeField('code', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.medicineForm.errors.code ? 'block': 'none'}}>
			  												<Translate value={this.props.medicineForm.errors.code}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>

			  								<div className="col-md-4">
												<div className={this.props.medicineForm.errors.name?'form-group has-error':'form-group'}>
													<label className="control-label col-md-4">
														<Translate value="medicine.field.name"/>
													</label>
													<div className="col-md-8">
														<input type="text" className="form-control"
															value={this.props.medicineForm.values.name}
															onChange={event => this._onChangeField('name', event.target.value)}/>
														<span className="help-block" style={{display: this.props.medicineForm.errors.name ? 'block': 'none'}}>
															<Translate value={this.props.medicineForm.errors.name}/>
														</span>
													</div>
												</div>
											</div>
                                                                                        
                                            <div className="col-md-4">
	                                            <div className={this.props.medicineForm.errors.medicine_barcode?'form-group has-error':'form-group'}>
	                                                    <label className="control-label col-md-4">
	                                                            <Translate value="medicine.field.medicine_barcode"/>
	                                                    </label>
	                                                    <div className="col-md-8">
	                                                            <input type="text" className="form-control" ref="medicine_barcode"
	                                                                    value={this.props.medicineForm.values.medicine_barcode}
	                                                                    onChange={event => this._onChangeField('medicine_barcode', event.target.value)}/>
	                                                            <span className="help-block" style={{display: this.props.medicineForm.errors.medicine_barcode ? 'block': 'none'}}>
	                                                                    <Translate value={this.props.medicineForm.errors.medicine_barcode}/>
	                                                            </span>
	                                                    </div>
	                                            </div>
	                                        </div>
			  							</div>
			  							
			  							<div className="row">
			  								<div className="col-md-4">
			  									<div className={this.props.medicineForm.errors.unit_parent_id?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="medicine.field.unit_parent_id"/>
			  										</label>
			  										<div className="col-md-8">
			  											<div className="input-group">
				  											<select className="form-control" onChange={event => this._onChangeField('unit_parent_id', event.target.value)}
				  												value={this.props.medicineForm.values.unit_parent_id}>
				  												{
				  													this.props.units.listRoot.map((medicineGroup, key) => {
				  														return (
				  															<option key={key} value={medicineGroup.id}>{medicineGroup.name}</option>
				  														);
				  													})
				  												}
				  											</select>

				  											<span className="help-block" style={{display: this.props.medicineForm.errors.unit_parent_id ? 'block': 'none'}}>
				  												<Translate value={this.props.medicineForm.errors.unit_parent_id}/>
				  											</span>

				  											<span className="input-group-btn">
																<button className="btn btn-primary" onClick={() => this.setState({unitParentPopup: true})}>
																	<span className="glyphicon glyphicon-plus"></span>
																</button>
															</span>
			  											</div>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-4">
			  									<div className={this.props.medicineForm.errors.unit_children_id?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="medicine.field.unit_children_id"/>
			  										</label>
			  										<div className="col-md-8">
			  											<div className="input-group">
				  											<select className="form-control" onChange={event => this._onChangeField('unit_children_id', event.target.value)}
				  												value={this.props.medicineForm.values.unit_children_id}>
				  												{
				  													this.props.units.listRoot.map((medicineGroup, key) => {
				  														return (
				  															<option key={key} value={medicineGroup.id}>{medicineGroup.name}</option>
				  														);
				  													})
				  												}
				  											</select>
				  											<span className="help-block" style={{display: this.props.medicineForm.errors.unit_children_id ? 'block': 'none'}}>
				  												<Translate value={this.props.medicineForm.errors.unit_children_id}/>
				  											</span>
				  											<span className="input-group-btn">
																<button className="btn btn-primary" onClick={() => this.setState({unitChildPopup: true})}>
																	<span className="glyphicon glyphicon-plus"></span>
																</button>
															</span>
														</div>
			  										</div>
			  									</div>
			  								</div>

			  								<div className="col-md-4">
			  									<div className={this.props.medicineForm.errors.coefficient?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="medicine.field.coefficient"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="number" min="0" max="100" className="form-control text-right" ref="coefficient"
			  												value={this.props.medicineForm.values.coefficient}
			  												onChange={event => this._onChangeField('coefficient', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.medicineForm.errors.coefficient ? 'block': 'none'}}>
			  												<Translate value={this.props.medicineForm.errors.coefficient}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  							</div>

			  							<div className="row">
			  								<div className="col-md-4">
			  								<div className={this.props.medicineForm.errors.input_price?'form-group has-error':'form-group'}>
		  										<label className="control-label col-md-4">
		  											<Translate value="medicine.field.input_price"/>
		  										</label>
		  										<div className="col-md-8">
		  											<input type="number" min="0" className="form-control text-right" ref="input_price"
		  												value={this.props.medicineForm.values.input_price}
		  												onChange={event => this._onChangeField('input_price', event.target.value)}/>
		  											<span className="help-block" style={{display: this.props.medicineForm.errors.input_price ? 'block': 'none'}}>
		  												<Translate value={this.props.medicineForm.errors.input_price}/>
		  											</span>
		  										</div>
		  									</div>
		  									</div>

		  									<div className="col-md-4">
			  									<div className={this.props.medicineForm.errors.wholesale_price?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="medicine.field.wholesale_price"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="number" min="0" className="form-control text-right" ref="wholesale_price"
			  												value={this.props.medicineForm.values.wholesale_price}
			  												onChange={event => this._onChangeField('wholesale_price', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.medicineForm.errors.wholesale_price ? 'block': 'none'}}>
			  												<Translate value={this.props.medicineForm.errors.wholesale_price}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>

			  								<div className="col-md-4">
			  									<div className={this.props.medicineForm.errors.retail_price?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="medicine.field.retail_price"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="number" min="0" className="form-control text-right" ref="retail_price"
			  												value={this.props.medicineForm.values.retail_price}
			  												onChange={event => this._onChangeField('retail_price', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.medicineForm.errors.retail_price ? 'block': 'none'}}>
			  												<Translate value={this.props.medicineForm.errors.retail_price}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  							</div>

			  							<div className="row">
			  								<div className="col-md-4">
			  									<div className={this.props.medicineForm.errors.listed_price?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="medicine.field.listed_price"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="number" min="0" className="form-control text-right" ref="listed_price"
			  												value={this.props.medicineForm.values.listed_price}
			  												onChange={event => this._onChangeField('listed_price', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.medicineForm.errors.listed_price ? 'block': 'none'}}>
			  												<Translate value={this.props.medicineForm.errors.listed_price}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>

			  								<div className="col-md-4">
			  									<div className={this.props.medicineForm.errors.max_number?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="medicine.field.max_number"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="number" min="0" className="form-control text-right" ref="max_number"
			  												value={this.props.medicineForm.values.max_number}
			  												onChange={event => this._onChangeField('max_number', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.medicineForm.errors.max_number ? 'block': 'none'}}>
			  												<Translate value={this.props.medicineForm.errors.max_number}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>

			  								<div className="col-md-4">
			  									<div className={this.props.medicineForm.errors.min_number?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="medicine.field.min_number"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="number" min="0" className="form-control text-right" ref="min_number"
			  												value={this.props.medicineForm.values.min_number}
			  												onChange={event => this._onChangeField('min_number', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.medicineForm.errors.min_number ? 'block': 'none'}}>
			  												<Translate value={this.props.medicineForm.errors.min_number}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>

			  							</div>

			  							<div className="row">
			  								<div className="col-md-4">
			  									<div className={this.props.medicineForm.errors.expiry?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="medicine.field.expiry"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="number" min="0" className="form-control text-right" ref="expiry"
			  												value={this.props.medicineForm.values.expiry}
			  												onChange={event => this._onChangeField('expiry', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.medicineForm.errors.expiry ? 'block': 'none'}}>
			  												<Translate value={this.props.medicineForm.errors.expiry}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>

			  								<div className="col-md-4">
			  									<div className={this.props.medicineForm.errors.storage_condition_id?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="medicine.field.storage_condition_id"/>
			  										</label>
			  										<div className="col-md-8">
			  											<div className="input-group">
				  											<select className="form-control" onChange={event => this._onChangeField('storage_condition_id', event.target.value)}
				  												value={this.props.medicineForm.values.storage_condition_id}>
				  												{
				  													this.props.storageConditions.listRoot.map((medicineGroup, key) => {
				  														return (
				  															<option key={key} value={medicineGroup.id}>{medicineGroup.name}</option>
				  														);
				  													})
				  												}
				  											</select>
				  											<span className="help-block" style={{display: this.props.medicineForm.errors.storage_condition_id ? 'block': 'none'}}>
				  												<Translate value={this.props.medicineForm.errors.storage_condition_id}/>
				  											</span>

				  											<span className="input-group-btn">
																<button className="btn btn-primary" onClick={() => this.setState({storageConditionPopup: true})}>
																	<span className="glyphicon glyphicon-plus"></span>
																</button>
															</span>
			  											</div>
			  										</div>
			  									</div>
			  								</div>

			  								<div className="col-md-4">
			  									<div className={this.props.medicineForm.errors.storage_position_id?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="medicine.field.storage_position_id"/>
			  										</label>
			  										<div className="col-md-8">
			  											<div className="input-group">
				  											<select className="form-control" onChange={event => this._onChangeField('storage_position_id', event.target.value)}
				  												value={this.props.medicineForm.values.storage_position_id}>
				  												{
				  													this.props.storagePositions.listRoot.map((medicineGroup, key) => {
				  														return (
				  															<option key={key} value={medicineGroup.id}>{medicineGroup.name}</option>
				  														);
				  													})
				  												}
				  											</select>
				  											<span className="help-block" style={{display: this.props.medicineForm.errors.storage_position_id ? 'block': 'none'}}>
				  												<Translate value={this.props.medicineForm.errors.storage_position_id}/>
				  											</span>
				  											<span className="input-group-btn">
																	<button className="btn btn-primary" onClick={() => this.setState({storagePositionPopup: true})}>
																		<span className="glyphicon glyphicon-plus"></span>
																	</button>
															</span>
			  											</div>
			  										</div>
			  									</div>
			  								</div>

			  							</div>

			  							<div className="row">
			  								<div className="col-md-4">
			  									<div className={this.props.medicineForm.errors.day_warning?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="medicine.field.day_warning"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="number" min="0" className="form-control text-right" ref="day_warning"
			  												value={this.props.medicineForm.values.day_warning}
			  												onChange={event => this._onChangeField('day_warning', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.medicineForm.errors.day_warning ? 'block': 'none'}}>
			  												<Translate value={this.props.medicineForm.errors.day_warning}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>

			  								<div className="col-md-4">
			  									<div className={this.props.medicineForm.errors.number_warning?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="medicine.field.number_warning"/>
			  										</label>
			  										<div className="col-md-8">
			  											<input type="number" min="0" className="form-control text-right" ref="number_warning"
			  												value={this.props.medicineForm.values.number_warning}
			  												onChange={event => this._onChangeField('number_warning', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.medicineForm.errors.number_warning ? 'block': 'none'}}>
			  												<Translate value={this.props.medicineForm.errors.number_warning}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>

			  								<div className="col-md-4">
                                                                                            <div className={this.props.medicineForm.errors.material_id?'form-group has-error':'form-group'}>
                                                                                                <label className="control-label col-md-4">
                                                                                                        <Translate value="medicine.field.material_id"/>
                                                                                                </label>
                                                                                                <div className="col-md-8">
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
                                                                                                                                                                                                                                        <span className="glyphicon glyphicon-plus"></span>
                                                                                                                                                                                                                                </button>
                                                                                                                                                                                                                        </span>
                                                                                                                                                                                                                </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
			  							</div>
                                                                                                                                                               
			  							<div className='row text-center'>
										  	<div className="col-md-8">
											  <div className="row">
											  	<div className="col-md-2">
                                                <div className="form-group">
                                                    <div className="checkbox-list">
                                                        <div className="checkbox-inline">
                                                            <input type="checkbox" checked={parseInt(this.props.medicineForm.values.prescription_drug)?true:false} id="prescription_drug"
                                                                    onChange={event => {
                                                                            const value = (parseInt(this.props.medicineForm.values.prescription_drug) === 0 || typeof this.props.medicineForm.values.prescription_drug === 'undefined') ? 1: 0;
                                                                            this.props.formChange('prescription_drug', value);
                                                                    }}/>
                                                            <label htmlFor="prescription_drug"><Translate value="medicine.field.prescription_drug"/></label>
                                                        </div>
                                                    </div>
                                                </div>
			  								</div>

			  								<div className="col-md-2">
                                                                                            <div className="form-group">
                                                                                                    <div className="checkbox-list">
                                                                                                            <div className="checkbox-inline">
                                                                                                                    <input type="checkbox" checked={parseInt(this.props.medicineForm.values.keep_out_children)?true:false} id="keep_out_children"
                                                                                                                            onChange={event => {
                                                                                                                                    const value = (parseInt(this.props.medicineForm.values.keep_out_children) === 0 || typeof this.props.medicineForm.values.keep_out_children === 'undefined') ? 1: 0;
                                                                                                                                    this.props.formChange('keep_out_children', value);
                                                                                                                            }}/>
                                                                                                                    <label htmlFor="keep_out_children"><Translate value="medicine.field.keep_out_children"/></label>
                                                                                                            </div>
                                                                                                    </div>
                                                                                            </div>
			  								</div>

			  								<div className="col-md-2">
                                                                                            <div className="form-group">
                                                                                                    <div className="checkbox-list">
                                                                                                            <div className="checkbox-inline">
                                                                                                                    <input type="checkbox" checked={parseInt(this.props.medicineForm.values.psychotropic_medicine)?true:false} id="psychotropic_medicine"
                                                                                                                            onChange={event => {
                                                                                                                                    const value = (parseInt(this.props.medicineForm.values.psychotropic_medicine) === 0 || typeof this.props.medicineForm.values.psychotropic_medicine === 'undefined') ? 1: 0;
                                                                                                                                    this.props.formChange('psychotropic_medicine', value);
                                                                                                                            }}/>
                                                                                                                    <label htmlFor="psychotropic_medicine"><Translate value="medicine.field.psychotropic_medicine"/></label>
                                                                                                            </div>
                                                                                                    </div>
                                                                                            </div>
			  								</div>

			  								<div className="col-md-2">
                                                                                            <div className="form-group">
                                                                                                    <div className="checkbox-list">
                                                                                                            <div className="checkbox-inline">
                                                                                                                    <input type="checkbox" checked={parseInt(this.props.medicineForm.values.avoid_direct_sunlight)?true:false} id="avoid_direct_sunlight"
                                                                                                                            onChange={event => {
                                                                                                                                    const value = (parseInt(this.props.medicineForm.values.avoid_direct_sunlight) === 0 || typeof this.props.medicineForm.values.avoid_direct_sunlight === 'undefined') ? 1: 0;
                                                                                                                                    this.props.formChange('avoid_direct_sunlight', value);
                                                                                                                            }}/>
                                                                                                                    <label htmlFor="avoid_direct_sunlight"><Translate value="medicine.field.avoid_direct_sunlight"/></label>
                                                                                                            </div>
                                                                                                    </div>
                                                                                            </div>
			  								</div>

			  								<div className="col-md-2">
                                                                                            <div className="form-group">
                                                                                                    <div className="checkbox-list">
                                                                                                            <div className="checkbox-inline">
                                                                                                                    <input type="checkbox" checked={parseInt(this.props.medicineForm.values.avoid_moisture)?true:false} id="avoid_moisture"
                                                                                                                            onChange={event => {
                                                                                                                                    const value = (parseInt(this.props.medicineForm.values.avoid_moisture) === 0 || typeof this.props.medicineForm.values.avoid_moisture === 'undefined') ? 1: 0;
                                                                                                                                    this.props.formChange('avoid_moisture', value);
                                                                                                                            }}/>
                                                                                                                    <label htmlFor="avoid_moisture"><Translate value="medicine.field.avoid_moisture"/></label>
                                                                                                            </div>
                                                                                                    </div>
                                                                                            </div>
			  								</div>
                                                                                        
                                            <div className="col-md-2">
                                                                                            <div className="form-group">
                                                                                                    <div className="checkbox-list">
                                                                                                            <div className="checkbox-inline">
                                                                                                                    <input type="checkbox" checked={parseInt(this.props.medicineForm.values.health_insurance)?true:false} id="health_insurance"
                                                                                                                            onChange={event => {
                                                                                                                                    const value = (parseInt(this.props.medicineForm.values.health_insurance) === 0 || typeof this.props.medicineForm.values.health_insurance === 'undefined') ? 1: 0;
                                                                                                                                    this.props.formChange('health_insurance', value);
                                                                                                                            }}/>
                                                                                                                    <label htmlFor="health_insurance"><Translate value="medicine.field.health_insurance"/></label>
                                                                                                            </div>
                                                                                                    </div>
                                                                                            </div>
			  								</div>
											  </div>
											</div>
											<div className="col-md-4"></div>
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
						  									&nbsp;
						  									<button type="button" className="btn green"
						  										onClick={this._onClickExportPDF.bind(this)}>
						  										Export PDF
						  									</button>
						  									&nbsp;
						  									<button type="button" className="btn green"
						  										onClick={this._onClickExportExcel.bind(this)}>
						  										Export Excel
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

const mapStateToProps = ({medicineForm, medicines, medicine, medicineGroups, storagePositions, storageConditions, treatmentGroups, producers, materials, units}) => {
	return {
		medicineForm, medicines, medicine, medicineGroups, storagePositions, storageConditions, treatmentGroups, producers, materials, units
	};
};

const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		...medicineFormActions,
		...medicineListActions,
		...medicineDetailActions,
		medicineGroupLoadList,
		storagePositionLoadList,
		storageConditionLoadList,
		treatmentGroupLoadList,
		producerLoadList,
		materialLoadList,
		unitLoadList
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(MedicinePresFormView);