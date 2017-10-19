const {Translate, I18n} = ReactReduxI18n;

import * as XuatChuyenKhoListActions from 'modules/xuatChuyenKho/actions/list';
import * as XuatChuyenKhoFormActions from 'modules/xuatChuyenKho/actions/form';
import {formClear as formChildClear} from 'modules/xuatChuyenKho/actions/formChild';

class XuatChuyenKhoModelConfirm extends React.Component{
        constructor(){
            super();
            this.state = {
                dateFrom: moment().add(-1, 'months'),
                dateTo: moment().add(0, 'days'),
                confirm: false
            };
        }

        _loadList(dateFrom, dateTo){
            Helper.PageBlock(I18n.t('application.text.loading'));
            this.props.loadList(moment(dateFrom).format('YYYY-MM-DD'), moment(dateTo).format('YYYY-MM-DD'))
            .then(() => {
                
            })
        }
        
        _onDelete(){
            this.props.formDelete(this.props.xuatChuyenKhos.selectedDetail.id)
            .then(() => {
                this.setState({confirm: false});
                this._loadList(this.state.dateFrom, this.state.dateTo)
                .then(() => {
                    toastr.success(I18n.t('success.delete.message'), I18n.t('success.delete.title'));
                });
            });
        }

        render(){
        return (
                    <ConfirmModal
                        modal={this.state.confirm}
                        message={I18n.t('application.text.confirmDelete')}
                        onAccept={() => this._onDelete()}
                        onRequestClose={()=>this.setState({confirm: false})}/>
                );
        };
                };

const mapStateToProps = ({
        xuatChuyenKhos,
        xuatChuyenKhoForm,
        xuatChuyenKhoFormChild
    }) => {
    return {
        xuatChuyenKhos,
        xuatChuyenKhoForm,
        xuatChuyenKhoFormChild
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...XuatChuyenKhoListActions,
        ...XuatChuyenKhoFormActions,
        formChildClear
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(XuatChuyenKhoModelConfirm);
