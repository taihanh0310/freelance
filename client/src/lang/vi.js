const Language = {
    application: {
        name: 'Pharma',
        copyright: '@ Bản quyền bởi Pharma 2017',
        menu: {
            system: 'Hệ thống',
            category: 'Danh mục',
            medicineManagement: 'Quản lý nhà thuốc',
            medicineDocument: 'Hồ sơ nhà thuốc',
            finding: 'Tìm kiếm',
            report: 'Báo cáo',
            help: 'Trợ giúp',
            keyManagement: 'Quản lý phím tắt',
        },
        field: {
            email: 'Địa chỉ email',
            password: 'Mật khẩu'
        },
        label: {
            info: 'Thông tin cơ bản'
        },
        text: {
            loading: 'Đang tải',
            confirmDelete: 'Bạn có muốn xóa không ?',
            noItems: 'Không có dữ liệu',
            formTitle: 'Thông tin cơ bản',
            done: 'Hoàn thành',
            buttonTitle: 'Phím chức năng',
            vatTax: 'Thuế VAT(%)',
            chooseItem: 'Vui lòng chọn hóa đơn để thao tác'
        },
        button: {
            add: 'Thêm mới (F4)',
            edit: 'Ghi nhận (F6)',
            save: 'Cập nhật',
            delete: 'Xóa bỏ (F8)',
            exit: 'Thoát (ESC)',
            yes: 'OK',
            no: 'Thoát',
            print_medicine: 'In thông tin thuốc',
            excel_output: 'Xuất file excel',
            review_and_print: 'Xem và in',
            review_and_print_detail: 'In chi tiết',
            select: 'Chọn',
            print_barcode: "In mã vạch",
            search: "Tìm kiếm (F9)",
            addChild: 'Thêm SP',
            saveChild: 'Ghi nhận',
            delChid: 'Xóa'
        },
        validation: {
            required: 'Bắt buộc phải nhập',
            email: 'Email phải nhập chính xác',
            url: 'URL bạn nhập không đúng',
            phone: 'Phải nhập chính xác số điện thoại',
            fax: 'Phải nhập chính xác số Fax',
            bank_number: 'Phải nhập chính xác tài khoản ngân hàng',
            currency: 'Giá nhập vào phải đúng định dạng',
            max: 'Số lượng xuất không được lớn hơn số lượng tồn kho',
            compareLimitedDate: 'Hạn sử dụng phải lớn ngày sản xuất',
            compareBanSiQuanlity: 'Số lượng nhập phải nhỏ hơn hoặc bằng số lượng bán',
            returnDate: 'Ngày nhập thuốc phải lớn hơn ngày bán ra',
            spaceErrors: ' '
        }
    },
    signIn: {
        title: 'Đăng nhập',
        button: 'Đăng nhập'
    },
    signOut: {
        title: 'Đăng xuất'
    },
    unit: {
        name: 'Đơn vị tính',
        title: 'Đơn vị tính',
        field: {
            code: 'Số hiệu',
            name: 'Tên đơn vị tính',
            alias: 'Định danh'
        },
        search: {
            name: 'Tìm kiếm đơn vị tính'
        }
    },
    storagePosition: {
        name: 'Vị trí cất giữ',
        title: 'Vị trí cất giữ',
        field: {
            code: 'Mã vị trí',
            name: 'Tên vị trí',
            position: 'Vị trí'
        },
        search: {
            name: 'Tìm kiếm tên vị trí'
        }
    },
    storageCondition: {
        name: 'Điều kiện bảo quản',
        title: 'Điều kiện bảo quản',
        field: {
            name: 'Điều kiện bảo quản',
            code: 'Số hiệu',
            position: 'Vị trí'
        },
        search: {
            name: 'Tìm kiếm tên'
        }
    },
    producer: {
        name: 'Nhà sản xuất',
        title: 'Danh mục nhà sản xuất',
        field: {
            code: 'Số hiệu',
            name: 'Tên nhà sản xuất',
            address: 'Địa chỉ',
            phone: 'Điện thoại',
            fax: 'Fax',
            email: 'Email',
            website: 'Website',
            description: 'Diễn giải'
        },
        search: {
            name: 'Tìm kiếm tên'
        }
    },
    treatmentGroup: {
        name: 'Nhóm điều trị',
        title: 'Danh mục nhóm điều trị',
        field: {
            code: 'Mã nhóm',
            name: 'Tên nhóm',
            description: 'Diễn giải',
            position: 'Vị trí'
        },
        search: {
            name: 'Tìm kiếm tên nhóm'
        }
    },
    medicineGroup: {
        name: 'Nhóm thuốc',
        title: 'Danh mục nhóm thuốc',
        field: {
            code: 'Số hiệu',
            name: 'Tên nhóm thuốc',
            description: 'Diễn giải',
            position: 'Vị trí'
        },
        search: {
            name: 'Tìm kiếm tên nhóm'
        }
    },
    medicine: {
        name: 'Thuốc',
        nameTotal: 'Thuốc, vật tư tổng hợp',
        nameNoPres: 'Thuốc bán không theo đơn',
        namePres: 'Thuốc bán theo đơn',
        nameInfo: 'Thông tin thuốc, vật tư',
        title: 'Thông tin thuốc',
        field: {
            code: 'Mã thuốc',
            name: 'Tên thuốc',
            input_price: 'Giá nhập',
            wholesale_price: 'Giá bán sỉ',
            retail_price: 'Giá bán lẻ',
            listed_price: 'Giá niêm yết',
            max_number: 'Tồn tối đa',
            min_number: 'Tồn tối thiểu',
            day_warning: 'Số ngày cảnh báo',
            number_warning: 'Số lượng cảnh báo',
            expiry: 'Đời sống thuốc',
            specification: 'Quy cách',
            position: 'Vị trí',
            unit_parent_id: 'Đơn vị tính 1',
            unit_children_id: 'Đơn vị tính 2',
            unit_name: 'Đơn vị tính',
            coefficient: 'Hệ số quy đổi',
            producer_id: 'Nhà sản xuất',
            medicine_group_id: 'Nhóm thuốc',
            treatment_group_id: 'Nhóm điều trị',
            storage_condition_id: 'Điều kiện bảo quản',
            storage_position_id: 'Vị trí cất giữ',
            prescription_drug: 'Theo đơn',
            keep_out_children: 'Để xa tầm tay trẻ em',
            psychotropic_medicine: 'Thuốc hướng thần',
            avoid_direct_sunlight: 'Tránh ánh sáng mặt trời',
            avoid_moisture: 'Tránh ẩm ướt',
            health_insurance: 'BHYT',
            material_id: 'Hoạt chất',
            no_registration: 'Số đăng ký',
            dosage_form: 'Dạng bào chế',
            company_registration: 'Công ty đăng ký',
            medicine_information: 'Thông tin thuốc',
            medicine_barcode: 'Mã vạch'
        },
        header: {
            unit_children_id: 'Đơn vị tính'
        },
        search: {
            name: 'Tìm kiếm theo tên thuốc'
        }
    },
    material: {
        name: 'Hoạt chất',
        title: 'Danh mục hoạt chất',
        field: {
            code: 'Mã hoạt chất',
            name: 'Tên hoạt chất',
            description: 'Diễn giải',
            position: 'Vị trí'
        },
        search: {
            name: 'Tìm kiếm tên'
        }
    },
    supplierGroup: {
        name: 'Nhóm nhà cung cấp',
        title: 'Danh mục nhóm nhà cung cấp',
        field: {
            name: 'Tên nhóm',
            code: 'Số hiệu',
            description: 'Diễn giải',
            import_discount: 'Chiết xuất nhập',
            position: 'Vị trí'
        },
        helper: {
            output_discount: '(Chiết khấu xuất tính theo %)'
        },
        search: {
            name: 'Tìm kiếm tên'
        }
    },
    customerGroup: {
        name: 'Nhóm khách hàng',
        title: 'Danh mục nhóm khách hàng',
        field: {
            name: 'Tên nhóm',
            code: 'Số hiệu',
            description: 'Diễn giải',
            export_discount: 'Chiết xuất xuất',
            position: 'Vị trí'
        },
        helper: {
            output_discount: '(Chiết khấu xuất tính theo %)'
        },
        search: {
            name: 'Tìm kiếm tên'
        }
    },
    supplier: {
        name: 'Nhà cung cấp',
        title: 'Danh mục nhà cung cấp',
        field: {
            code: 'Số hiệu',
            name: 'Tên nhà cung cấp',
            supplier_group_id: 'Nhóm nhà cung cấp',
            address: 'Địa chỉ',
            phone: 'Điện thoại',
            fax: 'Fax',
            email: 'Email',
            website: 'Website',
            tax_code: 'Mã số thuế',
            peole_contact: 'Người liên hệ',
            description: 'Diễn giải',
            is_customer: 'Khách hàng',
            position: 'Vị trí'
        },
        search: {
            name: 'Tìm kiếm tên'
        },
        so_theo_doi:{
        	title: 'Sổ theo dõi nhà cung cấp',
        }
    },
    /**
     * Phase 2
     */
    customer: {
        name: 'Danh sách khách hàng',
        title: 'Danh sách khách hàng',
        field: {
            code: 'Số hiệu',
            name: 'Tên khách hàng',
            supplier_group_id: 'Nhóm khách hàng',
            address: 'Địa chỉ',
            phone_number: 'Điện thoại',
            fax_number: 'Fax',
            email: 'Email',
            tax_number: 'Mã số thuế',
            is_customer: 'Nhà cung cấp',
            position: 'Vị trí'
        }
    },

    drugStore: {
      name: 'Danh mục nhà thuốc',
      title: 'Danh mục nhà thuốc',
      field: {
          code: 'Số hiệu',
          nameShow: 'Tên nhà thuốc',
          nameInput: 'Tên gọi',
          address: 'Địa chỉ',
          fax_number: 'Fax',
          phone_number: 'Điện thoại',
          email: 'Email',
          position: 'Vị trí',
          description: 'Diễn giải'
      }
    },

    sick: {
      name: 'Danh mục bệnh lý',
      title: 'Danh mục bệnh lý',
      field: {
          code: 'Số hiệu',
          name: 'Tên gọi',
          description: 'Diễn giải'
      }
    },
    country: {
      name: 'Nguồn gốc - Xuất xứ',
      title: 'Nguồn gốc - Xuất xứ',
      field: {
          code: 'Số hiệu',
          name: 'Tên quốc gia',
          description: 'Diễn giải'
      }
    },

    departmentMedicine: {
      name: 'Khoa - Phòng',
      title: 'Khoa - Phòng',
      field: {
          code: 'Số hiệu',
          name: 'Tên gọi',
          description: 'Diễn giải',
          doctor_name: 'Họ tên Bác sĩ'
      }
    },

    doctor: {
      name: 'Danh mục Bác sĩ',
      title: 'Danh mục Bác sĩ',
      field: {
          code: 'Số hiệu',
          name: 'Tên gọi',
          address: 'Địa chỉ',
          phone_number: 'Điện thoại',
          working_address: 'Nơi công tác',
          bank_number: 'Tài khoản',
          doctor_avatar: 'Hình',
          button_doctor_avatar: 'Upload hình',
          position: 'Vị trí',
          department_medicine_id: 'Khoa - Phòng',
      }
    },

    pharmacyWarehouse: {
      name: 'Danh mục Kho hàng',
      title: 'Danh mục Kho hàng',
      field: {
          code: 'Số hiệu',
          name: 'Tên gọi',
          address: 'Địa chỉ',
          phone_number: 'Điện thoại',
          description: 'Diễn giải',
          position: 'Vị trí',
          warehouse_keeper_id: 'Tên thủ kho',
          is_main_pharmacies_warehouse: 'Kho tổng',
          email: 'Email',
          fax_number: 'Fax'
      }
    },
    /**
     * End phase 2 translate
     */

    /**
     * Phase3
     */
     // Cong no dau ki
     beginLiability: {
      name: "Công nợ đầu kỳ",
      title: "Công nợ đầu kỳ",
      dropDownCustomer: "Khách Hàng",
      dropDownSupplier: "Nhà Cung Cấp",
      dropDownLabel: "Đối tượng: ",
      field: {
        nameSearch: "Tìm theo tên: ",
        name: "Tên",
        begin_liability_money: "Dư nợ đầu kì",
        phone: "Điện thoại",
        address: "Địa chỉ",
      }
     },

     inputOutputTypeFormTrans: {
      name: "Hình thức nhập - xuất",
      title: "Danh mục hình thức nhập - xuất",
      inputTabTitle: "Hình thức nhập",
      outputTabTitle: "Hình thức xuất",
      searchName: "Tìm kiếm theo tên",
      field: {
        inputNameTitle: "Tên hình thức nhập ",
        outputNameTitle: "Tên hình thức xuất ",
        description: "Diễn giải"
      }
     },

     productInput: {
      name: "Nhập kho",
      title: "Nhập kho",
      formSearchTitle: "Tìm kiếm",
      formNameSearchTitle: "Tìm kiếm",
      billNameTitle: "Hóa đơn nhập",
      btnSearchBill: "Tìm kiếm hóa đơn",
      lbSearch: "Tìm theo tên thuốc",
      field: {
        code: "Số hóa đơn",
        input_output_form_type_id: "Hình thức nhập",
        pharmacy_warehouse_id: "Kho hàng",
        date_input: "Ngày nhập",
        supplier_id: "Nhà cung cấp",
        begin_liability_money: "Dư nợ đầu kì",
        description: "Diễn giải",
        discount_rate: "Chiết khấu",
        total_discount_money: "Tiền chiết khấu",
        total_vat_money: "Tổng tiền VAT",
        product_total_money: "Tổng tiền",
        medicine_id: "Tên thuốc",
        qr_code: "Mã vạch",
        unit_id: "Đơn vị tính",
        quantity: "Số lượng",
        input_price: "Giá nhập",
        vat_tax_money: "Thuế VAT",
        total_money_before_discount: "Thành tiền",
        country_id: "Xuất xứ",
        medicine_limited_date: "Hạn sử dụng",
        medicine_created_date: "Ngày sản xuất",
        shipment_no: "Số lô",
        storage_position_id: "Vị trí cất giữ",
        wholesale_price: "Giá sỉ",
        retail_price: "Giá lẻ",
        total_price: "Thành tiền",
      }
     },
     nhapHangTonDau: {
      name: "Nhập hàng tồn đầu",
      title: "Nhập hàng tồn đầu",
      formSearchTitle: "Tìm kiếm",
      formNameSearchTitle: "Tìm kiếm",
      billNameTitle: "Hóa đơn nhập",
      btnSearchBill: "Tìm kiếm hóa đơn",
      lbSearch: "Tìm theo tên thuốc",
      field: {
        code: "Số hóa đơn",
        input_output_form_type_id: "Hình thức nhập",
        pharmacy_warehouse_id: "Kho hàng",
        date_input: "Ngày nhập",
        supplier_id: "Nhà cung cấp",
        begin_liability_money: "Dư nợ đầu kì",
        description: "Diễn giải",
        discount_rate: "Chiết khấu",
        total_discount_money: "Tiền chiết khấu",
        total_vat_money: "Tổng tiền VAT",
        product_total_money: "Tổng tiền",
        medicine_id: "Tên thuốc",
        qr_code: "Mã vạch",
        unit_id: "Đơn vị tính",
        quantity: "Số lượng",
        input_price: "Giá nhập",
        vat_tax_money: "Thuế VAT",
        total_money_before_discount: "Thành tiền",
        country_id: "Xuất xứ",
        medicine_limited_date: "Hạn sử dụng",
        medicine_created_date: "Ngày sản xuất",
        shipment_no: "Số lô",
        storage_position_id: "Vị trí cất giữ",
        wholesale_price: "Giá sỉ",
        retail_price: "Giá lẻ",
        total_price: "Thành tiền",
      }
     },
     valueAddedTax: {
      name: 'Biểu thuế suất',
      title: 'Biểu thuế suất',
      field: {
          code: 'Số hiệu',
          percent_tax: 'Tên',
          description: 'Diễn giải'
      }
    },

    retailCustomer: {
        name: 'Danh mục khách hàng lẻ',
        title: 'Danh mục khách hàng lẻ',
        field: {
            code: 'Số hiệu',
            name: 'Tên khách hàng',
            address: 'Địa chỉ',
            phone_number: 'Điện thoại',
            years_old: 'Tuổi',
            sex: 'Giới tính',
            position: 'Vị trí'
        }
    },

    medicineUpdatePrice: {
      name: "Cập nhật thay đổi giá thuốc, vật tư",
      title: "Cập nhật thay đổi giá thuốc, vật tư",
      search: {
        name: "Tìm kiếm tên thuốc và vật tư",
      },
      field: {
            medicine_group_id: 'Nhóm thuốc',
            medicine_code: 'Mã thuốc',
            medicine_name: 'Tên thuốc',
            medicine_update_price_date: 'Ngày cập nhật',
            input_price: 'Giá nhập hiện tại',
            wholesale_price: 'Giá bán sỉ hiện tại',
            retail_price: 'Giá bán lẻ hiện tại',
            listed_price: 'Giá niêm yết hiện tại',
            new_input_price: 'Giá nhập mới',
            new_wholesale_price: 'Giá bán sỉ mới',
            new_retail_price: 'Giá bán lẻ mới',
            new_listed_price: 'Giá niêm yết mới',
            description: 'Diển giải',
        }
    },
    internalStockDelivery: {
        name: 'Xuất kho'
    },

     /**
     * End phase3
     */

     /*
     * Phase 4
     */

    medicineWarning: {
      name: "Hệ thống cảnh báo",
      title: "Hệ thống cảnh báo",
      field: {
            warning_type: 'Mã thuốc',
            enable_mode: 'Mã thuốc',
            limit_warning: 'Mã thuốc',
            color_warning: 'Mã thuốc',
            warning_type_name: 'Loại cảnh báo',
            enable_mode_name: 'Trạng thái',
        }
    },
    phieuThu: {
        name: 'Phiếu thu - thu tiền',
        title: 'Phiếu thu - thu tiền',
        field: {
            code: 'Số hiệu',
            name: 'sai ne',
            full_name: 'Tên quốc gia',
            description: 'Diễn giải',
            date_input: 'Ngày lập',
            date_output: 'Ngày thu',
            supplier_id: 'Đối tượng',
            supplier_name: 'Tên đối tượng',
            total_money: 'Số tiền',
            name_search: 'Tên đối tượng'
        }
    },

    /*
    * Phase5
    */
    /*
    * End Phase5
    */

    errors: {
        add: {
          title: 'Không thêm mới dữ liệu được',
          message: 'Số hiệu bị trùng, vui lòng kiểm tra lại!',
        },
        update: {
          title: 'Không cập nhật dữ liệu được',
          message: 'Vui lòng kiểm tra lại!',
        },
        delete: {
            title: 'Không được xóa',
            message: 'Dữ liệu đang được sử dụng!'
        }
    },
    success: {
      add: {
        title: 'Thêm mới dữ liệu',
        message: 'Thêm mới dữ liệu thành công'
      },
      update: {
        title: 'Cập nhật dữ liệu',
        message: 'Cập nhật dữ liệu đã thành công!',
      },
      delete: {
          title: 'Xóa dữ liệu',
          message: 'Xóa dữ liệu thành công!'
      }
    }
};

module.exports = Language;