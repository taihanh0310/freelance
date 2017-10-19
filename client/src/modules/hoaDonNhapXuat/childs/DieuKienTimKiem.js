const {Translate, I18n} = ReactReduxI18n;
import Datepicker from 'common/components/Datepicker';
import * as HoaDonNhapXuatListActions from 'modules/hoaDonNhapXuat/actions/list';

class DieuKienTimKiem extends React.Component {
    
    constructor(){
        super();
        this.state = {
            dateFrom: moment().add(-1, 'months'),
            dateTo: moment().add(0, 'days'),
            keyword: '',
            type: -1
        }
    }
    
    componentDidMount(){
        this._onSearchBill();
    }

    _searchCondition(dateFrom, dateTo, keyword, type){
        Helper.PageBlock(I18n.t('application.text.loading'));
        this.props.searchByCondition(moment(dateFrom).format('YYYY-MM-DD'), moment(dateTo).format('YYYY-MM-DD'), keyword, type)
        .then(() => {
            
        })
    }
    
    _onSearchBill(){
        this._searchCondition(this.state.dateFrom, this.state.dateTo, this.state.keyword, this.state.type);
        this.props.clearSelectedDetail(); //clear detail form cha
        this.props.clearListChild(); //clear list child
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
			                                    <Datepicker value={this.state.dateFrom} onChange={(value) => this.setState({dateFrom: value})}/>
			                                    <span className="input-group-addon">
			                                        <i className="fa fa-forward"></i>
			                                    </span>
			                                    <Datepicker value={this.state.dateTo} onChange={(value) => this.setState({dateTo: value})}/>
			                                </div>
	                					</div>
	                				</div>
                				</div>
                                                <div className="col-sm-2">
	                				<div className="form-group">
	                					<div className="col-md-12">
	                						<select className="form-control" onChange={(event) => this.setState({type: event.target.value})}>
	                                            <option value="-1">Tất cả</option>
	                                            <option value="0">Hóa đơn nhập</option>
	                                            <option value="1">Hóa đơn xuất</option>
	                                        </select>
	                					</div>
	                				</div>
                				</div>
                				<div className="col-sm-5">
	                				<div className="form-group">
	                					<label className="control-label col-md-3">Tìm hóa đơn</label>
	                					<div className="col-md-9">
	                						<input type="text" className="form-control" ref="code" onChange={(event) => this.setState({keyword: event.target.value})}/>
	                					</div>
	                				</div>
                				</div>
                				<div className="col-sm-2">
	                				<div className="form-group">
	                					<div className="col-md-12">
	                						<button type="button" className="btn green btn-block btn-customer-size" onClick={this._onSearchBill.bind(this)}> Tìm kiếm</button>
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
}

const mapStateToProps = ({
        hoaDonNhapXuats
    }) => {
    return {
        hoaDonNhapXuats
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...HoaDonNhapXuatListActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DieuKienTimKiem);