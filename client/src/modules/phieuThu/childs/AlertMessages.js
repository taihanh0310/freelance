const {Translate, I18n} = ReactReduxI18n;
import * as PhieuThuListActions from 'modules/phieuThu/actions/list';

class AlertMessages extends React.Component{
    render(){
        return (
            <div className="alert alert-success">Tìm thấy <strong>{(this.props.phieuThus === 'undefined' || this.props.phieuThus.list === 'undefined' || this.props.phieuThus.list.length == 0) ? 0 : this.props.phieuThus.list.length }</strong> hóa đơn trong hệ thống. </div>
        );
    };
}


const mapStateToProps = ({
        phieuThus
    }) => {
    return {
        phieuThus
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...PhieuThuListActions,
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(AlertMessages);