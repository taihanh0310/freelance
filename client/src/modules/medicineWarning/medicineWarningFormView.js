const {Translate, I18n} = ReactReduxI18n;

import * as medicineWarningFormActions from 'modules/medicineWarning/actions/form';
import * as medicineWarningListActions from 'modules/medicineWarning/actions/list';
import * as medicineWarningDetailActions from 'modules/medicineWarning/actions/detail';

class MedicineWarningFormView extends React.Component{
	constructor(){
		super();
		this.state = {
			confirm: false
		};
	}
	componentDidMount(){
		this._loadMedicineWarningList();

		Keyboard.bind('f6', event => {
			this._onSave();
		});
		Keyboard.bind('f8', event => {
			this._onClickDelete();
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
	_loadMedicineWarningList(){
		Helper.PageBlock(I18n.t('application.text.loading'));
		this.props.loadList()
		.then(() => {
			if(this.props.medicineWarnings.list.length === 1){
				this.props.selectDetail(this.props.medicineWarnings.list[0], 0);
				this._setFormMode('add');
			}else{
				this.props.selectDetail(this.props.medicineWarnings.list[1], 1);
				this._setFormMode('edit');
			}
		});
	}
	_onChangeField(field, value){
		this.props.formChange(field, value);
		let error = '';
		this.props.formValidation(field, error);
	}
	_setFormMode(type){
		switch(type){
			case 'add':
				this.props.formChangeMode('add');
				this.refs[this.props.medicineWarningForm.focus].focus();
				this.props.formClear();
				break;
			case 'edit':
				this.props.formChangeMode('edit');
				break;
		}
	}
	_onValidationSubmit(){
		const {limit_warning} = this.props.medicineWarningForm.values;
		this._onChangeField('limit_warning',limit_warning);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const errors = this.props.medicineWarningForm.errors;
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
		switch(this.props.medicineWarningForm.mode){
			case 'edit':
				this._onValidationSubmit()
				.then(valid => {
					if(valid){
						let values = $.extend({}, this.props.medicineWarningForm.values);
						let key = values.key;
						delete values.key;
						this.props.formEdit(values)
						.then(obj => {
							this._loadMedicineWarningList();
						});
					}
				});
				break;
		}
	}
	_onClickRow(medicineWarning, key){
		this.props.formClear();
		this.props.selectDetail(medicineWarning, key);
		this._setFormMode('edit');
	}

	_onExit(){
		this.props.push(Routes.dashboard.view);
	}

	_onClickSelect(){
		this.props.onSelect(this.props.medicineWarning.detail);
	}

  	render(){
  		return (
			<div className="page-content-inner">
				<div className="row">
					<div className="col-md-12">
						<div className="portlet box green">
			  				<div className="portlet-title">
			  					<div className="caption">
			  						<Translate value="medicineWarning.title"/>
			  					</div>
			  				</div>
			  				<div className="portlet-body">

			  					<div className="table-scrollable">
			  						<table className="table fixed-header table-bordered" id="list">
			  							<thead>
			  								<tr>
			  									<th className="col-sm-4">Loại cảnh báo</th>
			  									<th className="col-sm-4">Tình trạng</th>
			  									<th className="col-sm-2">Ngày cảnh báo</th>
			  									<th className="col-sm-2">Màu hiển thị</th>
			  								</tr>
			  							</thead>
			  							<tbody id="list-container">
			  								{
			  									this.props.medicineWarnings.list.map((medicineWarning, key) => {
			  										if(medicineWarning.id !== -1){
				  										if(medicineWarning.sorted || typeof medicineWarning.sorted === 'undefined'){
					  										return (
					  											<tr key={key} className={this.props.medicineWarning.detail.id === medicineWarning.id ? 'row-active': ''}
					  												id={`row-${key}`}
					  												onClick={this._onClickRow.bind(this, medicineWarning, key)}>
					  												<td>{medicineWarning.warning_type_name}</td>
					  												<td>{medicineWarning.enable_mode_name}</td>
					  												<td className="text-right">{medicineWarning.limit_warning}</td>
					  												<td>{medicineWarning.color_warning}</td>
					  											</tr>
					  										);
					  									}
					  								}else{
					  									if(this.props.medicineWarnings.list.length === 1){
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
			  								<div className="col-md-3">
		  										<input className="form-control" type="text" value = {this.props.medicineWarningForm.values.warning_type_name} readOnly/>
			  								</div>

			  								<div className="col-md-3">
			  									<div className={this.props.medicineWarningForm.errors.enable_mode?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-4">
			  											Tình trạng
			  										</label>
			  										<div className="col-md-8">
			  											<select className="form-control" onChange={event => this._onChangeField('enable_mode', event.target.value)}
			  												value={this.props.medicineWarningForm.values.enable_mode}>
	  															<option value="0">Tắt chức năng cảnh báo</option>
	  															<option value="1">Bật chức năng cảnh báo</option>
			  											</select>
			  										</div>
			  									</div>
			  								</div>

			  								<div className="col-md-3">
			  									<div className={this.props.medicineWarningForm.errors.limit_warning?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-6">
			  											Ngày cảnh báo
			  										</label>
			  										<div className="col-md-6">
			  											<input type="number" className="form-control text-right" min="0" ref="limit_warning"
			  												value={this.props.medicineWarningForm.values.limit_warning}
			  												onChange={event => this._onChangeField('limit_warning', event.target.value)} ref="code"/>
			  											<span className="help-block" style={{display: this.props.medicineWarningForm.errors.limit_warning ? 'block': 'none'}}>
			  												<Translate value={this.props.medicineWarningForm.errors.limit_warning}/>
			  											</span>
			  										</div>
			  									</div>
			  								</div>
			  								<div className="col-md-3">
			  									<div className={this.props.medicineWarningForm.errors.color_warning?'form-group has-error':'form-group'}>
			  										<label className="control-label col-md-6">
			  											Màu cảnh báo
			  										</label>
			  										<div className="col-md-6">
			  											<input type="color" className="form-control" min="0" ref="color_warning"
			  												value={this.props.medicineWarningForm.values.color_warning}
			  												onChange={event => this._onChangeField('color_warning', event.target.value)}/>
			  											<span className="help-block" style={{display: this.props.medicineWarningForm.errors.color_warning ? 'block': 'none'}}>
			  												<Translate value={this.props.medicineWarningForm.errors.color_warning}/>
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

const mapStateToProps = ({medicineWarningForm, medicineWarnings, medicineWarning}) => {
	return {
		medicineWarningForm, medicineWarnings, medicineWarning
	};
};

const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		...medicineWarningFormActions,
		...medicineWarningListActions,
		...medicineWarningDetailActions
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(MedicineWarningFormView);