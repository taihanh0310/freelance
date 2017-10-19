const {Translate, I18n} = ReactReduxI18n;
import InternalStockDeliveryButtons from 'modules/internalStockDelivery/childs/InternalStockDeliveryButtons';
import InternalStockDeliveryParentForm from 'modules/internalStockDelivery/childs/InternalStockDeliveryParentForm';
import MedicineBarcodeForm from 'modules/internalStockDelivery/childs/MedicineBarcodeForm';
import InternalStockDeliveryParentSearchResult from 'modules/internalStockDelivery/childs/InternalStockDeliveryParentSearchResult';

class InternalStockDeliveryFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Xuất hàng
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <MedicineBarcodeForm/>
                                        <InternalStockDeliveryParentSearchResult/>
                                    </div>
                                    <div className="col-sm-9">
                                        <InternalStockDeliveryParentForm/>
                                    </div>
                                </div>
                                <InternalStockDeliveryButtons/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
module.exports = InternalStockDeliveryFormView;