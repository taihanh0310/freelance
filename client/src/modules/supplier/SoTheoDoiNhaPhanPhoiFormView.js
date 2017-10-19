const {Translate, I18n} = ReactReduxI18n;
import * as supplierListActions from 'modules/supplier/actions/list';
import * as supplierDetailActions from 'modules/supplier/actions/detail';


class SoTheoDoiNhaPhanPhoiFormView extends React.Component{
	constructor(){
		super();
		this.state = {
			confirm: false
		};
	}
	componentDidMount(){
		this._loadSupplierList();		
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
		Keyboard.unbind('up');
		Keyboard.unbind('down');
		Keyboard.unbind('esc');
                Helper.CheckPageHeight(300);
	}
	_loadSupplierList(){
		Helper.PageBlock(I18n.t('application.text.loading'));
		this.props.loadSupplierList()
		.then(() => {
			if(this.props.suppliers.list.length === 1){
				this.props.selectDetail(this.props.suppliers.list[0], 0);
				this._setFormMode('add');
			}else{
				this.props.selectDetail(this.props.suppliers.list[1], 1);
			}
		})
	}
	
	
	_onClickRow(supplier, key){
		this.props.selectDetail(supplier, key);
	}
	_onPreviousRow(){
		if(this.props.supplier.detail.id){
			const suppliers = this.props.suppliers.list;
			if(this.props.supplier.key > 1){
				this.props.selectDetail(suppliers[this.props.supplier.key-1], this.props.supplier.key-1);
				this._scrollIntoRow(this.props.supplier.key);
			}
				
		}
	}
	_onNextRow(){
		if(this.props.supplier.detail.id){
			if(this.props.supplier.key < this.props.suppliers.list.length-1){
				this.props.selectDetail(this.props.suppliers.list[this.props.supplier.key+1], this.props.supplier.key+1);
				this._scrollIntoRow(this.props.supplier.key);
			}
		}
	}
	_onFirstRow(){
		if(this.props.supplier.key !== 0){
			this.props.selectDetail(this.props.suppliers.list[1], 1);
			this._scrollRow(1, '-');
		}
	}
	_onLastRow(){
		if(this.props.supplier.key !== this.props.suppliers.list.length-1){
			this.props.selectDetail(this.props.suppliers.list[this.props.suppliers.list.length-1], this.props.suppliers.list.length-1);
			this._scrollRow(this.props.suppliers.list.length-1, '+');
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
        
        _onSearch(field, value){
		this.props.changeSearchList(field, value);
		setTimeout(() => {
			const list = Helper.GetListFilter(this.props.suppliers.listRoot, this.props.suppliers.search);
			this.props.changeList(list);
			if(list.length === 1){
				this.props.selectDetail(list[0], 0);
			}else{
				this.props.selectDetail(list[1], 1);
			}
		}, 0);
	}
        
        _onPrintReview(){

            axios.post(`${Config.API_URL}supplier/pdfExport`,null,{
                responseType: 'arraybuffer'
            })
            .then((response) => {
                let downloadLink = document.createElement('a');
                downloadLink.target   = '_blank';

                const date = Moment(new Date()).format('YYYY.MM.DD_HH.mm.ss');
                const fileName = `bao_cao_quan_ly_nha_cung_cap_${date}.pdf`;
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
                Helper.alertErrorAferPrint();
            });
        }
        
        _onExcelPrintReview(){
            axios.post(`${Config.API_URL}supplier/excelExport`,null,{
                responseType: 'arraybuffer'
            })
            .then((response) => {
                 let downloadLink = document.createElement('a');
	  			downloadLink.target   = '_blank';

	  			const date = Moment(new Date()).format('YYYY.MM.DD_HH.mm.ss');
	  			const fileName = `danh_sach_nha_cung_cap_${date}.xlsx`;
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
                Helper.alertErrorAferPrint();
            });
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
			  						<Translate value="supplier.so_theo_doi.title"/>
			  					</div>
			  				</div>
			  				<div className="portlet-body">
			  					<div className="form-horizontal">
			  						<div className="form-body">
			  							<div className="row">
			  								<div className="col-md-12">
							  					<div className="form-group">
													<label className="control-label col-md-2">
														<Translate value="supplier.search.name"/>
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
			  									<th className="col-sm-3"><Translate value="supplier.field.name"/></th>
			  									<th className="col-sm-8"><Translate value="supplier.field.address"/></th>
			  									<th><Translate value="supplier.field.phone"/></th>
			  								</tr>
			  							</thead>
			  							<tbody id="list-container">
			  								{
			  									this.props.suppliers.list.map((supplier, key) => {
			  										if(supplier.id !== -1){
				  										if(supplier.sorted || typeof supplier.sorted === 'undefined'){
					  										return (
					  											<tr key={key} className={this.props.supplier.detail.id === supplier.id ? 'row-active': ''}
					  												id={`row-${key}`}
					  												onClick={this._onClickRow.bind(this, supplier, key)}>
					  												<td>{supplier.name}</td>
					  												<td>{supplier.address}</td>
                                                                                                                                                <td className="text-right">{supplier.phone}</td>
					  											</tr>
					  										);
					  									}
					  								}else{
					  									if(this.props.suppliers.list.length === 1){
					  										return (
					  											<tr key={key}>
					  												<td colSpan="3" className="text-center">
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
									<li><a>{this.props.supplier.key} / {this.props.suppliers.list.length-1}</a></li>
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
			  						<Translate value="application.text.buttonTitle"/>
			  					</div>
			  				</div>
			  				<div className="portlet-body form">
			  					<div className="form-horizontal">
			  						<div className="form-body">
			  							<div className="form-actions">
						  					<div className="row">
						  						<div className="col-md-12">
						  							<div className="row">
						  								<div className="col-md-9">
						  									<button type="button" className="btn green btn-customer-size" onClick={this._onPrintReview.bind(this)}>
						  										<Translate value="application.button.review_and_print"/>
						  									</button>
						  									&nbsp;
						  									<button type="button" className="btn green btn-customer-size" onClick={this._onExcelPrintReview.bind(this)}>
						  										<Translate value="application.button.excel_output"/>
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

const mapStateToProps = ({suppliers, supplier}) => {
	return {
		suppliers, supplier
	};
};

const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		...supplierListActions,
		...supplierDetailActions,
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SoTheoDoiNhaPhanPhoiFormView);