const {Translate, I18n} = ReactReduxI18n;
import ChildSearchResult from 'modules/baoCaoXuatNhapTon/childs/ChildSearchResult';
import ParentSearchTongHopResult from 'modules/baoCaoXuatNhapTon/childs/ParentSearchTongHopResult';
import DanhSachXuatNhapTonTheoLo from 'modules/baoCaoXuatNhapTon/childs/DanhSachXuatNhapTonTheoLo';
import XuatNhapTon from 'modules/baoCaoXuatNhapTon/childs/XuatNhapTon';
import XuatNhapTonTheoLoChiTiet from 'modules/baoCaoXuatNhapTon/childs/XuatNhapTonTheoLoChiTiet';
import SearchConditions from 'modules/baoCaoXuatNhapTon/childs/SearchConditions';

import * as BaoCaoXuatNhapTonListActions from 'modules/baoCaoXuatNhapTon/actions/list';

class BaoCaoXuatNhapTonFormView extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        return (
                <div className="page-content-inner">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="portlet box green">
                                <div className="portlet-title">
                                    <div className="caption">
                                        Báo cáo xuất nhập tồn
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <SearchConditions/>
                                        </div>
                                    </div>
                                    {(this.props.baoCaoXuatNhapTons.search.data_connected == '1' && this.props.baoCaoXuatNhapTons.search.see_detail == '1' && this.props.baoCaoXuatNhapTons.search.see_shipment_no == '1' && this.props.baoCaoXuatNhapTons.search.medicine_input_output == '1') ? (
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <ParentSearchTongHopResult/>
                                                </div>
                                            </div>
                                    ) : (
                                        null
                                    )}
                            
                                    {(this.props.baoCaoXuatNhapTons.search.data_connected == '0' && this.props.baoCaoXuatNhapTons.search.see_detail == '1' && this.props.baoCaoXuatNhapTons.search.see_shipment_no == '1' && this.props.baoCaoXuatNhapTons.search.medicine_input_output == '1') ? (
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <XuatNhapTonTheoLoChiTiet/>
                                                </div>
                                            </div>
                                    ) : (
                                        null
                                    )}
                            
                            {(this.props.baoCaoXuatNhapTons.search.data_connected == '0' && this.props.baoCaoXuatNhapTons.search.see_detail == '0' && this.props.baoCaoXuatNhapTons.search.see_shipment_no == '1' && this.props.baoCaoXuatNhapTons.search.medicine_input_output == '1') ? (
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <DanhSachXuatNhapTonTheoLo/>
                                                </div>
                                            </div>
                                    ) : (
                                        null
                                    )}
                            
                            {(this.props.baoCaoXuatNhapTons.search.data_connected == '0' && this.props.baoCaoXuatNhapTons.search.see_detail == '0' && this.props.baoCaoXuatNhapTons.search.see_shipment_no == '0' && this.props.baoCaoXuatNhapTons.search.medicine_input_output == '1') ? (
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <XuatNhapTon/>
                                                </div>
                                            </div>
                                    ) : (
                                        null
                                    )}
                                    
                                    
                                    {(this.props.baoCaoXuatNhapTons.search.data_connected == '1' && this.props.baoCaoXuatNhapTons.search.see_detail == '1' && this.props.baoCaoXuatNhapTons.search.see_shipment_no == '1' && this.props.baoCaoXuatNhapTons.search.medicine_input_output == '1') || (this.props.baoCaoXuatNhapTons.search.see_detail == '1' && this.props.baoCaoXuatNhapTons.search.see_shipment_no == '1' && this.props.baoCaoXuatNhapTons.search.medicine_input_output == '1') ? (
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <ChildSearchResult/>
                                            </div>
                                        </div>      
                                    ): (
                                        <div className="row"></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                );
    }
    ;
}
;

const mapStateToProps = ({
baoCaoXuatNhapTons
}) => {
    return {
        baoCaoXuatNhapTons
    };
};
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...BaoCaoXuatNhapTonListActions
    }, dispatch);
};
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(BaoCaoXuatNhapTonFormView);
