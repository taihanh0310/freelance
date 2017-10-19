const {Translate, I18n} = ReactReduxI18n;
import MedicineBarcodeForm from 'modules/retailer/childs/MedicineBarcodeForm';
import RetailerParentSearchResult from 'modules/retailer/childs/RetailerParentSearchResult';
import RetailerParentForm from 'modules/retailer/childs/RetailerParentForm';
import RetailerButtons from 'modules/retailer/childs/RetailerButtons';

class RetailerFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Xuất bán lẻ - theo đơn
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <MedicineBarcodeForm/>
                                        <RetailerParentSearchResult/>
                                    </div>
                                    <div className="col-sm-9">
                                        <RetailerParentForm/>
                                    </div>
                                </div>
                                <RetailerButtons/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
module.exports = RetailerFormView;