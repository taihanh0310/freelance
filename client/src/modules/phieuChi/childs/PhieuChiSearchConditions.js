const {Translate, I18n} = ReactReduxI18n;
import Datepicker from 'common/components/Datepicker';
import * as PhieuChiListActions from 'modules/phieuChi/actions/list';
import * as PhieuChiFormActions from 'modules/phieuChi/actions/form';

class PhieuChiSearchConditions extends React.Component{
   
   	constructor(){
        super();
    }

    _searchCondition(dateFrom, dateTo, keyword){
        Helper.PageBlock(I18n.t('application.text.loading'));
        this.props.searchByCondition(moment(dateFrom).format('YYYY-MM-DD'), moment(dateTo).format('YYYY-MM-DD'), keyword)
        .then(() => {
            
        })
    }

    _onSearchBill(){
        this._searchCondition(this.props.phieuChis.search.date_from, this.props.phieuChis.search.date_to, this.props.phieuChis.search.keyword);
        this.props.formClear(); //clear form cha
        this.props.clearSelectedDetail(); //clear detail form cha
    }
    
    _onSearch(field, value){
        this.props.changeSearchList(field, value);
    }
    
    _onShowAll(){
        let date_from =  moment().add(-100, 'years');
        
        this.props.changeSearchList('date_from', date_from);
        // call function search bill
        
        setTimeout(() => {
            this._onSearchBill();
        }, 500);
    }
    
    render(){
        return (
            <div className="portlet box green">
            	<div className="portlet-title">
            		<div className="caption">Tìm theo điều kiện</div>
            	</div>
                <div className="portlet-body">
                	<div className="form-horizontal">
                		<div className="form-body">
                			<div className="row">
                				<div className="col-sm-3">
	                				<div className="form-group">
	                					<div className="col-md-12">
	                						<div className="input-group date-picker input-daterange">
			                                    <Datepicker value={this.props.phieuChis.search.date_from} onChange={(value) => this._onSearch('date_from', value)}/>
			                                    <span className="input-group-addon">
			                                        <i className="fa fa-forward"></i>
			                                    </span>
			                                    <Datepicker value={this.props.phieuChis.search.date_to} onChange={(value) => this._onSearch('date_to', value)}/>
			                                </div>
	                					</div>
	                				</div>
                				</div>
                				<div className="col-sm-6">
	                				<div className="form-group">
	                					<label className="control-label col-md-2">Đối tượng</label>
	                					<div className="col-md-10">
	                						<input type="text" className="form-control" ref="code" onChange={(event => this._onSearch('keyword', event.target.value))}/>
	                					</div>
	                				</div>
                				</div>
                				<div className="col-sm-3">
	                				<div className="form-group">
	                					<div className="col-md-6">
	                						<button type="button" className="btn green btn-block btn-customer-size" onClick={this._onSearchBill.bind(this)}> Tìm </button>
	                					</div>
	                					<div className="col-md-6">
	                						<button type="button" className="btn green btn-block btn-customer-size" onClick={this._onShowAll.bind(this)}> Xem hết </button>
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
        phieuChiForm
    }) => {
    return {
        phieuChis,
        phieuChiForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...PhieuChiListActions,
        ...PhieuChiFormActions,
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PhieuChiSearchConditions);