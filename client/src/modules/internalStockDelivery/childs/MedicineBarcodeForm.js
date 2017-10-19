const {Translate, I18n} = ReactReduxI18n;

class MedicineBarcodeForm extends React.Component{
    render(){
        return (
        <div className="portlet box green">
                    <div className="portlet-title">
                        <div className="caption">
                           Mã vạch sản phẩm
                        </div>
                    </div>
                    <div className="portlet-body">
                        <div className="form-horizontal form-bordered">
                            <div className="form-group">
                                <div className="col-md-12">
                                    <input type="text" className="form-control" readOnly/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    };
}
module.exports = MedicineBarcodeForm;

