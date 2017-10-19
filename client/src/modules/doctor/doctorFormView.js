const {Translate, I18n} = ReactReduxI18n;

import * as doctorFormActions from 'modules/doctor/actions/form';
import * as doctorListActions from 'modules/doctor/actions/list';
import * as doctorDetailActions from 'modules/doctor/actions/detail';

import {loadList as departmentMedicineLoadList} from 'modules/departmentMedicine/actions/list';

class DoctorFormView extends React.Component{
	constructor(){
		super();
		this.state = {
			confirm: false
		};
	}
	componentDidMount(){
		this._loadDoctorList();
                this._loadAll();
                this._onUploadAvatar();
                
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
        
        _loadAll(){
		this.props.departmentMedicineLoadList();
	}
        // upload avatar
        _onUploadAvatar(){
            const self = this;
        
            $("#doctor_avatar_upload").change(function(){
                var file = document.getElementById('doctor_avatar_upload').files[0];
                self.props.uploadAvatar(file).then(imageName => {
                    
                    const fileName = imageName.data;
                    $("#doctor_avatar").val(fileName);
                    self.props.formChange('doctor_avatar', fileName);
                    file.value = "";
                })
            });
        }
        // end update avatar
	_loadDoctorList(){
		Helper.PageBlock(I18n.t('application.text.loading'));
		this.props.loadList()
		.then(() => {
			if(this.props.doctors.list.length === 1){
				this.props.selectDetail(this.props.doctors.list[0], 0);
				this._setFormMode('add');
			}else{
				this.props.selectDetail(this.props.doctors.list[1], 1);
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
			case 'department_medicine_id':
				if(Check.CheckEmpty(value))
					error = 'application.validation.required';
				else
					error = '';
				break;

			// case 'phone_number':{
			// 	if(!Check.CheckEmpty(value)){
			// 		if(!Check.CheckPhoneNumber(value)){
			// 			error = 'application.validation.phone';
			// 		}else{
			// 			error = '';
			// 		}
			// 	}else{
			// 		error = '';
			// 	}
			// 	break;
			// }
			// case 'fax_number':{
			// 	if(!Check.CheckEmpty(value)){
			// 		if(!Check.CheckPhoneNumber(value)){
			// 			error = 'application.validation.fax';
			// 		}else{
			// 			error = '';
			// 		}
			// 	}else{
			// 		error = '';
			// 	}
			// 	break;
			// }
			// case 'bank_number':{
			// 	if(!Check.CheckEmpty(value)){
			// 		if(!Check.checkBankNumber(value)){
			// 			error = 'application.validation.bank_number';
			// 		}else{
			// 			error = '';
			// 		}
			// 	}else{
			// 		error = '';
			// 	}
			// 	break;
			// }
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
				this.refs[this.props.doctorForm.focus].focus();
				this.props.formClear();
				this.props.formChange('doctor_avatar', 'no_avatar.jpg'); // set avatar
				break;
			case 'edit':
				this.props.formChangeMode('edit');
				break;
		}
	}
	_onValidationSubmit(){
		const {code, name, email, department_medicine_id} = this.props.doctorForm.values;
		this._onChangeField('code', code);
		this._onChangeField('name', name);
		this._onChangeField('department_medicine_id', department_medicine_id);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const errors = this.props.doctorForm.errors;
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
		switch(this.props.doctorForm.mode){
			case 'add':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.doctorForm.values);
						delete values.key;
						this.props.formAdd(values)
						.then(obj => {
							this.props.formClear();
							this._loadDoctorList();
							// this.props.pushList(obj.data);
							// const doctors = this.props.doctors.list;
							// this.props.selectDetail(doctors[doctors.length-1], doctors.length-1);
							// this._setFormMode('edit');
							// this._scrollRow(this.props.doctors.list.length-1, '+');
						})
					}
				})
				break;
			case 'edit':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.doctorForm.values);
						let key = values.key;
						delete values.key;
						this.props.formEdit(values)

