import App from 'app/App';
import UserFormSignIn from 'modules/user/UserFormSignIn';

import Backend from 'app/Backend';
import UnitFormView from 'modules/unit/UnitFormView';
import StoragePositionFormView from 'modules/storagePosition/StoragePositionFormView';
import StorageConditionFormView from 'modules/storageCondition/StorageConditionFormView';
import ProducerFormView from 'modules/producer/ProducerFormView';
import TreatmentGroupFormView from 'modules/treatmentGroup/TreatmentGroupFormView';
import MaterialFormView from 'modules/material/MaterialFormView';
import SupplierGroupFormView from 'modules/supplierGroup/SupplierGroupFormView';
import CustomerGroupFormView from 'modules/customerGroup/CustomerGroupFormView';
import SupplierFormView from 'modules/supplier/SupplierFormView';
import MedicineGroupFormView from 'modules/medicineGroup/MedicineGroupFormView';
import MedicineFormView from 'modules/medicine/MedicineFormView';
import MedicineNoPresFormView from 'modules/medicine/MedicineNoPresFormView';
import MedicinePresFormView from 'modules/medicine/MedicinePresFormView';
import MedicineInfoFormView from 'modules/medicine/MedicineInfoFormView';
import DashboardView from 'modules/dashboard/DashboardView';

/**
 * Phase 2
 */
import CustomerFormView from 'modules/customer/CustomerFormView';
import DrugStoreView from 'modules/drugStore/DrugStoreView';
import CountryFormView from 'modules/country/CountryFormView';
import DepartmentMedicineFormView from 'modules/departmentMedicine/DepartmentMedicineFormView';
import DoctorFormView from 'modules/doctor/DoctorFormView';
import PharmacyWarehouseFormView from 'modules/pharmacyWarehouse/PharmacyWarehouseFormView';
/**
 * End phase
 */

/**
 * Phase 3
 */
import BeginLiabilityFormView from 'modules/beginLiability/BeginLiabilityFormView';
import InputOutputTypeFormView from 'modules/inputOutputTypeForm/InputOutputTypeFormView';
import ProductInputFormView from 'modules/productInput/ProductInputFormView';
import ValueAddedTaxFormView from 'modules/valueAddedTax/ValueAddedTaxFormView';
import RetailCustomerFormView from 'modules/retailCustomer/RetailCustomerFormView';
import MedicineUpdatePriceFormView from 'modules/medicineUpdatePrice/MedicineUpdatePriceFormView';
import InternalStockDeliveryFormView from 'modules/internalStockDelivery/InternalStockDeliveryFormView';
import RetailerFormView from 'modules/retailer/RetailerFormView';
import PrescriptionRetailFormView from 'modules/prescriptionRetail/PrescriptionRetailFormView';
import WholeSalerFormView from 'modules/wholeSaler/WholeSalerFormView';


/**
 * Phase 4
 */
import MedicineWarningFormView from 'modules/medicineWarning/MedicineWarningFormView';
import MedicineExpireFormView from 'modules/medicineExpire/MedicineExpireFormView';
import MedicineLimitDateFormView from 'modules/medicineExpire/MedicineLimitDateFormView';
import PhieuThuFormView from 'modules/phieuThu/PhieuThuFormView';
import PhieuChiFormView from 'modules/phieuChi/PhieuChiFormView';
import HoaDonNhapXuatFormView from 'modules/hoaDonNhapXuat/HoaDonNhapXuatFormView';
import QuanLyCongNoFormView from 'modules/quanLyCongNo/QuanLyCongNoFormView';
import BaoCaoXuatNhapTonFormView from 'modules/baoCaoXuatNhapTon/BaoCaoXuatNhapTonFormView';

/**
 * Phase5
 */
import SoTheoDoiNhaPhanPhoiFormView from 'modules/supplier/SoTheoDoiNhaPhanPhoiFormView';
import SoNhapThuocFormView from 'modules/soNhapThuoc/SoNhapThuocFormView';
import SoBanThuocLeTheoDonFormView from 'modules/retailer/SoBanThuocLeTheoDonFormView';
import SoBanThuocLeKhongDonFormView from 'modules/prescriptionRetail/SoBanThuocLeKhongDonFormView';
import NhapHangTonDauFormView from 'modules/nhapHangTonDau/NhapHangTonDauFormView';
import XuatHuyHangFormView from 'modules/xuatHuyHang/XuatHuyHangFormView';
import XuatChuyenKhoFormView from 'modules/xuatChuyenKho/XuatChuyenKhoFormView';
/**
 * End phase5
 */

