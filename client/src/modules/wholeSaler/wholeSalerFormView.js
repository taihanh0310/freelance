const {Translate, I18n} = ReactReduxI18n;
import WholeSalerButtons from 'modules/wholeSaler/childs/WholeSalerButtons';
import WholeSalerParentForm from 'modules/wholeSaler/childs/WholeSalerParentForm';
import MedicineBarcodeForm from 'modules/wholeSaler/childs/MedicineBarcodeForm';
import WholeSalerParentSearchResult from 'modules/wholeSaler/childs/WholeSalerParentSearchResult';

class WholeSalerFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Xuất bán sỉ
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <MedicineBarcodeForm/>
                                        <WholeSalerParentSearchResult/>
                                    </div>
                                    <div className="col-sm-9">
                                        <WholeSalerParentForm/>
                                    </div>
                                </div>
                                <WholeSalerButtons/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
module.exports = WholeSalerFormView;