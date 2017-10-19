const {Translate, I18n} = ReactReduxI18n;
import * as PhieuChiListActions from 'modules/phieuChi/actions/list';

class AlertMessages extends React.Component{
    render(){
        return (
            <div className="alert alert-success">Tìm thấy <strong>{(this.props.phieuChis === 'undefined' || this.props.phieuChis.list === 'undefined' || this.props.phieuChis.list.length == 0) ? 0 : this.props.phieuChis.list.length }</strong> hóa đơn trong hệ thống. </div>
        );
    };
}


const mapStateToProps = ({
        phieuChis
    }) => {
    return {
        phieuChis
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...PhieuChiListActions,
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(AlertMessages);