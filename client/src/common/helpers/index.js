const {DATE_NULL, DATA_LIMIT} = Config;
const {CheckEmpty, CheckAttr} = Check;

export const DisplayDate = (date) => {
    if (date === DATE_NULL) {
        return '';
    }
    if (CheckEmpty(date))
        return '';
    if (typeof date === 'undefined')
        return '';

    date = date.split(' ')[0];
    const dateArr = date.split('-');
    const year = dateArr[0];
    const month = dateArr[1];
    const day = dateArr[2];

    return day + '/' + month + '/' + year;
};

export const DisplayDateTime = (dateTime) => {
    if (dateTime === DATE_NULL) {
        return '';
    }
    if (CheckEmpty(dateTime))
        return '';
    if (typeof dateTime === 'undefined')
        return '';

    let date = dateTime.split(' ')[0];
    const dateArr = date.split('-');
    const year = dateArr[0];
    const month = dateArr[1];
    const day = dateArr[2];

    let time = dateTime.split(' ')[1];
    const timeArr = time.split(':');
    const hour = timeArr[0];
    const minute = timeArr[1];
    const second = timeArr[2];

    return day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
};

export const DisplayDateFriendly = (dateTime) => {
    if (dateTime === DATE_NULL) {
        return '';
    }
    if (CheckEmpty(dateTime))
        return '';
    if (typeof dateTime === 'undefined')
        return '';

    let date = dateTime.split(' ')[0];
    const dateArr = date.split('-');
    const year = dateArr[0];
    const month = parseInt(dateArr[1]);
    const day = parseInt(dateArr[2]);


    return `${day} Tháng ${month} Năm ${year}`;
};

export const GetFilesUpload = files => {
    let rFiles = [];
    files.map(file => {
        if (!CheckAttr(file, 'uid'))
            rFiles.push(file);
    });
    return rFiles;
};

export const GetTotalPages = all => {
    if (all === 0)
        return 1;
    return Math.ceil(all / DATA_LIMIT);
};

export const GetOffsetPage = page => {
    return (page - 1) * DATA_LIMIT;
};

export const DisableWebKeyboard = () => {
    document.onkeydown = function (event) {
        event = event || window.event;
        var control = event.which || event.keyCode || document.all;
        switch (control) {
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
                event.preventDefault();
                event.stopPropagation();
        }
    };
};

export const ScrollRow = (element, container, asterisk) => {
    /*if(typeof $(element).offset() !== 'undefined'){
     const scrollTop = $(element).height();
     switch(asterisk){
     case '+':
     $(container).scrollTop($(container).height());
     break;
     case '-':
     $(container).scrollTop(0);
     }
     }*/
};

export const ScrollPerRow = (element, container, key) => {
    /*if(typeof $(element).offset() !== 'undefined'){
     const scrollTop = $(element).height();
     const scrollTopHeight = key*scrollTop;
     const containerHeight = $(container).height();
     if(containerHeight < scrollTopHeight){
     const diff = scrollTopHeight - containerHeight;
     $(container).scrollTop($(container).scrollTop()+scrollTop+15);

     }else{
     $(container).scrollTop($(container).scrollTop()-scrollTop-15);
     }
     }*/
};

export const GetListFilter = (list, search) => {
    let array = [];
    for (let i = 0; i < list.length; i++) {
        let l = list[i];
        var valid = true;
        for (var key in search) {
            var value = search[key];
            var lkey = l[key];
            if (typeof lkey !== 'undefined') {
                if (typeof lkey.indexOf === 'function') {
                    if (lkey.search(new RegExp(value, 'i')) === -1) {
                        valid = false;
                    }
                } else {
                    if (lkey != value && value !== '') {
                        valid = false;
                    }
                }
            }
        }
        if (valid)
            array.push(l);
    }
    return array;
};

