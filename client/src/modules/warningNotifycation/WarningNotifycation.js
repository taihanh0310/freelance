import React, {Component} from 'react';

class WarningNotifycation extends Component{
    constructor(){
        super();
        this.state = {
            medicineExpireList: [],
            medicineQuantityList: [],
            medicineExpireWarning: {color_warning: '#e73d4a'},
            medicineQuantityWarning: {color_warning: '#e73d4a'}
        };
    }

    componentDidMount(){
        this.loadWarning();

        setInterval( () => {
            this.loadWarning();
        }, Config.WARNING_INTERVAL);
    }

    loadWarning(){
        let currDate = Date.now();
        let warningList = JSON.parse(localStorage.getItem('warningList'));

        //: Check localStorage and time
        if( !warningList || (warningList.storedTime + Config.WARNING_INTERVAL <= currDate) ){
            axios.get(`${Config.API_URL}get-medicine-warning-list`)
            .then(response => {

                let res = response.data.data;
                res.storedTime = currDate;
                localStorage.setItem('warningList', JSON.stringify(res));

                this.showWarning();
            });
        }
        else{
            this.showWarning();
        }

    }

    showWarning(){
        let warningList = JSON.parse(localStorage.getItem('warningList'));
        let systemWarnings = warningList.systemWarnings;

        //: Check and set data
        if( warningList.expire.length>0 ){
            this.setState({
                medicineExpireList: warningList.expire
            });
        }
        if( warningList.quantity.length>0 ){
            this.setState({
                medicineQuantityList: warningList.quantity
            });
        }
        if( systemWarnings.length >0 ){
            for( let systemWarning of systemWarnings ){
                if( systemWarning.warning_type ===0 ){
                    this.setState({ medicineExpireWarning: systemWarning });
                }
                else if( systemWarning.warning_type ===1 ){
                    this.setState({ medicineQuantityWarning: systemWarning });
                }
            }
        }
    }

    render(){
        return(
           ( this.state.medicineExpireList.length>0 || this.state.medicineQuantityList.length>0 )
            ?
            <div className="wrap-notify alert-warning">
                <marquee>
                    {
                        ( this.state.medicineExpireList.length>0 )
                        ?
                        <ul style={{color: this.state.medicineExpireWarning.color_warning}}>
                        <li>DS thuốc sắp HH:</li>
                            {
                                this.state.medicineExpireList.map( (value, key) => {
                                    return(
                                       <li key={key}>{value.medicine_name} (Ngày hh: {value.medicine_limited_date}, Số ngày còn lại: {value.expire_date})</li>
                                    );
                                })
                            }
                        </ul>
                        :
                        <div></div>
                    }

                    {
                        ( this.state.medicineQuantityList.length>0 )
                        ?
                        <ul style={{color: this.state.medicineQuantityWarning.color_warning}}>
                        <li>DS thuốc sắp hết</li>
                            {
                                this.state.medicineQuantityList.map( (value, key) => {
                                    return(
                                       <li key={key}>{value.medicine_name} (Số lượng: {value.quantity})</li>
                                    );
                                })
                            }
                        </ul>
                        :
                        <div></div>
                    }
                </marquee>
            </div>
            :
            <div></div>
        );
    }
};

export default WarningNotifycation;