/*
 *
 * Phase6
 */
import BaoCaoNhapHangFormView from 'modules/baoCao/baoCaoNhapHang/BaoCaoNhapHangFormView';
import BaoCaoXuatHangTongHopFormView from 'modules/baoCao/baoCaoXuatHang/BaoCaoXuatHangTongHopFormView';
import BaoCaoXuatHangChiTietFormView from 'modules/baoCao/baoCaoXuatHangChiTiet/BaoCaoXuatHangChiTietFormView';
import TheKhoFormView from 'modules/baoCao/theKho/TheKhoFormView';
import SoTheoDoiNhapXuatThuocFormView from 'modules/soTheoDoiNhapXuatThuoc/SoTheoDoiNhapXuatThuocFormView';
import BaoCaoDoanhSoBanHangFormView from 'modules/baoCao/baoCaoDoanhSoBanHang/BaoCaoDoanhSoBanHangFormView';
import LoiNhuanTheoDonHangFormView from 'modules/baoCao/loiNhuanTheoDonHang/LoiNhuanTheoDonHangFormView';

/**
 * Phase 7
 */
import NhomThuocDangDuocBanFormView from 'modules/baoCao/nhomThuocDangDuocBan/NhomThuocDangDuocBanFormView';
import ThuocDangDuocBanFormView from 'modules/baoCao/thuocDangDuocBan/ThuocDangDuocBanFormView';
import KhachLeTraHangFormView from 'modules/khachLeTraHang/KhachLeTraHangFormView';
import XuatTraHangNCCFormView from 'modules/xuatTraHangNCC/XuatTraHangNCCFormView';
import KhachSiTraHangFormView from 'modules/khachSiTraHang/KhachSiTraHangFormView';
import LoiNhuanTheoMatHangFormView from 'modules/baoCao/loiNhuanTheoMatHang/LoiNhuanTheoMatHangFormView';
/*
 *
 * End phase7
 */

const {Route, IndexRoute} = ReactRouter;

import AuthHoc from 'common/hoc/Auth';

