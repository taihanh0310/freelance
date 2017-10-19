const {Translate, I18n} = ReactReduxI18n;

import DieuKienTimKiem from 'modules/hoaDonNhapXuat/childs/DieuKienTimKiem';
import DanhSachHoaDon from 'modules/hoaDonNhapXuat/childs/DanhSachHoaDon';
import ChiTietHoaDon from 'modules/hoaDonNhapXuat/childs/ChiTietHoaDon';
import HoaDonNhapXuatButtons from 'modules/hoaDonNhapXuat/childs/HoaDonNhapXuatButtons';

class HoaDonNhapXuatFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Hóa đơn xuất - nhập hàng
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-12"><DieuKienTimKiem/></div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <DanhSachHoaDon/>
                                    </div>
                                    <div className="col-sm-9">
                                        <ChiTietHoaDon/>
                                    </div>
                                </div>
                                <HoaDonNhapXuatButtons/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
module.exports = HoaDonNhapXuatFormView;