export const GetListFilterObj = (list, search, obj) => {
    let array = [];
    for (let i = 0; i < list.length; i++) {
        let l = list[i];
        var valid = true;
        for (var key in search) {
            var value = search[key];
            var lkey = l[obj][key];
            if (typeof lkey !== 'undefined') {
                if (typeof lkey.indexOf === 'function') {
                    if (lkey.search(new RegExp(value, 'i')) === -1) {
                        valid = false;
                    }
                } else {
                    if (lkey != value && value !== '') {
                        valid = false;
                    }
                }
            }
        }
        if (valid)
            array.push(l);
    }
    return array;
};

export const CheckPageHeight = (listHeight) => {
    if (typeof listHeight === 'undefined') {
        $('.page-content').css({minHeight: $(window).height() - 51 * 3 + 20});
        const pageContentHeight = $('.page-content').height();
        const pageFormHeight = $('#form-content').height();
        $('.table-scrollable').height(pageContentHeight - pageFormHeight - 51 * 4 - 20);
    } else {
        $('.table-scrollable').height(listHeight);
    }
};

export const PageBlock = (message) => {
    const html = '<div class="loading-message loading-message-boxed"><span>&nbsp;&nbsp;' + message + '</span></div>'

    $.blockUI({
        message: html,
        baseZ: 1000,
        css: {
            border: '0',
            padding: '0',
            backgroundColor: 'none'
        },
        overlayCSS: {
            backgroundColor: '#555',
            opacity: 0.1,
            cursor: 'wait'
        }
    });
};

export const PageUnblock = () => {
    $.unblockUI();
};

// Dua vao ID de tim ra name
export const getNameById = (list, id) => {
    for (var i = 1;
    i < list.length; i++) {
        if (list[i].id == id) {
            return list[i].name;
        }
    }
};


export const getVATItem = (price, vat) => {
    return (parseFloat(price) * parseFloat(vat)) / 100;
};

export const getVATQuanlityItem = (price, vat, quanlity) => {

    return ((parseFloat(price) * parseFloat(vat)) / 100) * parseFloat(quanlity);
};


/**
 * getTotalPrice
 * @param float price
 * @param float quanlity
 * @param int totalVAT
 * @returns {Number}
 */
export const getTotalPrice = (price=0, quantity=0, vat=0) => {
    let price_total = ( parseFloat(price) * parseFloat(quantity) );
    let price_vat = ( price_total * vat ) / 100;

    return price_total + price_vat;
};

//export const getTotalPrice = (price, quanlity, totalVAT) => {
//    return (parseFloat(price) * parseFloat(quanlity)) + parseFloat(totalVAT);
//};

export const formatStringToDate = (date) => {
    if(date == ''){
        return '';
    }
    else{
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }
};

export const calcDiscount = (discount_rate, total_money) => {
    return (parseFloat(discount_rate) * parseFloat(total_money)) / 100;
};

export const calcTotalPriceBeforeDiscountInList = (list) => {
    let total = 0;
    for (let i = 0; i < list.length; i++) {
        total += parseFloat(list[i].total_price);
    }
    return total;
};

export const calcTotalAmountForPurchase = (list) => {
    let total = 0;
    for (let i = 0; i < list.length; i++) {
        total += parseFloat(list[i].amount);
    }
    return total;
};

export const calcTotalPriceProductAfterDiscount = (total_money, total_discount) => {
    return parseFloat(total_money) - parseFloat(total_discount);
};

/*
 * list: danh sach can kiem tra
 * search: doi tuong can kiem tra
 * attribute de so sanh
 */
export const hasDuplicate = (list, search, attribute1, attribute2) => {

    for (let i = 0;
    i < list.length; i++) {
        if ((list[i][attribute1] == search[attribute1]) && (list[i][attribute2] == search[attribute2])) {
            return false;
        }
    }
    return true;
};


export const warningAlert = (content) => {
    toastr.error(content, 'Cảnh báo');
};


export const alertSelectInvoiceBeforePrint = () => {
    toastr.error('Vui lòng chọn hóa đơn trước khi xem và in', 'Cảnh báo');
};

export const alertErrorAferPrint = () => {
    toastr.error('Quá trình xuất báo cáo bị lỗi!', 'Cảnh báo');
};

export const alertSelectInvoiceBeforeDelete = () => {
    toastr.error('Vui lòng chọn hóa đơn trước khi xóa', 'Cảnh báo');
};
