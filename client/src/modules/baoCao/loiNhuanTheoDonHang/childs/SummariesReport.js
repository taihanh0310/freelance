const {Translate, I18n} = ReactReduxI18n;
import * as LoiNhuanTheoDonHangListActions from 'modules/baoCao/loiNhuanTheoDonHang/actions/list';

class SummariesReport extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
                <div className="col-md-8">
                    <strong>Tổng tiền nhập hàng: {Numeral(this.props.loiNhuanTheoDonHangs.totalInputPrice).format('0,0')} - Lợi nhuận tạm tính: {Numeral(this.props.loiNhuanTheoDonHangs.totalPrice).format('0,0')}</strong>
                </div>
                )
    }
}

const mapStateToProps = ({
    loiNhuanTheoDonHangs
}) => {
    return {
        loiNhuanTheoDonHangs
    };
};
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...LoiNhuanTheoDonHangListActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SummariesReport);