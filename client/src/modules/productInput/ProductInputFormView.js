const {Translate, I18n} = ReactReduxI18n;
import ProductInputParentSearchResult from 'modules/productInput/childs/productInputParentSearchResult';
import ProductInputParentForm from 'modules/productInput/childs/productInputParentForm';
import ProductInputButtons from 'modules/productInput/childs/productInputButtons';

class ProductInputFormView extends React.Component{
    render(){
        return (
            <div className="page-content-inner">
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box green">
                            <div className="portlet-title">
                                <div className="caption">
                                    Nhập kho
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <ProductInputParentSearchResult/>
                                    </div>
                                    <div className="col-sm-9">
                                        <ProductInputParentForm/>
                                    </div>
                                </div>
                                <ProductInputButtons/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
module.exports = ProductInputFormView;