const routes = (
        <Route component={App}>
            <Route component={UserFormSignIn} path="/dang-nhap"/>
            <Route component={AuthHoc(Backend)}>
                <IndexRoute component={DashboardView}/>
                <Route component={DashboardView} path="/"/>
                <Route component={UnitFormView} path={Routes.unit.view}/>
                <Route component={StoragePositionFormView} path={Routes.storagePosition.view}/>
                <Route component={StorageConditionFormView} path={Routes.storageCondition.view}/>
                <Route component={ProducerFormView} path={Routes.producer.view}/>
                <Route component={TreatmentGroupFormView} path={Routes.treatmentGroup.view}/>
                <Route component={MaterialFormView} path={Routes.material.view}/>
                <Route component={SupplierGroupFormView} path={Routes.supplierGroup.view}/>
                <Route component={CustomerGroupFormView} path={Routes.customerGroup.view}/>
                <Route component={SupplierFormView} path={Routes.supplier.view}/>
                <Route component={MedicineGroupFormView} path={Routes.medicineGroup.view}/>
                <Route component={MedicineFormView} path={Routes.medicine.view}/>
                <Route component={MedicineNoPresFormView} path={Routes.medicineNoPres.view}/>
                <Route component={MedicinePresFormView} path={Routes.medicinePres.view}/>
                <Route component={MedicineInfoFormView} path={Routes.medicineInfo.view}/>
                <Route component={DashboardView} path={Routes.dashboard.view}/>
                <Route component={CustomerFormView} path={Routes.customer.view}/>
                <Route component={DrugStoreView} path={Routes.drugStore.view}/>
                <Route component={CountryFormView} path={Routes.country.view}/>
                <Route component={DepartmentMedicineFormView} path={Routes.departmentMedicine.view}/>
                <Route component={DoctorFormView} path={Routes.doctor.view}/>
                <Route component={PharmacyWarehouseFormView} path={Routes.pharmacyWarehouse.view}/>
                <Route component={BeginLiabilityFormView} path={Routes.beginLiability.view}/>
                <Route component={InputOutputTypeFormView} path={Routes.inputOutputTypeForm.view}/>
                <Route component={ProductInputFormView} path={Routes.productInput.view}/>
                <Route component={ValueAddedTaxFormView} path={Routes.valueAddedTax.view}/>
                <Route component={RetailCustomerFormView} path={Routes.retailCustomer.view}/>
                <Route component={MedicineUpdatePriceFormView} path={Routes.medicineUpdatePrice.view}/>
                <Route component={InternalStockDeliveryFormView} path={Routes.internalStockDelivery.view}/>
                <Route component={RetailerFormView} path={Routes.retailer.view}/>
                <Route component={WholeSalerFormView} path={Routes.wholeSaler.view}/>
                <Route component={PrescriptionRetailFormView} path={Routes.prescriptionRetail.view}/>
                <Route component={MedicineWarningFormView} path={Routes.medicineWarning.view}/>
                <Route component={MedicineExpireFormView} path={Routes.medicineExpire.view}/>
                <Route component={MedicineLimitDateFormView} path={Routes.medicineLimitDate.view}/>
                <Route component={PhieuThuFormView} path={Routes.phieuThu.view}/>
                <Route component={PhieuChiFormView} path={Routes.phieuChi.view}/>
                <Route component={HoaDonNhapXuatFormView} path={Routes.hoaDonNhapXuat.view}/>
                <Route component={QuanLyCongNoFormView} path={Routes.quanLyCongNo.view}/>
                <Route component={BaoCaoXuatNhapTonFormView} path={Routes.baoCaoXuatNhapTon.view}/>
                <Route component={SoTheoDoiNhaPhanPhoiFormView} path={Routes.soTheoDoiNhaPhanPhoi.view}/>
                <Route component={SoNhapThuocFormView} path={Routes.soNhapThuoc.view}/>
                <Route component={SoBanThuocLeTheoDonFormView} path={Routes.soBanThuocLeTheoDon.view}/>
                <Route component={SoBanThuocLeKhongDonFormView} path={Routes.soBanThuocLeKhongTheoDon.view}/>
                <Route component={NhapHangTonDauFormView} path={Routes.nhapHangTonDau.view}/>
                <Route component={XuatHuyHangFormView} path={Routes.xuatHuyHang.view}/>
                <Route component={XuatChuyenKhoFormView} path={Routes.xuatChuyenKho.view}/>
                <Route component={BaoCaoNhapHangFormView} path={Routes.baoCaoNhapHang.view}/>
                <Route component={BaoCaoXuatHangTongHopFormView} path={Routes.baoCaoXuatHangTongHop.view}/>
                <Route component={BaoCaoXuatHangChiTietFormView} path={Routes.baoCaoXuatHangChiTiet.view}/>
                <Route component={TheKhoFormView} path={Routes.theKho.view}/>
                <Route component={SoTheoDoiNhapXuatThuocFormView} path={Routes.soTheoDoiNhapXuatThuoc.view}/>
                <Route component={BaoCaoDoanhSoBanHangFormView} path={Routes.baoCaoDoanhSoBanHang.view}/>
                <Route component={NhomThuocDangDuocBanFormView} path={Routes.nhomThuocDangDuocBan.view}/>
                <Route component={ThuocDangDuocBanFormView} path={Routes.thuocDangDuocBan.view}/>
                <Route component={KhachLeTraHangFormView} path={Routes.khachLeTraHang.view}/>
                <Route component={KhachSiTraHangFormView} path={Routes.khachSiTraHang.view}/>
                <Route component={XuatTraHangNCCFormView} path={Routes.xuatTraHangNCC.view}/>
                <Route component={LoiNhuanTheoDonHangFormView} path={Routes.loiNhuanTheoDonHang.view}/>
                        <Route component={LoiNhuanTheoMatHangFormView} path={Routes.loiNhuanTheoMatHang.view}/>

            </Route>
        </Route>
        );

module.exports = routes;