const {Translate, I18n} = ReactReduxI18n;
import * as LoiNhuanTheoMatHangListActions from 'modules/baoCao/loiNhuanTheoMatHang/actions/list';

class SummariesReport extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
                <div className="col-md-8">
                    <strong>Tổng lợi nhuận: {Numeral(this.props.loiNhuanTheoMatHangs.listChild.list.totalPrice).format('0,0')}</strong>
                </div>
                )
    }
}

const mapStateToProps = ({
    loiNhuanTheoMatHangs
}) => {
    return {
        loiNhuanTheoMatHangs
    };
};
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...LoiNhuanTheoMatHangListActions
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SummariesReport);