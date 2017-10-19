const {Translate, I18n} = ReactReduxI18n;
import * as HoaDonNhapXuatListActions from 'modules/hoaDonNhapXuat/actions/list';

class DanhSachHoaDon extends React.Component {

	_onClickRow(hoaDonXuatNhap, key){
        this.props.chooseSelectedDetail(hoaDonXuatNhap);
    }
    
    componentDidMount(){
        Helper.CheckPageHeight(300);
    }

    render(){
        return (
                <div className="portlet box green">
	            	<div className="portlet-title">
	                    <div className="caption">
	                        Danh sách hóa đơn
	                    </div>
	                </div>
	                <div className="portlet-body">
	                	<div className="table-scrollable">
	                		<table className="table fixed-header table-bordered">
	                			<thead>
	                                <tr>
	                                    <th><span>Mã hóa đơn</span></th>
	                                    <th><span>Ngày tạo</span></th>
	                                </tr>
	                            </thead>
	                            <tbody id="list-container">
	                            {
	                                (this.props.hoaDonNhapXuats === 'undefined' || this.props.hoaDonNhapXuats.list === 'undefined' || this.props.hoaDonNhapXuats.list.length == 0)
	                                ?
	                                (    <tr>
	                                        <td colSpan="2" className='text-center'>
	                                            <Translate value="application.text.noItems"/>
	                                        </td>
	                                    </tr>
	                                )
	                                :
	                                (
	                                    this.props.hoaDonNhapXuats.list.map((item, key) => {
	                                        const selected = (this.props.hoaDonNhapXuats.selectedDetail.code == item.code) ? 'row-active': '';
	                                        return (
	                                            <tr key={key} className={selected} onClick={this._onClickRow.bind(this, item, key)}>
	                                                <td>{item.code}</td>
	                                                <td>{Helper.formatStringToDate(item.create_date)}</td>
	                                            </tr>
	                                        );
	                                    })
	                                )
                            	}
	                            </tbody>
	                		</table>
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

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DanhSachHoaDon);