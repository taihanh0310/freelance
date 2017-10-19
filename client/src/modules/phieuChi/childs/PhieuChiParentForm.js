const {Translate, I18n} = ReactReduxI18n;
import Datepicker from 'common/components/Datepicker';
import * as PhieuChiListActions from 'modules/phieuChi/actions/list';
import * as PhieuChiFormActions from 'modules/phieuChi/actions/form';
import {loadSupplierList as supplierLoadList} from 'modules/supplier/actions/list'; // Danh sach nha cung cap

class PhieuChiParentForm extends React.Component{
    
    constructor(){
        super();
    }

    componentDidMount(){
        this._loadAll();
    }

    _loadAll(){
        this.props.supplierLoadList();

        //load user login
        setTimeout(() => {
        	axios.get(`${Config.API_URL}user/loginUser`)
			.then(response => {
				const currentUserLogin = response.data.data;
				this.props.formChange('full_name', currentUserLogin.fullname);	
			});
		}, Config.TIMEOUT);
    }

    _onChangeField(field, value){
    	this.props.formChange(field, value);
    }

    render(){
    	const form = this.props.phieuChiForm.values;
    	const formErrors = this.props.phieuChiForm.errors;
        return (
            <div className="portlet box green">
            	<div className="portlet-title">
            		<div className="caption">Thông tin về hóa đơn</div>
            	</div>
                <div className="portlet-body">
                	<div className="form-horizontal">
                		<div className="form-body">
                			<div className="row">
                				<div className="col-sm-3">
	                				<div className={formErrors.code?'form-group has-error':'form-group'}>
	                					<label className="control-label col-md-4">Số hiệu</label>
	                					<div className="col-md-8">
	                						<input type="text" className="form-control" ref="code"
                                                value={form.code} onChange={event => this._onChangeField('code', event.target.value)}/>
                                                <span className="help-block" style={{display: formErrors.code ? 'block': 'none'}}>
                                                    <Translate value={formErrors.code}/>
                                                </span>
	                					</div>
	                				</div>
                				</div>
                				<div className="col-sm-3">
	                				<div className="form-group">
	                					<div className={formErrors.date_input?'form-group has-error':'form-group'}>
                                        <label className="control-label col-md-4">Ngày lập</label>
                                        <div className="col-md-8">
                                            <Datepicker value={form.date_input} onChange={(value) => this._onChangeField('date_input', value)}/>
                                            <span className="help-block" style={{display: formErrors.date_input ? 'block': 'none'}}>
                                                <Translate value={formErrors.date_input}/>
                                            </span>
                                        </div>
                                    </div>
	                				</div>
                				</div>
                				<div className="col-sm-3">
	                				<div className={formErrors.supplier_id ?'form-group has-error':'form-group'}>
	                					<label className="control-label col-md-4">Đối tượng</label>
	                					<div className="col-md-8">
	                						<select className="form-control" value={form.supplier_id} onChange={event => this._onChangeField('supplier_id', event.target.value)}>
                                                {
                                                    this.props.suppliers.list.map((type, key) => {
                                                        return (
                                                            <option key={key} value={type.id}>{type.name}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                            <span className="help-block" style={{display: formErrors.supplier_id ? 'block': 'none'}}>
                                                <Translate value={formErrors.supplier_id}/>
                                            </span>
	                					</div>
	                				</div>
                				</div>
                				<div className="col-sm-3">
	                				<div className="form-group">
	                					<label className="control-label col-md-4">Người chi</label>
	                					<div className="col-md-8">
	                						<input type="text" className="form-control" ref="user_id" readOnly value={form.full_name}/>
	                					</div>
	                				</div>
                				</div>
                			</div>
                			<div className="row">
                				<div className="col-sm-3">
	                				<div className={formErrors.date_output?'form-group has-error':'form-group'}>
                                        <label className="control-label col-md-4">Ngày chi</label>
                                        <div className="col-md-8">
                                            <Datepicker value={form.date_output} onChange={(value) => this._onChangeField('date_output', value)}/>
                                            <span className="help-block" style={{display: formErrors.date_output ? 'block': 'none'}}>
                                                <Translate value={formErrors.date_output}/>
                                            </span>
                                        </div>
                                    </div>
                				</div>
                				<div className="col-sm-3">
	                				<div className={formErrors.total_money?'form-group has-error':'form-group'}>
	                					<label className="control-label col-md-4">Số tiền</label>
	                					<div className="col-md-8" id="custom_input">
	                						<input type="number" min="0" className="form-control text-right" ref="total_money"
                                                value={form.total_money} onChange={event => this._onChangeField('total_money', event.target.value)}/>
                                                <span className="help-block" style={{display: formErrors.total_money ? 'block': 'none'}}>
                                                    <Translate value={formErrors.total_money}/>
                                                </span>
	                					</div>
	                				</div>
                				</div>
                				<div className="col-sm-6">
	                				<div className="form-group">
	                					<label className="control-label col-md-2">Diễn giải</label>
	                					<div className="col-md-10">
	                						<input type="text" className="form-control" value={form.description} onChange={event => this._onChangeField('description', event.target.value)}/>
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

const mapStateToProps = ({
        phieuChis,
        phieuChiForm,
        suppliers
    }) => {
    return {
        phieuChis,
        phieuChiForm,
        suppliers
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...PhieuChiListActions,
        ...PhieuChiFormActions,
        supplierLoadList
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PhieuChiParentForm);
