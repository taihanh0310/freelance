const {Translate, I18n} = ReactReduxI18n;

import DieuKienTimKiem from 'modules/quanLyCongNo/childs/DieuKienTimKiem';
import DanhSach from 'modules/quanLyCongNo/childs/DanhSach';
import ButtonList1 from 'modules/quanLyCongNo/childs/ButtonList1';
import ChiTietHoaDon from 'modules/quanLyCongNo/childs/ChiTietHoaDon';
import ButtonList2 from 'modules/quanLyCongNo/childs/ButtonList2';

class QuanLyCongNoFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Quản lý công nợ
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-12"><DieuKienTimKiem/></div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <DanhSach/>
                                    </div>
                                </div>
                                <div className="row">
                                    <ButtonList1/>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <ChiTietHoaDon/>
                                    </div>
                                </div>
                                <div className="row">
                                    <ButtonList2/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
module.exports = QuanLyCongNoFormView;