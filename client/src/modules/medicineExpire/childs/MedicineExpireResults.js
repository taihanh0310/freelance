const {Translate, I18n} = ReactReduxI18n;
import * as MedicineExpireListActions from 'modules/medicineExpire/actions/list';
import * as MedicineExpireFormActions from 'modules/medicineExpire/actions/form';

class MedicineExpireResults extends React.Component{
    
    componentDidMount(){
        Helper.CheckPageHeight(300);
    }
    
    render(){
        return (
            <div className="portlet box green">
                <div className="portlet-title">
                    <div className="caption">
                        Kết quả tìm kiếm
                    </div>
                </div>
                <div className="portlet-body">
                    <div className="row">
                        <div className="table-scrollable col-sm-12">
                            <table className="table fixed-header table-bordered" id="search_bill_result_list">
                                <thead>
                                    <tr>
                                        <th className="col-md-2">Tên sản phẩm</th>
                                        <th>Đơn vị tính</th>
                                        <th>Số lô</th>
                                        <th>Nhà thuốc</th>
                                        <th>Tồn tối thiểu</th>
                                        <th style={{color:this.props.medicineExpireForm.values.color_warning}}>Tồn hiện tại</th>
                                        <th>Tồn tối đa</th>
                                        <th>Nhà sản xuất</th>
                                        <th>Nhà cung cấp</th>
                                    </tr>
                                </thead>
                                <tbody id="list-container">
                                {
                                    (this.props.medicineExpires === 'undefined' || this.props.medicineExpires.list === 'undefined' || this.props.medicineExpires.list.length == 0)
                                    ?
                                    (    <tr>
                                            <td colSpan="9" className='text-center'>
                                                <Translate value="application.text.noItems"/>
                                            </td>
                                        </tr>
                                    )
                                    :
                                    (
                                        this.props.medicineExpires.list.map((medicineExpire, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{medicineExpire.name}</td>
                                                    <td>{medicineExpire.unit_name}</td>
                                                    <td>{medicineExpire.shipment_no}</td>
                                                    <td>{medicineExpire.kho_thuoc}</td>
                                                    <td className="text-right">{Numeral(medicineExpire.ton_toi_thieu).format('0,0')}</td>
                                                    <td style={{color:this.props.medicineExpireForm.values.color_warning}} className="text-right">{Numeral(medicineExpire.so_luong_ton).format('0,0')}</td>
                                                    <td className="text-right">{Numeral(medicineExpire.ton_toi_da).format('0,0')}</td>
                                                    <td>{medicineExpire.nha_san_xuat}</td>
                                                    <td>{medicineExpire.nha_cung_cap}</td>
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
            </div>
        );
    };
};

const mapStateToProps = ({
        medicineExpires,
        medicineExpireForm
    }) => {
    return {
        medicineExpires,
        medicineExpireForm
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...MedicineExpireListActions,
        ...MedicineExpireFormActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(MedicineExpireResults);