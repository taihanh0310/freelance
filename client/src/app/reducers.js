import userAuth from 'modules/user/reducers/userAuth';
import userCustomers from 'modules/user/reducers/customer';
import units from 'modules/unit/reducers/list';
import unit from 'modules/unit/reducers/detail';
import unitForm from 'modules/unit/reducers/form';
import storagePositions from 'modules/storagePosition/reducers/list';
import storagePosition from 'modules/storagePosition/reducers/detail';
import storagePositionForm from 'modules/storagePosition/reducers/form';
import storageConditions from 'modules/storageCondition/reducers/list';
import storageCondition from 'modules/storageCondition/reducers/detail';
import storageConditionForm from 'modules/storageCondition/reducers/form';
import producers from 'modules/producer/reducers/list';
import producer from 'modules/producer/reducers/detail';
import producerForm from 'modules/producer/reducers/form';
import treatmentGroups from 'modules/treatmentGroup/reducers/list';
import treatmentGroup from 'modules/treatmentGroup/reducers/detail';
import treatmentGroupForm from 'modules/treatmentGroup/reducers/form';
import materials from 'modules/material/reducers/list';
import material from 'modules/material/reducers/detail';
import materialForm from 'modules/material/reducers/form';

//: Supplier group
import supplierGroups from 'modules/supplierGroup/reducers/list';
import supplierGroup from 'modules/supplierGroup/reducers/detail';
import supplierGroupForm from 'modules/supplierGroup/reducers/form';

//: Customer group
import customerGroups from 'modules/customerGroup/reducers/list';
import customerGroup from 'modules/customerGroup/reducers/detail';
import customerGroupForm from 'modules/customerGroup/reducers/form';

import suppliers from 'modules/supplier/reducers/list';
import supplier from 'modules/supplier/reducers/detail';
import supplierForm from 'modules/supplier/reducers/form';
import medicineGroups from 'modules/medicineGroup/reducers/list';
import medicineGroup from 'modules/medicineGroup/reducers/detail';
import medicineGroupForm from 'modules/medicineGroup/reducers/form';
import medicines from 'modules/medicine/reducers/list';
import medicine from 'modules/medicine/reducers/detail';
import medicineForm from 'modules/medicine/reducers/form';

/**
 * Phase2
 */
import customers from 'modules/customer/reducers/list';
import customer from 'modules/customer/reducers/detail';
import customerForm from 'modules/customer/reducers/form';

import drugStores from 'modules/drugStore/reducers/list';
import drugStore from 'modules/drugStore/reducers/detail';
import drugStoreForm from 'modules/drugStore/reducers/form';

import countries from 'modules/country/reducers/list';
import country from 'modules/country/reducers/detail';
import countryForm from 'modules/country/reducers/form';

import departmentMedicines from 'modules/departmentMedicine/reducers/list';
import departmentMedicine from 'modules/departmentMedicine/reducers/detail';
import departmentMedicineForm from 'modules/departmentMedicine/reducers/form';

import doctors from 'modules/doctor/reducers/list';
import doctor from 'modules/doctor/reducers/detail';
import doctorForm from 'modules/doctor/reducers/form';

import pharmacyWarehouses from 'modules/pharmacyWarehouse/reducers/list';
import pharmacyWarehouse from 'modules/pharmacyWarehouse/reducers/detail';
import pharmacyWarehouseForm from 'modules/pharmacyWarehouse/reducers/form';

import users from 'modules/user/reducers/list';
/**
 * End phase2
 */

/**
 * Phase3
 */
import beginLiabilities from 'modules/beginLiability/reducers/list';
import beginLiability from 'modules/beginLiability/reducers/detail';
import beginLiabilityForm from 'modules/beginLiability/reducers/form';

import inputOutputTypeForms from 'modules/inputOutputTypeForm/reducers/list';
import inputOutputTypeForm from 'modules/inputOutputTypeForm/reducers/detail';
import inputOutputTypeFormForm from 'modules/inputOutputTypeForm/reducers/form';

import valuesAddedTax from 'modules/valueAddedTax/reducers/list';
import valueAddedTax from 'modules/valueAddedTax/reducers/detail';
import valueAddedTaxForm from 'modules/valueAddedTax/reducers/form';

import retailCustomers from 'modules/retailCustomer/reducers/list';
import retailCustomer from 'modules/retailCustomer/reducers/detail';
import retailCustomerForm from 'modules/retailCustomer/reducers/form';

