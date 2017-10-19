const {Translate, I18n} = ReactReduxI18n;

class Header extends React.Component {
    _onLogout() {
        localStorage.removeItem('token');
        this.props.push(Routes.login.view);
    }
    render() {
        return (
                <div className="page-header">
                    <div className="page-header-menu">
                        <div className="container-fluid">
                            <div className="hor-menu">
                                <ul className="nav navbar-nav">
                                    <li className="menu-dropdown classic-menu-dropdown">
                                        <a>
                                            <Translate value="application.menu.category"/>
                                            <span className="arrow"></span>
                                        </a>
                                        <ul className="dropdown-menu pull-left">
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.medicineGroup.view)}>
                                                    <Translate value="medicineGroup.name"/>
                                                </a>
                                            </li>

                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.material.view)}>
                                                    <Translate value="material.name"/>
                                                </a>
                                            </li>
                                            <li className="dropdown-submenu">
                                                <a className="nav-link nav-toggle">
                                                    <Translate value="medicine.name"/>
                                                    <span className="arrow open"></span>
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a className="nav-link" onClick={() => window.location.href = Routes.medicine.view}>
                                                            <Translate value="medicine.nameTotal"/>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="nav-link" onClick={() => window.location.href = Routes.medicineInfo.view}>
                                                            <Translate value="medicine.nameInfo"/>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.treatmentGroup.view)}>
                                                    <Translate value="treatmentGroup.name"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.producer.view)}>
                                                    <Translate value="producer.name"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.supplierGroup.view)}>
                                                    <Translate value="supplierGroup.name"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.customerGroup.view)}>
                                                    <Translate value="customerGroup.name"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.supplier.view)}>
                                                    <Translate value="supplier.name"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.storageCondition.view)}>
                                                    <Translate value="storageCondition.name"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.storagePosition.view)}>
                                                    <Translate value="storagePosition.name"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.unit.view)}>
                                                    <Translate value="unit.name"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.country.view)}>
                                                    <Translate value="country.name"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.pharmacyWarehouse.view)}>
                                                    <Translate value="pharmacyWarehouse.name"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.inputOutputTypeForm.view)}>
                                                    <Translate value="inputOutputTypeFormTrans.name"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.retailCustomer.view)}>
                                                    <Translate value="retailCustomer.name"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.medicineUpdatePrice.view)}>
                                                    <Translate value="medicineUpdatePrice.name"/>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="menu-dropdown classic-menu-dropdown">
                                        <a>
                                            <Translate value="application.menu.medicineManagement"/>
                                            <span className="arrow"></span>
                                        </a>
                                        <ul className="dropdown-menu pull-left">
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.beginLiability.view)}>
                                                    <Translate value="beginLiability.name"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => window.location.href = Routes.productInput.view}>
                                                    <Translate value="productInput.name"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => window.location.href = Routes.internalStockDelivery.view}>
                                                    <Translate value="internalStockDelivery.name"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => window.location.href = Routes.wholeSaler.view}>
                                                    Bán sỉ
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => window.location.href = Routes.retailer.view}>
                                                    Bán lẻ theo đơn
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => window.location.href = Routes.prescriptionRetail.view}>
                                                    Bán lẻ không theo đơn
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.medicineExpire.view)}>
                                                    Thuốc tồn tối thiểu
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.medicineLimitDate.view)}>
                                                    Thuốc sắp hết hạn sử dụng
                                                </a>
                                            </li>

                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.phieuThu.view)}>
                                                    Phiếu thu tiền
                                                </a>
                                            </li>

                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.phieuChi.view)}>
                                                    Phiếu chi tiền
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.hoaDonNhapXuat.view)}>
                                                    Hoá đơn nhập xuất
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.quanLyCongNo.view)}>
                                                    Quản lý công nợ
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.khachLeTraHang.view)}>
                                                    Khách lẻ trả hàng
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.khachSiTraHang.view)}>
                                                    Khách sỉ trả hàng
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.xuatTraHangNCC.view)}>
                                                    Xuất trả hàng cho NCC
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="menu-dropdown classic-menu-dropdown">
                                        <a>
                                            <Translate value="application.menu.medicineDocument"/>
                                            <span className="arrow"></span>
                                        </a>
                                        <ul className="dropdown-menu pull-left">
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.soTheoDoiNhaPhanPhoi.view)}>
                                                    Sổ theo dõi nhà cung cấp
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.soNhapThuoc.view)}>
                                                    Sổ nhập thuốc
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.soBanThuocLeTheoDon.view)}>
                                                    Sổ bán thuốc theo đơn
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.soBanThuocLeKhongTheoDon.view)}>
                                                    Sổ bán thuốc không theo đơn
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.nhapHangTonDau.view)}>
                                                    Nhập thuốc tồn đầu
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.xuatHuyHang.view)}>
                                                    Xuất hủy hàng
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.xuatChuyenKho.view)}>
                                                    Xuất chuyển kho
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.soTheoDoiNhapXuatThuoc.view)}>
                                                    Sổ nhập - xuất thuốc
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.theKho.view)}>
                                                    Thẻ kho
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="menu-dropdown classic-menu-dropdown">
                                        <a>
                                            <Translate value="application.menu.report"/>
                                            <span className="arrow"></span>
                                        </a>
                                        <ul className="dropdown-menu pull-left">
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.baoCaoNhapHang.view)}>
                                                    Báo cáo nhập hàng
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.baoCaoXuatHangTongHop.view)}>
                                                    Xuất hàng tổng hợp
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.baoCaoXuatHangChiTiet.view)}>
                                                    Xuất hàng chi tiết
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.baoCaoDoanhSoBanHang.view)}>
                                                    Doanh số bán hàng
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.nhomThuocDangDuocBan.view)}>
                                                    Nhóm thuốc đang được bán
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.thuocDangDuocBan.view)}>
                                                    Thuốc đang được bán
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.loiNhuanTheoDonHang.view)}>
                                                    Lợi nhuận theo đơn hàng
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.loiNhuanTheoMatHang.view)}>
                                                    Lợi nhuận theo mặt hàng
                                                </a>
                                            </li>
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.baoCaoXuatNhapTon.view)}>
                                                    Xuất - nhập - tồn
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="menu-dropdown classic-menu-dropdown">
                                        <a>
                                            <Translate value="application.menu.system"/>
                                            <span className="arrow"></span>
                                        </a>
                                        <ul className="dropdown-menu pull-left">
                                            <li>
                                                <a className="nav-link" onClick={() => this.props.push(Routes.medicineWarning.view)}>
                                                    Cảnh báo
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a onClick={this._onLogout.bind(this)}><Translate value="signOut.title"/></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                );
    }
    ;
}
;

const mapStateToProps = ({userAuth}) => {
    return {userAuth};
};

const mapDispatchToProps = dispatch => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Header);
