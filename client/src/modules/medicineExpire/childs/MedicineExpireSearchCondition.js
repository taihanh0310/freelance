const {Translate, I18n} = ReactReduxI18n;
import * as MedicineExpireListActions from 'modules/medicineExpire/actions/list';
import * as MedicineExpireFormActions from 'modules/medicineExpire/actions/form';

import {loadList as pharmacyWarehouseLoadList} from 'modules/pharmacyWarehouse/actions/list'; // Danh sach nha thuoc
import {loadList as medicineGroupLoadList} from 'modules/medicineGroup/actions/list'; // Danh sach nha thuoc

class MedicineExpireSearchCondition extends React.Component{

    constructor(){
        super();
    }

    componentDidMount(){
        this._loadAll();

        setTimeout(() => {
            this._loadList(this.props.medicineExpireForm.values);
        }, 1000);
    }

    _loadAll(){
        this.props.pharmacyWarehouseLoadList();
        this.props.medicineGroupLoadList();
        this._loadWarning();
    }

    _loadWarning(){
        axios.get(`${Config.API_URL}pharma-system-warning/1`)
        .then(response => {
            let data = response.data.data;
            this.props.formChange('color_warning', data.color_warning);
            this.props.formChange('limit_warning', data.limit_warning);
        });
    }

    _loadList(value){
        Helper.PageBlock(I18n.t('application.text.loading'));
        this.props.loadList(value)
        .then(() => {
            
        })
    }

    _onChangeField(field, value){
        this.props.formChange(field, value);
    }

    _onSearchBill(){
        this._loadList(this.props.medicineExpireForm.values);
    }

    render(){
        return (
            <div className="portlet box green">
                <div className="portlet-title">
                    <div className="caption">
                       Điều kiện tìm kiếm
                    </div>
                </div>
                <div className="portlet-body">
                    <div className="form-body">
                        <div className="row">
                            <div className="col-md-3">
                                <div className='form-group'>
                                    <label>Mức tồn</label>
                                    <input type="number" min="1" className="form-control text-right" value={this.props.medicineExpireForm.values.limit_warning} onChange={event => this._onChangeField('limit_warning', event.target.value)}/>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className='form-group'>
                                    <label>Nhà thuốc</label>
                                    <select className="form-control" onChange={event => this._onChangeField('pharmacy_warehouse_id', event.target.value)}
                                        value={this.props.medicineExpireForm.values.pharmacy_warehouse_id}>
                                        {
                                            this.props.pharmacyWarehouses.listRoot.map((country, key) => {
                                                return (
                                                    <option key={key} value={country.id}>{country.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className='form-group'>
                                    <label>Nhóm thuốc</label>
                                    <select className="form-control" onChange={event => this._onChangeField('medicine_group_id', event.target.value)}
                                        value={this.props.medicineExpireForm.values.medicine_group_id}>
                                        {
                                            this.props.medicineGroups.listRoot.map((country, key) => {
                                                return (
                                                    <option key={key} value={country.id}>{country.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label></label>
                                    <button className="btn red btn-block btn-customer-size" type="button" onClick={this._onSearchBill.bind(this)}>Tìm kiếm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = ({
        medicineExpires,
        medicineExpireForm,
        pharmacyWarehouses,
        medicineGroups
    }) => {
    return {
        medicineExpires,
        medicineExpireForm,
        pharmacyWarehouses,
        medicineGroups
    };
};

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...MedicineExpireListActions,
        ...MedicineExpireFormActions,
        ...ReactRouterRedux.routerActions,
        pharmacyWarehouseLoadList,
        medicineGroupLoadList
    }, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(MedicineExpireSearchCondition);