import medicineUpdatePrices from 'modules/medicineUpdatePrice/reducers/list';
import medicineUpdatePrice from 'modules/medicineUpdatePrice/reducers/detail';
import medicineUpdatePriceForm from 'modules/medicineUpdatePrice/reducers/form';

import internalStockDeliveries from 'modules/internalStockDelivery/reducers/list';
import internalStockDeliveryForm from 'modules/internalStockDelivery/reducers/form';
import internalStockDeliveryFormChild from 'modules/internalStockDelivery/reducers/formChild';

import retailers from 'modules/retailer/reducers/list';
import retailerForm from 'modules/retailer/reducers/form';
import retailerFormChild from 'modules/retailer/reducers/formChild';

import prescriptionRetails from 'modules/prescriptionRetail/reducers/list';
import prescriptionRetailForm from 'modules/prescriptionRetail/reducers/form';
import prescriptionRetailFormChild from 'modules/prescriptionRetail/reducers/formChild';

import wholeSaleres from 'modules/wholeSaler/reducers/list';
import wholeSalerForm from 'modules/wholeSaler/reducers/form';
import wholeSalerFormChild from 'modules/wholeSaler/reducers/formChild';

import productInputs from 'modules/productInput/reducers/list';
import productInputForm from 'modules/productInput/reducers/form';
import productInputFormChild from 'modules/productInput/reducers/formChild';


/**
 * End phase3
 */

import medicineWarnings from 'modules/medicineWarning/reducers/list';
import medicineWarning from 'modules/medicineWarning/reducers/detail';
import medicineWarningForm from 'modules/medicineWarning/reducers/form';

import medicineExpires from 'modules/medicineExpire/reducers/list';
import medicineExpireForm from 'modules/medicineExpire/reducers/form';

import phieuChis from 'modules/phieuChi/reducers/list';
import phieuChiForm from 'modules/phieuChi/reducers/form';

import phieuThus from 'modules/phieuThu/reducers/list';
import phieuThuForm from 'modules/phieuThu/reducers/form';

import hoaDonNhapXuats from 'modules/hoaDonNhapXuat/reducers/list';
import baoCaoXuatNhapTons from 'modules/baoCaoXuatNhapTon/reducers/list';

import quanLyCongNos from 'modules/quanLyCongNo/reducers/list';


/**
 * Phase5
 */
import soNhapThuocs from 'modules/soNhapThuoc/reducers/list';
import nhapHangTonDaus from 'modules/nhapHangTonDau/reducers/list';
import nhapHangTonDauForm from 'modules/nhapHangTonDau/reducers/form';
import nhapHangTonDauFormChild from 'modules/nhapHangTonDau/reducers/formChild';

import xuatHuyHangs from 'modules/xuatHuyHang/reducers/list';
import xuatHuyHangForm from 'modules/xuatHuyHang/reducers/form';
import xuatHuyHangFormChild from 'modules/xuatHuyHang/reducers/formChild';

import xuatChuyenKhos from 'modules/xuatChuyenKho/reducers/list';
import xuatChuyenKhoForm from 'modules/xuatChuyenKho/reducers/form';
import xuatChuyenKhoFormChild from 'modules/xuatChuyenKho/reducers/formChild';
/**
 * End phase5
 */

/*
*
* Phase6
*/
import baoCaoNhapHangs from 'modules/baoCao/baoCaoNhapHang/reducers/list';
import baoCaoXuatHangs from 'modules/baoCao/baoCaoXuatHang/reducers/list';
import theKhos from 'modules/baoCao/theKho/reducers/list';
import soTheoDoiNhapXuatThuocs from 'modules/soTheoDoiNhapXuatThuoc/reducers/list';
import baoCaoDoanhSoBanHangs from 'modules/baoCao/baoCaoDoanhSoBanHang/reducers/list';
/*
*
* End Phase6
*/

/**
 * Phase7
 */
import nhomThuocDangDuocBans from 'modules/baoCao/nhomThuocDangDuocBan/reducers/list';
import thuocDangDuocBans from 'modules/baoCao/thuocDangDuocBan/reducers/list';

import khachLeTraHangs from 'modules/khachLeTraHang/reducers/list';
import khachLeTraHangForm from 'modules/khachLeTraHang/reducers/form';
import khachLeTraHangFormChild from 'modules/khachLeTraHang/reducers/formChild';