						.then(obj => {
							// values.key = key;
							// this.props.updateList(values);
							this._loadDoctorList();
						})
					}
				})
				break;
		}
	}
	_onClickRow(doctor, key){
		this.props.formClear();
		this.props.selectDetail(doctor, key);
		this._setFormMode('edit');
	}
	_onClickDelete(){
		if(this.props.doctor.detail.id !== -1)
			this.setState({confirm: true})
	}
	_onDelete(){
		this.props.formDelete(this.props.doctor.detail.id)
		.then(() => {
			// this.props.removeList();
			this.setState({confirm: false});
			this._loadDoctorList();
			// if(this.props.doctors.list.length > 1)
			// 	this.props.selectDetail(this.props.doctors.list[this.props.doctor.key-1], this.props.doctor.key-1);
			// else{
			// 	this.props.selectDetail(this.props.doctors.list[0], 0);
			// 	this._setFormMode('add');
			// }
		});
	}
	_onSearch(field, value){
		this.props.changeSearchList(field, value);
		setTimeout(() => {
			const list = Helper.GetListFilter(this.props.doctors.listRoot, this.props.doctors.search);
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
		if(this.props.doctor.detail.id){
			const doctors = this.props.doctors.list;
			if(this.props.doctor.key > 1){
				this.props.selectDetail(doctors[this.props.doctor.key-1], this.props.doctor.key-1);
				this._scrollIntoRow(this.props.doctor.key);
			}
				
		}
	}
	_onNextRow(){
		if(this.props.doctor.detail.id){
			if(this.props.doctor.key < this.props.doctors.list.length-1){
				this.props.selectDetail(this.props.doctors.list[this.props.doctor.key+1], this.props.doctor.key+1);
				this._scrollIntoRow(this.props.doctor.key);
			}
		}
	}
	_onFirstRow(){
		if(this.props.doctor.key !== 0){
			this.props.selectDetail(this.props.doctors.list[1], 1);
			this._scrollRow(1, '-');
		}
	}
	_onLastRow(){
		if(this.props.doctor.key !== this.props.doctors.list.length-1){
			this.props.selectDetail(this.props.doctors.list[this.props.doctors.list.length-1], this.props.doctors.list.length-1);
			this._scrollRow(this.props.doctors.list.length-1, '+');
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
			  						<Translate value="doctor.title"/>
			  					</div>
			  				</div>
			  				<div className="portlet-body">
			  					<div className="form-horizontal">
			  						<div className="form-body">
			  							<div className="row">
			  								<div className="col-md-12">
							  					<div className="form-group">
													<label className="control-label col-md-2">
														<Translate value="doctor.field.name"/>
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
			  									<th className='col-sm-1'><Translate value="doctor.field.code"/></th>
			  									<th className='col-sm-3'><Translate value="doctor.field.name"/></th>
                                                                                                <th className='col-sm-6'><Translate value="doctor.field.address"/></th>
			  									<th className='col-sm-2'><Translate value="doctor.field.working_address"/></th>
			  								</tr>
			  							</thead>
			  							<tbody id="list-container">
			  								{
			  									this.props.doctors.list.map((doctor, key) => {
			  										if(doctor.id !== -1){
				  										if(doctor.sorted || typeof doctor.sorted === 'undefined'){
					  										return (
					  											<tr key={key} className={this.props.doctor.detail.id === doctor.id ? 'row-active': ''}
					  												id={`row-${key}`}
					  												onClick={this._onClickRow.bind(this, doctor, key)}>
					  												<td>{doctor.code}</td>
					  												<td>{doctor.name}</td>
					  												<td>{doctor.address}</td>
                                                                                                                                        <td>{doctor.working_address}</td>
					  											</tr>
					  										);
					  									}
					  								}else{
					  									if(this.props.doctors.list.length === 1){
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
									<li><a>{this.props.doctor.key} / {this.props.doctors.list.length-1}</a></li>
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
                                                                            <div className="col-md-11">
                                                                                <div className="row">
                                                                                            <div className="col-md-4">
                                                                                                    <div className={this.props.doctorForm.errors.code?'form-group has-error':'form-group'}>
                                                                                                            <label className="control-label col-md-4">
                                                                                                                    <Translate value="doctor.field.code"/>
                                                                                                            </label>
                                                                                                            <div className="col-md-8">
                                                                                                                    <input type="text" className="form-control" ref="code"
                                                                                                                            value={this.props.doctorForm.values.code}
                                                                                                                            onChange={event => this._onChangeField('code', event.target.value)}/>
                                                                                                                    <span className="help-block" style={{display: this.props.doctorForm.errors.code ? 'block': 'none'}}>
                                                                                                                            <Translate value={this.props.doctorForm.errors.code}/>
                                                                                                                    </span>
                                                                                                            </div>
                                                                                                    </div>
                                                                                            </div>

                                                                                            <div className="col-md-4">
                                                                                                <div className={this.props.doctorForm.errors.department_medicine_id?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											<Translate value="doctor.field.department_medicine_id"/>
			  										</label>
			  										<div className="col-md-8">
			  											<select className="form-control" onChange={event => this._onChangeField('department_medicine_id', event.target.value)}
			  												value={this.props.doctorForm.values.department_medicine_id}>
			  												{
			  													this.props.departmentMedicines.listRoot.map((departmentMedicine, key) => {
			  														return (
			  															<option key={key} value={departmentMedicine.id}>{departmentMedicine.name}</option>
			  														);
			  													})
			  												}
			  											</select>
			  											<span className="help-block" style={{display: this.props.doctorForm.errors.department_medicine_id ? 'block': 'none'}}>
			  												<Translate value={this.props.doctorForm.errors.department_medicine_id}/>
			  											</span>
			  										</div>
			  									</div>
                                                                                            </div>

                                                                                            <div className="col-md-4">
                                                                                                    <div className={this.props.doctorForm.errors.name?'form-group has-error':'form-group'}>
                                                                                                            <label className="control-label col-md-4">
                                                                                                                    <Translate value="doctor.field.name"/>
                                                                                                            </label>
                                                                                                            <div className="col-md-8">
                                                                                                                    <input type="text" className="form-control"
                                                                                                                            value={this.props.doctorForm.values.name}
                                                                                                                            onChange={event => this._onChangeField('name', event.target.value)}/>
                                                                                                                    <span className="help-block" style={{display: this.props.doctorForm.errors.name ? 'block': 'none'}}>
                                                                                                                            <Translate value={this.props.doctorForm.errors.name}/>
                                                                                                                    </span>
                                                                                                            </div>
                                                                                                    </div>
                                                                                            </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                            <div className="col-md-4">
                                                                                                    <div className={this.props.doctorForm.errors.address?'form-group has-error':'form-group'}>
                                                                                                            <label className="control-label col-md-4">
                                                                                                                    <Translate value="doctor.field.address"/>
                                                                                                            </label>
                                                                                                            <div className="col-md-8">
                                                                                                                    <input type="text" className="form-control" ref="address"
                                                                                                                            value={this.props.doctorForm.values.address}
                                                                                                                            onChange={event => this._onChangeField('address', event.target.value)}/>
                                                                                                                    <span className="help-block" style={{display: this.props.doctorForm.errors.address ? 'block': 'none'}}>
                                                                                                                            <Translate value={this.props.doctorForm.errors.address}/>
                                                                                                                    </span>
                                                                                                            </div>
                                                                                                    </div>
                                                                                            </div>
                                                                                            <div className="col-md-4">
                                                                                                    <div className={this.props.doctorForm.errors.phone_number?'form-group has-error':'form-group'}>
                                                                                                            <label className="control-label col-md-4">
                                                                                                                    <Translate value="doctor.field.phone_number"/>
                                                                                                            </label>
                                                                                                            <div className="col-md-8">
                                                                                                                    <input type="text" className="form-control" ref="phone_number"
                                                                                                                            value={this.props.doctorForm.values.phone_number}
                                                                                                                            onChange={event => this._onChangeField('phone_number', event.target.value)}/>
                                                                                                                    <span className="help-block" style={{display: this.props.doctorForm.errors.phone_number ? 'block': 'none'}}>
                                                                                                                            <Translate value={this.props.doctorForm.errors.phone_number}/>
                                                                                                                    </span>
                                                                                                            </div>
                                                                                                    </div>
                                                                                            </div>
                                                                                            <div className="col-md-4">
                                                                                                <div className={this.props.doctorForm.errors.working_address?'form-group has-error':'form-group'}>
                                                                                                        <label className="control-label col-md-4">
                                                                                                                <Translate value="doctor.field.working_address"/>
                                                                                                        </label>
                                                                                                        <div className="col-md-8">
                                                                                                                <input type="text" className="form-control" ref="working_address"
                                                                                                                        value={this.props.doctorForm.values.working_address}
                                                                                                                        onChange={event => this._onChangeField('working_address', event.target.value)}/>
                                                                                                                <span className="help-block" style={{display: this.props.doctorForm.errors.working_address ? 'block': 'none'}}>
                                                                                                                        <Translate value={this.props.doctorForm.errors.working_address}/>
                                                                                                                </span>
                                                                                                        </div>
                                                                                                </div>
                                                                                            </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-md-4">
                                                                                            <div className={this.props.doctorForm.errors.bank_number?'form-group has-error':'form-group'}>
                                                                                                    <label className="control-label col-md-4">
                                                                                                            <Translate value="doctor.field.bank_number"/>
                                                                                                    </label>
                                                                                                    <div className="col-md-8">
                                                                                                            <input type="text" className="form-control" ref="bank_number"
                                                                                                                    value={this.props.doctorForm.values.bank_number}
                                                                                                                    onChange={event => this._onChangeField('bank_number', event.target.value)}/>
                                                                                                            <span className="help-block" style={{display: this.props.doctorForm.errors.bank_number ? 'block': 'none'}}>
                                                                                                                    <Translate value={this.props.doctorForm.errors.bank_number}/>
                                                                                                            </span>
                                                                                                    </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-4">
                                                                                            <div className={this.props.doctorForm.errors.doctor_avatar?'form-group has-error':'form-group'}>
                                                                                                    <label className="control-label col-md-4">
                                                                                                            <Translate value="doctor.field.doctor_avatar"/>
                                                                                                    </label>
                                                                                                    <div className="col-md-8">
                                                                                                            <input type="file" className="form-control" ref="bank_number" id="doctor_avatar_upload"/>
                                                                                                            <input type="hidden" className="form-control" ref="doctor_avatar" id="doctor_avatar" value={this.props.doctorForm.values.doctor_avatar}/>
                                                                                                            <span className="help-block" style={{display: this.props.doctorForm.errors.doctor_avatar ? 'block': 'none'}}>
                                                                                                                    <Translate value={this.props.doctorForm.errors.doctor_avatar}/>
                                                                                                            </span>
                                                                                                    </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-4">

                                                                                        </div>
                                                                                    </div>
                                                                            </div>
                                                                            <div className="col-md-1">
                                                                                <img id="doctor_avatar_show" src={`${Config.DEFAULT_URL}images/doctors/thumbnail/${this.props.doctorForm.values.doctor_avatar}`} className="img-responsive"/>
                                                                            </div>
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

const mapStateToProps = ({doctorForm, doctors, doctor, departmentMedicines}) => {
	return {
		doctorForm, doctors, doctor, departmentMedicines
	};
};

const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		...doctorFormActions,
		...doctorListActions,
		...doctorDetailActions,
                departmentMedicineLoadList
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DoctorFormView);