import khachSiTraHangs from 'modules/khachSiTraHang/reducers/list';
import khachSiTraHangForm from 'modules/khachSiTraHang/reducers/form';
import khachSiTraHangFormChild from 'modules/khachSiTraHang/reducers/formChild';

import xuatTraHangNCCs from 'modules/xuatTraHangNCC/reducers/list';
import xuatTraHangNCCForm from 'modules/xuatTraHangNCC/reducers/form';
import xuatTraHangNCCFormChild from 'modules/xuatTraHangNCC/reducers/formChild';
import loiNhuanTheoDonHangs from 'modules/baoCao/loiNhuanTheoDonHang/reducers/list';
import loiNhuanTheoMatHangs from 'modules/baoCao/loiNhuanTheoMatHang/reducers/list';
/**
 * Phase7
 */

import paymentType from 'modules/paymentType/reducers/list';

const rootReducer = Redux.combineReducers({
    userAuth,
    userCustomers,
    routing: ReactRouterRedux.routerReducer,
    i18n: ReactReduxI18n.i18nReducer,
    units,
    unit,
    unitForm,
    storagePosition,
    storagePositions,
    storagePositionForm,
    storageCondition,
    storageConditions,
    storageConditionForm,
    producer,
    producers,
    producerForm,
    treatmentGroup,
    treatmentGroups,
    treatmentGroupForm,
    material,
    materials,
    materialForm,

    //: Supplier group
    supplierGroup,
    supplierGroups,
    supplierGroupForm,

    //: Customer group
    customerGroups,
    customerGroup,
    customerGroupForm,

    supplier,
    suppliers,
    supplierForm,
    medicineGroup,
    medicineGroups,
    medicineGroupForm,
    medicines,
    medicine,
    medicineForm,
    customers,
    customer,
    customerForm,
    drugStores,
    drugStore,
    drugStoreForm,
    countries,
    country,
    countryForm,
    departmentMedicines,
    departmentMedicine,
    departmentMedicineForm,
    doctors,
    doctor,
    doctorForm,
    pharmacyWarehouses,
    pharmacyWarehouse,
    pharmacyWarehouseForm,
    users,
    beginLiabilities,
    beginLiability,
    beginLiabilityForm,
    inputOutputTypeForms,
    inputOutputTypeForm,
    inputOutputTypeFormForm,
    productInputs,
    productInputForm,
    productInputFormChild,
    valuesAddedTax,
    valueAddedTax,
    valueAddedTaxForm,
    retailCustomers,
    retailCustomer,
    retailCustomerForm,
    medicineUpdatePrices,
    medicineUpdatePrice,
    medicineUpdatePriceForm,
    internalStockDeliveries,
    internalStockDeliveryForm,
    internalStockDeliveryFormChild,
    retailers,
    retailerForm,
    retailerFormChild,
    wholeSaleres,
    wholeSalerForm,
    wholeSalerFormChild,
    prescriptionRetails,
    prescriptionRetailForm,
    prescriptionRetailFormChild,
    medicineWarnings,
    medicineWarning,
    medicineWarningForm,
    medicineExpires,
    medicineExpireForm,
    phieuChis,
    phieuChiForm,
    phieuThus,
    phieuThuForm,
    hoaDonNhapXuats,
    baoCaoXuatNhapTons,
    quanLyCongNos,
    soNhapThuocs,
    nhapHangTonDaus,
    nhapHangTonDauForm,
    nhapHangTonDauFormChild,
    xuatHuyHangs,
    xuatHuyHangForm,
    xuatHuyHangFormChild,
    xuatChuyenKhos,
    xuatChuyenKhoForm,
    xuatChuyenKhoFormChild,
    baoCaoNhapHangs,
    baoCaoXuatHangs,
    theKhos,
    soTheoDoiNhapXuatThuocs,
    baoCaoDoanhSoBanHangs,
    nhomThuocDangDuocBans,
    thuocDangDuocBans,
    khachLeTraHangs,
    khachLeTraHangForm,
    khachLeTraHangFormChild,
    khachSiTraHangs,
    khachSiTraHangForm,
    khachSiTraHangFormChild,
    xuatTraHangNCCs,
    xuatTraHangNCCForm,
    xuatTraHangNCCFormChild,
    loiNhuanTheoDonHangs,
    loiNhuanTheoMatHangs,
    paymentType
});


module.exports = rootReducer;